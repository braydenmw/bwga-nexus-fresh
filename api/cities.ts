import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');

  if (!country) {
    return new Response('Country parameter is required.', { status: 400 });
  }

  if (!process.env.API_KEY) {
    return new Response('API key is not configured.', { status: 500 });
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Provide a list of up to 15 major regional cities or key administrative areas for the country: "${country}".
    Focus on centers of economic, industrial, or logistical importance outside of the primary national capital, if applicable.
    Your response MUST be a valid JSON array of strings, with no other text or markdown.

    Example for "Vietnam":
    [
        "Ho Chi Minh City",
        "Da Nang",
        "Haiphong",
        "Can Tho",
        "Nha Trang",
        "Bien Hoa",
        "Vung Tau",
        "Quy Nhon",
        "Hue",
        "Long Xuyen"
    ]
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            }
        }
      },
    });

    let jsonStr = response.text.trim();
    // With a strict schema, markdown fences are highly unlikely, but this is a safe fallback.
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    const data = JSON.parse(jsonStr);
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=600'
      },
    });

  } catch (error) {
    console.error(`Error fetching regional cities for ${country}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: `Failed to generate or parse city data for ${country}. Details: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}