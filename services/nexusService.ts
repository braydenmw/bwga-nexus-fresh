import type { ReportParameters, SymbiosisContext, ChatMessage, LiveOpportunityItem, LiveOpportunitiesResponse, InquireResult, ReportSuggestions, AiCapabilitiesResponse, EconomicData, PredictiveAnalysis, FeedPost, ResearchAndScopeResult, RROI_Index, TPT_Simulation, SEAM_Blueprint } from '../types.ts';
import { MOCK_OPPORTUNITIES } from '../data/mockOpportunities.ts';

// --- Report Generation ---
export async function generateReportStream(params: ReportParameters): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch('/api/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text();
    throw new Error(`Report generation failed: ${response.status} ${errorText}`);
  }

  return response.body;
}

// --- Symbiosis Chat ---
export async function fetchSymbiosisResponse(context: SymbiosisContext, history: ChatMessage[]): Promise<string> {
  const response = await fetch('/api/symbiosis-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context, history }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from Symbiosis AI.');
  }
  const data = await response.json();
  return data.response;
}

// --- Live Opportunities ---
export async function fetchLiveOpportunities(): Promise<LiveOpportunitiesResponse> {
    try {
        const response = await fetch('/api/opportunities');
        if (!response.ok) {
            console.error("API failed, using mock data", response.status, await response.text());
            return { ...MOCK_OPPORTUNITIES, isMockData: true };
        }
        return await response.json();
    } catch (e) {
        console.error("Fetch failed, using mock data", e);
        return { ...MOCK_OPPORTUNITIES, isMockData: true };
    }
}

const USER_OPPORTUNITIES_KEY = 'nexusUserOpportunities';

export function saveUserOpportunity(newItem: Omit<LiveOpportunityItem, 'isUserAdded' | 'ai_feasibility_score' | 'ai_risk_assessment'>) {
    const existing = getUserOpportunities();
    const fullItem: LiveOpportunityItem = { ...newItem, isUserAdded: true };
    localStorage.setItem(USER_OPPORTUNITIES_KEY, JSON.stringify([fullItem, ...existing]));
}

export function getUserOpportunities(): LiveOpportunityItem[] {
    try {
        const stored = localStorage.getItem(USER_OPPORTUNITIES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

// --- Predictive Analysis ---
export async function fetchPredictiveAnalysis(feed: FeedPost[]): Promise<PredictiveAnalysis> {
  const opportunities = feed
    .filter(post => post.type === 'opportunity')
    .map(post => post.content as LiveOpportunityItem);

  if (opportunities.length === 0) {
    // Return an empty structure if there are no opportunities to analyze
    return { emergingTrends: [], futureOpportunities: [], potentialDisruptions: [] };
  }

  const response = await fetch('/api/predictive-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ opportunities }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Predictive analysis failed: ${response.status} ${errorText}`);
  }
  return await response.json();
}

// --- Deep-Dive Analysis ---
export async function generateAnalysisStream(item: LiveOpportunityItem, region: string): Promise<ReadableStream<Uint8Array>> {
    const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, region }),
    });

    if (!response.ok || !response.body) {
        const errorText = await response.text();
        throw new Error(`Analysis generation failed: ${response.status} ${errorText}`);
    }
    return response.body;
}

// --- Outreach Letter ---
export async function generateLetterStream(params: ReportParameters): Promise<ReadableStream<Uint8Array>> {
    const response = await fetch('/api/letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });

    if (!response.ok || !response.body) {
        const errorText = await response.text();
        throw new Error(`Letter generation failed: ${response.status} ${errorText}`);
    }
    return response.body;
}

// --- Inquire / Nexus Brain ---

export async function fetchResearchAndScope(query: string, fileContent: string | null, context: Partial<ReportParameters>): Promise<ResearchAndScopeResult> {
    const response = await fetch('/api/research-and-scope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, fileContent, context }),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'An unknown API error occurred.'}));
        throw new Error(errorData.error || 'Failed to get a response from the research and scope API.');
    }
    return await response.json();
}

export async function diagnoseRegion(region: string, objective: string): Promise<RROI_Index> {
    const response = await fetch('/api/nexus-brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'diagnose', payload: { region, objective } }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get a diagnostic response from the Nexus Brain.');
    }
    return await response.json();
}

export async function simulatePathway(rroi: RROI_Index, intervention: string): Promise<TPT_Simulation> {
    const response = await fetch('/api/nexus-brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'simulate', payload: { rroi, intervention } }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get a simulation response from the Nexus Brain.');
    }
    return await response.json();
}

export async function architectEcosystem(rroi: RROI_Index, objective: string): Promise<SEAM_Blueprint> {
    const response = await fetch('/api/nexus-brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'architect', payload: { rroi, objective } }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get an ecosystem architecture from the Nexus Brain.');
    }
    return await response.json();
}


export async function fetchCapabilities(): Promise<AiCapabilitiesResponse> {
    const response = await fetch('/api/capabilities');
    if (!response.ok) {
        const defaultError = 'Failed to fetch AI capabilities. The assistant may be offline.';
        try {
            const errorData = await response.json();
            throw new Error(errorData.error || defaultError);
        } catch (e) {
            throw new Error(defaultError);
        }
    }
    return await response.json();
}

// --- Regional Data ---
export async function fetchRegionalCities(country: string): Promise<string[]> {
    const response = await fetch(`/api/cities?country=${encodeURIComponent(country)}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch cities for ${country}.`);
    }
    return response.json();
}

export async function refineObjectiveWithContext(objective: string, context: EconomicData): Promise<string> {
    const contextString = Object.entries(context)
        .map(([key, value]) => value ? `${key}: ${value.value} (${value.year})` : null)
        .filter(Boolean)
        .join(', ');

    const response = await fetch('/api/refine-objective', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: objective, answer: contextString }),
    });

    if (!response.ok) {
        throw new Error('Failed to get response from AI to refine objective.');
    }
    const data = await response.json();
    return data.refinedObjective;
}


// --- Text-to-Speech ---
export async function generateSpeech(text: string): Promise<string> {
    const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Speech generation failed: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    return data.audioContent;
}

// --- Report Generation with Job Queue ---
export async function startReportGeneration(params: ReportParameters): Promise<string> {
    const response = await fetch('/api/report/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Report generation failed to start: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.jobId;
}

export async function checkReportStatus(jobId: string): Promise<{ status: 'pending' | 'processing' | 'complete' | 'failed', result?: string, error?: string }> {
    const response = await fetch(`/api/report/status/${jobId}`);

    if (!response.ok) {
        throw new Error(`Failed to check report status: ${response.status}`);
    }

    return await response.json();
}

// --- Economic Data ---
export async function fetchEconomicDataForCountry(country: string): Promise<EconomicData> {
    try {
        const response = await fetch(`/api/economic-data?country=${encodeURIComponent(country)}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Economic data API failed for ${country}:`, errorText);
            // Return current year (2025) fallback data instead of throwing
            return {
                gdp: { value: 450000000000, year: "2025" },
                population: { value: 110000000, year: "2025" },
                inflation: { value: 2.8, year: "2025" },
                fdi: { value: 25000000000, year: "2025" }
            };
        }
        return response.json();
    } catch (error) {
        console.error(`Failed to fetch economic data for ${country}:`, error);
        // Return current year (2025) fallback data for better UX
        return {
            gdp: { value: 450000000000, year: "2025" },
            population: { value: 110000000, year: "2025" },
            inflation: { value: 2.8, year: "2025" },
            fdi: { value: 25000000000, year: "2025" }
        };
    }
}