import { GoogleGenAI } from "@google/genai";
import type { ReportParameters } from '../types.ts';

export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPT = `
You are a senior business development and communications strategist specializing in international investment promotion. Your task is to draft a formal, professional, and culturally-aware introductory letter from a government/economic development official to a potential foreign partner company.

**Directives:**
1.  **Be Formal & Respectful:** The tone should be official but inviting.
2.  **Be Concise:** Keep the letter to 3-4 short paragraphs.
3.  **Highlight Synergy:** The core of the letter is to briefly state the alignment between the company's expertise and the region's opportunity.
4.  **Clear Call to Action:** End with a clear, low-pressure invitation for an exploratory discussion.
5.  **Use Placeholders:** Use placeholders like "[Your Name]" or "[Your Title]" for the sender's details. The user will fill these in.
6.  **Do NOT Invent Facts:** Base the letter *only* on the information provided in the user's prompt.
`;

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!process.env.API_KEY) {
     return new Response(JSON.stringify({ error: 'API key is not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' }});
  }

  try {
    const params = (await request.json()) as ReportParameters;

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // The report generation would have identified a top partner. We simulate that here for the prompt.
    // In a real scenario, the specific partner's name would be passed.
    const prompt = `
      **Context for Letter Generation:**

      **My Organization:** ${params.userDepartment}, ${params.userCountry}
      **My Goal:** I am trying to achieve the following objective: "${params.problemStatement}"
      
      **The Opportunity:** We have a significant opportunity in our region, ${params.region}, within the ${params.industry.join(', ')} sector.
      
      **The Ideal Partner Profile:** I am writing to a high-potential partner company that matches this profile: "${params.idealPartnerProfile}"

      **Your Task:**
      Draft a formal introductory letter to a senior executive (e.g., CEO, Head of Strategy) at this target company. The letter should introduce my organization, briefly mention the synergistic opportunity in our region without being overly detailed, and invite them to a preliminary, confidential discussion. The output should be only the text of the letter.
    `;

    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT
        }
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of responseStream) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error("Error in /api/letter:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}