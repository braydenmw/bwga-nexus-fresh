import { GoogleGenAI } from "@google/genai";
import type { RROI_Index, TPT_Simulation, SEAM_Blueprint, NexusBrainAction, GenerativeModel, DigitalTwinIntervention } from '../types.ts';

export const config = {
  runtime: 'edge',
};

const getSystemPrompt = (action: NexusBrainAction) => {
    const prompts = {
        diagnose: `You are a Regional Economist. Your task is to create a Regional Resilience & Opportunity Index (RROI) for a given region. Analyze the provided context and use Google Search to find relevant data on human capital, infrastructure, economic composition, governance, and quality of life. You MUST return a valid JSON object matching the RROI_Index schema.`,
        simulate: `You are a Predictive Analyst. Given an existing RROI diagnosis and a strategic intervention, your task is to simulate the future impact. Use principles of endogenous growth theory to model how the intervention will affect the RROI components over the specified timeline. You MUST return a valid JSON object matching the TPT_Simulation schema.`,
        architect: `You are a Geopolitical Strategist. Given an RROI diagnosis and a strategic objective, your task is to design a Symbiotic Ecosystem Architecture Model (SEAM). Use Google Search to identify real-world companies that fit the required partner profiles (Anchor, Innovation, Capital, etc.). You MUST return a valid JSON object matching the SEAM_Blueprint schema.`,
        generate_model: `You are a Nobel-laureate level economist. Given an RROI diagnosis, your task is to generate a novel, hybrid economic development model tailored to the region's unique characteristics. Propose a name for the model and outline its core principles. You MUST return a valid JSON object matching the GenerativeModel schema.`
    };
    return prompts[action] || prompts.diagnose;
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  if (!process.env.GOOGLE_GENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500 });
  }

  try {
    const { action, payload } = await request.json() as { action: NexusBrainAction, payload: any };

    if (!action || !payload) {
      return new Response(JSON.stringify({ error: 'Action and payload are required.' }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
    const systemInstruction = getSystemPrompt(action);

    let prompt = '';
    switch(action) {
        case 'diagnose':
            prompt = `Diagnose the region: "${payload.region}". The user's core objective is: "${payload.problemStatement}". Generate the RROI_Index.`;
            break;
        case 'simulate':
            const { diagnosis, intervention } = payload as { diagnosis: RROI_Index, intervention: DigitalTwinIntervention };
            prompt = `Given this RROI diagnosis:\n${JSON.stringify(diagnosis)}\n\nSimulate the impact of the following intervention: "${intervention.description}" over a ${intervention.timeline || '5-10 year'} period. Generate the TPT_Simulation.`;
            break;
        case 'architect':
            prompt = `Given this RROI diagnosis:\n${JSON.stringify(payload.diagnosis)}\n\nAnd the strategic objective: "${payload.problemStatement}", architect the SEAM_Blueprint.`;
            break;
        case 'generate_model':
             prompt = `Given this RROI diagnosis:\n${JSON.stringify(payload.diagnosis)}\n\nGenerate a novel economic model.`;
            break;
        default:
            return new Response(JSON.stringify({ error: 'Invalid action specified.' }), { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    // The Gemini API with JSON output mode should return valid JSON directly.
    // No need to parse, just pass the text through.
    const jsonResponse = response.text;

    return new Response(jsonResponse, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(`Error in /api/nexus-brain for action:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: `Nexus Brain failed to respond: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}