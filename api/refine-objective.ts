import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPT = `You are a strategic analysis synthesizer. Your task is to take a user's initial question and an AI's preliminary answer, and from them, synthesize a more detailed and actionable 'problem statement' or 'strategic objective' suitable for a full, in-depth intelligence report.

**Directives:**
1.  **Synthesize, Don't Just Copy:** Combine the intent of the user's question with the key findings from the AI's answer.
2.  **Add Detail and Structure:** Flesh out the initial query into a more formal objective. Frame it as a goal for a strategic report.
3.  **Be Objective-Oriented:** The output should be a clear, concise paragraph that could serve as the "Core Objective" in a formal report request.
4.  **Output ONLY the refined objective text.** Do not include any conversational text, headings, or markdown.`;

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!process.env.API_KEY) {
    return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' }});
  }

  try {
    const { question, answer } = await request.json();

    if (!question || !answer) {
      return new Response(JSON.stringify({ error: 'Question and answer parameters are required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
      **User's Initial Question:**
      "${question}"

      **AI's Preliminary Answer:**
      "${answer.substring(0, 1500)}..." 

      **Your Task:**
      Based on the above, synthesize a refined strategic objective for a deep-dive report.
    `;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        }
    });

    const refinedObjective = response.text;

    return new Response(JSON.stringify({ refinedObjective }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/refine-objective:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}