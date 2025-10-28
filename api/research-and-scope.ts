import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  runtime: 'edge',
};

const SYSTEM_INSTRUCTION = `You are the Nexus Brain, a powerful AI assistant for a strategic intelligence platform. Your purpose is to act as a research partner. You will take a user's high-level goal, use Google Search to conduct preliminary research on the topic, and then use that research to scope out a full intelligence blueprint.

Your response MUST be a valid JSON object matching the provided schema.

**Process:**
1.  Analyze the user's query and any attached context.
2.  Perform targeted Google Searches to understand the key players, challenges, opportunities, and context of the query.
3.  Synthesize your findings into a concise, professional summary. This summary should highlight the most critical insights you discovered.
4.  Based on your research, populate the 'suggestions' object with the most logical parameters for a strategic report on this topic. Be thoughtful in your suggestions for tiers and personas.
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    summary: { 
        type: Type.STRING, 
        description: "A concise summary of your initial research findings based on the user's query. This should be a few paragraphs long, written in a professional, analytical tone, and formatted in Markdown." 
    },
    suggestions: {
      type: Type.OBJECT,
      description: "The suggested parameters for the report generator.",
      properties: {
        reportName: { type: Type.STRING, description: "A concise, descriptive name for the report based on the user's query." },
        region: { type: Type.STRING, description: "The primary geographical region, city, or country mentioned. Format as 'City, Country' or just 'Country'." },
        industry: { type: Type.STRING, description: "The single, most relevant core industry or sector from the user's query." },
        tier: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of one or more suggested report tier IDs (e.g., 'FDI Attraction', 'Market Entry') that are most relevant to the user's objective." },
        aiPersona: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of one or more AI Analyst persona IDs (e.g., 'Regional Economist', 'Venture Capitalist') best suited for this analysis." },
        idealPartnerProfile: { type: Type.STRING, description: "A detailed paragraph describing the ideal partner company, synthesized from the user's query and your research." },
        problemStatement: { type: Type.STRING, description: "A well-formed problem statement or strategic objective synthesized from the user's query and your research." },
      },
    }
  },
  required: ['summary', 'suggestions']
};


export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  if (!process.env.GOOGLE_GENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { query, fileContent, context } = await request.json();

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query parameter is required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

    const contextPrompt = context ? `The user providing this query has the following profile:
- Organization Type: ${context.organizationType || 'Not specified'}
- Home Country: ${context.userCountry || 'Not specified'}` : '';

    const prompt = `
      The user's high-level goal is: "${query}"
      ${fileContent ? `They have also provided the following context from a file:\n---\n${fileContent}\n---` : ''}

      Please perform your research and scope the intelligence blueprint now.
    `;


    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const result = JSON.parse(response.text);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/research-and-scope:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: `Nexus Brain failed to respond: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}