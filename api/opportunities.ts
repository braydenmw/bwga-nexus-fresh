import { GoogleGenAI, Type } from "@google/genai";
import type { LiveOpportunityItem, NewsContent, IndicatorContent, FeedPost } from '../types.ts';

export const config = {
  runtime: 'edge',
};

const PROMPT = `
  You are a Global Intelligence Analyst for an economic development platform. Your task is to use Google Search to find 5-7 recent, significant global development opportunities, relevant news, and economic indicators. Focus on large-scale projects, tenders, and policy shifts from sources like development banks (World Bank, ADB), government tender portals, and major financial news outlets (Reuters, Bloomberg).

  Return a JSON object containing a "feed" array. Each item in the feed must have an "id", "timestamp", "type", and "content".
  The "type" can be 'opportunity', 'news', or 'indicator'.

  For 'opportunity' items, the content MUST include: project_name, country, sector, value, summary, source_url, ai_feasibility_score (an estimated integer 1-100 based on clarity, value, and strategic importance), and ai_risk_assessment (a 1-sentence summary of a key risk).
  
  For 'news' items, the content MUST include: headline, summary, source, link, and region.

  For 'indicator' items, the content MUST include: name (e.g., "Regional FDI Inflow"), value (e.g., "$1.2B"), change (a number, e.g., 1.5 for +1.5%), and region.

  Ensure the entire response is a single, valid JSON object with no other text.
`;

const RESPONSE_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        feed: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    timestamp: { type: Type.STRING },
                    type: { type: Type.STRING },
                    content: { type: Type.OBJECT } // Keeping content flexible as its schema varies
                },
                required: ['id', 'timestamp', 'type', 'content']
            }
        }
    }
};

export default async function handler(req: Request) {
    if (!process.env.API_KEY) {
        return new Response(JSON.stringify({ error: "API key is not configured." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: PROMPT,
            config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: RESPONSE_SCHEMA,
            }
        });

        const data = JSON.parse(response.text);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600' // Cache for 1 hour
            }
        });

    } catch (error) {
        console.error("Error in /api/opportunities handler:", error);
        return new Response(JSON.stringify({ error: `Failed to fetch live opportunities. ${(error as Error).message}` }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
