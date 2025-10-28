import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  runtime: 'edge',
};

const SYSTEM_INSTRUCTION = `You are Nexus Inquire, an AI assistant for a strategic intelligence platform called BWGA Nexus AI. Your purpose is to help users generate complex intelligence reports by understanding their natural language goals.`;

const PROMPT = `
Introduce yourself briefly and list 3 of your core capabilities that would be most helpful to a user (like a government official or business strategist).
Focus on how you help turn a simple idea into a detailed report.
For each capability, also provide a compelling example prompt a user could try.
Your response MUST be a valid JSON object. Do not include any markdown fences.

Example Format:
{
  "greeting": "Hello, I am the Nexus Inquire AI assistant...",
  "capabilities": [
    {
      "title": "Translate Goals into Objectives",
      "description": "I can turn your high-level goals into a structured problem statement for a detailed report.",
      "prompt": "I need to attract semiconductor manufacturing to Arizona, USA."
    }
  ]
}
`;

const RESPONSE_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        greeting: { type: Type.STRING, description: "A brief, welcoming greeting from the AI assistant." },
        capabilities: {
            type: Type.ARRAY,
            description: "A list of the AI's core capabilities.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the capability." },
                    description: { type: Type.STRING, description: "A short description of the capability." },
                    prompt: { type: Type.STRING, description: "An example prompt a user can try." }
                },
                required: ['title', 'description', 'prompt']
            }
        }
    },
    required: ['greeting', 'capabilities']
};

export default async function handler(request: Request) {
    if (request.method !== 'GET') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
    }
    
    if (!process.env.API_KEY) {
        return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500 });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: PROMPT,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: RESPONSE_SCHEMA,
            },
        });

        let jsonStr = response.text.trim();
        const fenceRegex = /^```(?:json)?\s*\n?(.*)\n?```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[1]) {
            jsonStr = match[1].trim();
        }
    
        const capabilities = JSON.parse(jsonStr);

        return new Response(JSON.stringify(capabilities), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            },
        });

    } catch (error) {
        console.error("Error in /api/capabilities:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return new Response(JSON.stringify({ error: `Failed to generate capabilities: ${errorMessage}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}