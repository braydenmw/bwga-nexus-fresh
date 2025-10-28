import { LiveServerMessage, Modality, Blob } from "@google/genai";

export type View = 'opportunities' | 'report' | 'compliance' | 'sample-report' | 'technical-manual' | 'who-we-are';

export interface AnalyticalModule {
  id: string;
  name: string;
  description: string;
  status: 'Core' | 'Enterprise' | 'Future';
}

export interface AnalyticalModuleGroup {
  title: string;
  modules: AnalyticalModule[];
}

export type ReportLength = 'snapshot' | 'brief' | 'standard' | 'comprehensive';
export type OutputFormat = 'report' | 'letter' | 'both';

export interface ReportParameters {
  reportName: string;
  tier: string[];
  userName: string;
  userDepartment: string;
  organizationType: string;
  userCountry: string;
  aiPersona: string[];
  customAiPersona?: string;
  analyticalLens?: string[];
  toneAndStyle?: string[];
  region: string;
  industry: string[];
  customIndustry?: string;
  idealPartnerProfile: string;
  problemStatement: string;
  analysisTimeframe: string;
  analyticalModules: string[];
  reportLength: ReportLength;
  outputFormat: OutputFormat;
}

export type ReportSuggestions = Partial<Pick<ReportParameters, 'reportName' | 'region' | 'problemStatement' | 'idealPartnerProfile' | 'tier' | 'aiPersona'>> & {
    industry?: string; // Keep as string for simple suggestion
};

export interface ResearchAndScopeResult {
    summary: string;
    suggestions: ReportSuggestions;
}


export interface LiveOpportunityItem {
  project_name: string;
  country: string;
  sector: string;
  value: string;
  summary: string;
  source_url: string;
  ai_feasibility_score?: number;
  ai_risk_assessment?: string;
  isUserAdded?: boolean;
}

export interface SymbiosisContext {
  topic: string;
  originalContent: string;
  reportParameters?: ReportParameters;
}

export interface UserProfile {
  userName: string;
  userDepartment:string;
  organizationType: string;
  userCountry: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface DashboardIntelligence {
    category: string;
    items: {
        company: string;
        details: string;
        implication: string;
        source: string;
        url: string;
    }[];
}

export interface NewsContent {
    headline: string;
    summary: string;
    source: string;
    link: string;
    region: string;
}

export interface IndicatorContent {
    name: string;
    value: string;
    change: number;
    region: string;
}

export type FeedPost = {
    id: string;
    timestamp: string;
} & (
    | { type: 'opportunity'; content: LiveOpportunityItem }
    | { type: 'news'; content: NewsContent }
    | { type: 'indicator'; content: IndicatorContent }
);

export interface InquireResult {
  answer: string;
  sources: { web: { uri: string; title: string; } }[];
}

export interface LiveOpportunitiesResponse {
    feed: FeedPost[];
    isMockData?: boolean;
}

export interface UNComtradeOptions {
  reporter?: string;
  partner?: string;
  tradeFlow?: string;
  year?: string;
  classification?: string;
}

export interface UNComtradeResponse {
  commodity: string;
  commodityCode: string;
  reporter: string;
  partner: string;
  tradeFlow: string;
  tradeValue: number;
  netWeight: number;
  year: string;
  period: string;
}

export interface WorldBankOptions {
  country?: string;
  date?: string;
  format?: string;
}

export interface WorldBankResponse {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number;
  unit: string;
  obs_status: string;
  decimal: number;
}

export interface AiCapability {
  title: string;
  description: string;
  prompt: string;
}

export interface AiCapabilitiesResponse {
    greeting: string;
    capabilities: AiCapability[];
}

export interface EconomicData {
  gdp?: { value: number; year: string };
  population?: { value: number; year: string };
  inflation?: { value: number; year: string };
  fdi?: { value: number; year: string };
}

export interface PredictiveAnalysis {
  emergingTrends: { trend: string; justification: string; }[];
  futureOpportunities: { opportunity: string; rationale: string; }[];
  potentialDisruptions: { disruption: string; impact: string; }[];
}

// --- NEXUS BRAIN TYPES V1 ---
export type NexusBrainAction = 'diagnose' | 'simulate' | 'architect' | 'generate_model';

// Layer 1: RROI (Diagnostic)
export interface RROI_Component {
  name: string;
  score: number; // 0-100
  analysis: string;
}
export interface RROI_Index {
  overallScore: number;
  summary: string;
  components: {
    humanCapital: RROI_Component;
    infrastructure: RROI_Component;
    agglomeration: RROI_Component;
    economicComposition: RROI_Component; // Based on LQ and Shift-Share
    governance: RROI_Component;
    qualityOfLife: RROI_Component;
  }
}

// Layer 2: TPT (Predictive)
export interface TPT_Simulation {
  scenario: string;
  intervention: string;
  timeline: string;
  impactAnalysis: string;
  predictedOutcomes: {
    metric: string;
    startValue: number;
    endValue: number;
  }[];
}

// Layer 3: SEAM (Prescriptive)
export interface EcosystemPartner {
  type: 'Anchor' | 'Infrastructure' | 'Innovation' | 'Capital' | 'Government' | 'Community';
  entity: string; // e.g., "Netafim (Israel)"
  rationale: string;
}
export interface SEAM_Blueprint {
  strategicObjective: string;
  ecosystemSummary: string;
  partners: EcosystemPartner[];
}

// API Response Types
export type NexusBrainResponse = RROI_Index | TPT_Simulation | SEAM_Blueprint;

// --- NEXUS BRAIN TYPES V2 (Digital Twin) ---
export interface DigitalTwinIntervention {
  type: 'Partner' | 'Policy' | 'Infrastructure';
  description: string;
  timeline?: string; // e.g., "5-10 years"
}

export interface GenerativeModel {
  modelName: string;
  corePrinciples: { principle: string; rationale: string; }[];
  summary: string;
}

export interface NexusBrainState {
  diagnosis: RROI_Index | null;
  simulation: TPT_Simulation | null;
  ecosystem: SEAM_Blueprint | null;
  // V2 State
  generativeModel: GenerativeModel | null;
}