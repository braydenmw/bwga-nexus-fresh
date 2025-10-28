
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { SymbiosisContext, ChatMessage } from '../types.ts';

export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPT_SYMBIOSIS = `
You are BWGA Nexus AI, in a "Symbiosis Chat" mode. Your primary role as a strategic intelligence analyst is complete; you have already generated a report or a dashboard insight. Now, you are in a follow-up conversation with the strategist (the user) to provide clarification, elaboration, or real-time updates on a specific point of that report.

**Your Core Directives:**

1.  **Be Context-Aware:** The user has initiated this chat from a specific piece of content. You MUST tailor your response to that context. The context and chat history are your primary sources of truth.
2.  **Be Conversational & Concise:** This is a dialogue, not a monologue. Keep your answers focused on the user's question. Avoid generating another full report.
3.  **Use Google Search for Real-Time Updates:** If the user asks for the "latest information," "anything new," or "what's happened since," you MUST use the Google Search tool to find the most current data.
4.  **Maintain Your Persona:** You are still a professional, data-driven analyst. Your tone should be helpful, insightful, and precise.
5.  **Output in Markdown:** Use simple Markdown for formatting (bold, italics, lists) to keep responses readable in the chat interface. Do NOT use NSIL tags.
`;

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  if (!process.env.GOOGLE_GENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { context, history } = (await request.json()) as { context: SymbiosisContext; history: ChatMessage[] };

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

    // Construct a focused prompt that includes the context and chat history
    let prompt = `
      **Initial Context:**
      - Topic: "${context.topic}"
      - Original Finding: "${context.originalContent}"
    `;

    if (context.reportParameters) {
        prompt += `
        - From Report On: ${context.reportParameters.region} / ${context.reportParameters.industry}
        `;
    }

    prompt += "\n**Conversation History:**\n";
    history.forEach(msg => {
        prompt += `- ${msg.sender === 'ai' ? 'Nexus AI' : 'User'}: ${msg.text}\n`;
    });
    prompt += "\nBased on this history, provide the next response as Nexus AI.";


    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_PROMPT_SYMBIOSIS,
            tools: [{ googleSearch: {} }],
        }
    });

    const responseText = response.text;

    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/symbiosis-chat:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
