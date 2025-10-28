import { kv } from '@vercel/kv';
import { GoogleGenAI } from "@google/genai";
import type { ReportParameters, ReverseNexusQuery, NSIL_Report, AnalysisMode } from '../types';

export const config = {
  maxDuration: 300,  // 5 minutes max for complex reports
};

export default async function handler(request: Request) {
  // 1. Pull one job from the queue
  const job = await kv.rpop('nexus_job_queue');
  if (!job) {
    return new Response("No jobs in queue.", { status: 200 });
  }

  const { id: jobId, params, task, payload } = job;

  try {
    await kv.hset(jobId, { status: 'processing' });

    let result: string;

    if (task === 'generateStrategicReport') {
      // 2. Generate the NSIL-structured report
      result = await generateNSILReport(params as ReportParameters);
    } else if (task === 'generateOutreachLetter') {
      // 3. Generate smart outreach letter
      result = await generateSmartLetter(payload.reportContent, payload.userDetails);
    } else if (task === 'reverseNexusSearch') {
      // 4. Perform reverse Nexus search
      result = await performReverseNexusSearch(payload as ReverseNexusQuery);
    } else {
      throw new Error(`Unknown task: ${task}`);
    }

    // 5. Save the final result
    await kv.hset(jobId, {
      status: 'complete',
      result: result,
      completedAt: new Date().toISOString(),
    });

    return new Response(`Job ${jobId} processed.`, { status: 200 });

  } catch (error) {
    // Handle failures: update job status to 'failed'
    await kv.hset(jobId, {
      status: 'failed',
      error: error.message
    });
    console.error(`Error processing job ${jobId}:`, error);
    return new Response(`Failed to process job ${jobId}.`, { status: 500 });
  }
}

// --- NSIL v6.0 Report Generation ---
async function generateNSILReport(params: ReportParameters): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Determine analysis mode
  const mode: AnalysisMode = params.tier.includes('G2G') ? 'g2g_alignment' :
                            params.idealPartnerProfile ? 'matchmaking' : 'market_analysis';

  // Build comprehensive prompt for NSIL-structured output
  const prompt = buildNSILPrompt(params, mode);

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const rawContent = response.response.text();

  // Parse and structure as NSIL XML
  return structureAsNSIL(rawContent, mode, params);
}

// --- Smart Letter Generation ---
async function generateSmartLetter(reportContent: string, userDetails: any): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `You are a strategic communications expert. Your task is to draft a compelling outreach letter from the user to the target company. You MUST extract the most powerful points from the provided report content and structure the letter professionally.

Report Content: ${reportContent}

User Details: ${JSON.stringify(userDetails)}

Generate a personalized, data-driven outreach letter that:
1. References specific findings from the analysis
2. Highlights mutual benefits and strategic alignment
3. Includes concrete next steps
4. Maintains professional tone with compelling call-to-action`;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  return response.response.text();
}

// --- Reverse Nexus Search ---
async function performReverseNexusSearch(query: ReverseNexusQuery): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `You are the Nexus AI Regional Intelligence System. Perform a reverse search for a company looking for optimal regions to invest in.

Company Query: ${JSON.stringify(query)}

Analyze global regions and provide:
1. Top 3-5 regions that best match the company's requirements
2. Specific match scores and strategic advantages
3. Risk assessments for each region
4. Recommended investment types and expected ROI
5. Implementation roadmap

Structure your response as a comprehensive regional opportunity analysis.`;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  return response.response.text();
}

// --- NSIL Prompt Builder ---
function buildNSILPrompt(params: ReportParameters, mode: AnalysisMode): string {
  const basePrompt = `You are the Nexus Strategic Intelligence Language (NSIL) v6.0 AI. Generate a comprehensive analysis report in structured NSIL XML format.

Analysis Mode: ${mode}
Report Parameters: ${JSON.stringify(params)}

CRITICAL: Your response MUST be valid XML with the following structure:
<nsil:analysis_report mode="${mode}">
  <nsil:executive_summary>
    <nsil:overall_score>${params.tier.includes('Global') ? '85' : '78'}</nsil:overall_score>
    <nsil:key_findings>...</nsil:key_findings>
    <nsil:strategic_outlook>...</nsil:strategic_outlook>
  </nsil:executive_summary>

  ${mode === 'matchmaking' ? `
  <nsil:match_score value="92" confidence="High">
    <nsil:rationale>...</nsil:rationale>
  </nsil:match_score>
  <nsil:match>
    <nsil:company_profile name="..." origin="..." size="..." key_technologies="..." target_markets="..." strategic_focus="..."/>
    <nsil:synergy_analysis strategic_alignment="88" complementary_strengths="..." competitive_advantages="..." risk_factors="..." mitigation_strategies="..."/>
    <nsil:risk_map overall_risk="Low" contingency_plans="...">
      <nsil:risk_categories>
        <nsil:geopolitical level="2"/>
        <nsil:market level="3"/>
        <nsil:operational level="1"/>
        <nsil:regulatory level="2"/>
      </nsil:risk_categories>
    </nsil:risk_map>
  </nsil:match>` : ''}

  ${mode === 'market_analysis' ? `
  <nsil:lq_analysis industry="Advanced Manufacturing" value="1.8" interpretation="High Specialization">
    <nsil:benchmark_regions>...</nsil:benchmark_regions>
    <nsil:implications>...</nsil:implications>
  </nsil:lq_analysis>
  <nsil:cluster_analysis anchor_industry="Automotive Parts" supporting_sectors="..." growth_potential="75" regional_advantages="...">
    <nsil:supply_chain_gaps>...</nsil:supply_chain_gaps>
  </nsil:cluster_analysis>` : ''}

  <nsil:future_cast>
    <nsil:scenarios>
      <nsil:scenario name="Accelerated Green Transition" drivers="..." probability="70">
        <nsil:regional_impact effect="positive">...</nsil:regional_impact>
        <nsil:recommendation>...</nsil:recommendation>
      </nsil:scenario>
      <nsil:scenario name="Tech Cold War 2.0" drivers="..." probability="30">
        <nsil:regional_impact effect="mixed">...</nsil:regional_impact>
        <nsil:recommendation>...</nsil:recommendation>
      </nsil:scenario>
    </nsil:scenarios>
    <nsil:key_uncertainties>...</nsil:key_uncertainties>
    <nsil:recommended_actions>...</nsil:recommended_actions>
  </nsil:future_cast>

  <nsil:source_attribution>...</nsil:source_attribution>
</nsil:analysis_report>

Ensure all content is data-driven, specific to the region/industry/company, and provides actionable intelligence.`;

  return basePrompt;
}

// --- NSIL XML Structuring ---
function structureAsNSIL(content: string, mode: AnalysisMode, params: ReportParameters): string {
  // For now, wrap the AI response in basic NSIL structure
  // In production, this would parse and validate the XML structure
  const nsilWrapper = `<nsil:analysis_report mode="${mode}">
${content}
</nsil:analysis_report>`;

  return nsilWrapper;
}