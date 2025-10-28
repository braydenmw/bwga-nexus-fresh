import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (!category) {
    return new Response('Category parameter is required.', { status: 400 });
  }

  if (!process.env.API_KEY) {
    return new Response('API key is not configured.', { status: 500 });
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    You are a global intelligence analyst. Your task is to identify recent (last 12 months) and strategically significant global events for an audience of economic developers and investment strategists.

    Using Google Search, find 2-3 compelling examples for the specific category: "${category}".

    For each example, provide the information in a structured JSON format. Your entire response MUST be a single, valid JSON object. Do not include any text, conversation, or markdown fences (like \`\`\`json) outside of the JSON object itself.

    The JSON structure should be:
    {
      "category": "${category}",
      "items": [
        {
          "company": "string (The primary entity, country, or organization involved)",
          "details": "string (A concise, 1-2 sentence summary of the event)",
          "implication": "string (A one-sentence analysis of WHY this is strategically important, e.g., 'Signals a major push into renewable energy supply chains.')",
          "source": "string (The name of the credible news source, e.g., 'Reuters', 'World Bank')",
          "url": "string (A direct URL to the source article)"
        }
      ]
    }
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(?:json)?\s*\n?(.*)\n?```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
        jsonStr = match[1].trim();
    }
    
    const data = JSON.parse(jsonStr);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=30'
      },
    });

  } catch (error) {
    console.error(`Error in /api/dashboard for category ${category}:`, error);
    return new Response(JSON.stringify({ error: `Failed to fetch or parse dashboard intelligence for ${category}. The AI service may be temporarily unavailable or the response was malformed. Details: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
