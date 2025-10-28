import { GoogleGenAI, Type } from "@google/genai";
import type { LiveOpportunityItem } from '../types.ts';

export const config = {
  runtime: 'edge',
};

const SYSTEM_INSTRUCTION = `You are Nexus Brain, a specialized AI for futurist thinking and strategic foresight. Your task is to analyze a list of current development opportunities and provide a predictive analysis. Identify emerging trends, predict future opportunities that might arise from them, and highlight potential disruptions. Your response MUST be a valid JSON object.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    emergingTrends: {
      type: Type.ARRAY,
      description: "A list of 2-3 key trends identified from the data.",
      items: {
        type: Type.OBJECT,
        properties: {
          trend: { type: Type.STRING, description: "A concise name for the identified trend (e.g., 'Decentralized Green Energy Grids')." },
          justification: { type: Type.STRING, description: "A 1-2 sentence explanation of why this is an emerging trend based on the provided data." }
        },
        required: ['trend', 'justification']
      }
    },
    futureOpportunities: {
      type: Type.ARRAY,
      description: "A list of 2-3 plausible future opportunities.",
      items: {
        type: Type.OBJECT,
        properties: {
          opportunity: { type: Type.STRING, description: "A specific, plausible future opportunity that could arise from the trends (e.g., 'Development of AI-powered microgrid management software')." },
          rationale: { type: Type.STRING, description: "A 1-2 sentence rationale connecting this opportunity to the identified trends." }
        },
        required: ['opportunity', 'rationale']
      }
    },
    potentialDisruptions: {
      type: Type.ARRAY,
      description: "A list of 1-2 potential disruptive factors.",
      items: {
        type: Type.OBJECT,
        properties: {
          disruption: { type: Type.STRING, description: "A potential disruptive factor or technology (e.g., 'Breakthroughs in long-duration energy storage')." },
          impact: { type: Type.STRING, description: "A 1-2 sentence summary of the potential impact of this disruption on the current opportunities." }
        },
        required: ['disruption', 'impact']
      }
    }
  },
  required: ['emergingTrends', 'futureOpportunities', 'potentialDisruptions']
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  if (!process.env.API_KEY) {
    return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500 });
  }

  try {
    const { opportunities } = (await request.json()) as { opportunities: LiveOpportunityItem[] };

    if (!opportunities || opportunities.length === 0) {
      return new Response(JSON.stringify({ error: 'Opportunities data is required.' }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const context = opportunities.map(o => `- ${o.project_name} (${o.sector}, ${o.country}): ${o.summary}`).join('\n');

    const prompt = `Based on this list of current global opportunities, generate a predictive analysis:\n${context}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const analysis = JSON.parse(response.text);

    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/predictive-analysis:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}