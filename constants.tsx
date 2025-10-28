import React from 'react';
import { MissionIcon, OpportunitiesIcon, ReportIcon, ComplianceIcon, VentureCapitalistIcon, EconomistIcon, GeopoliticalStrategistIcon, EsgAnalystIcon, InfrastructurePlannerIcon, SupplyChainAnalystIcon, WorkforceSpecialistIcon, TechnologyIcon, RenewableEnergyIcon, InfrastructureIcon, HealthcareIcon, ManufacturingIcon, AgricultureIcon, FinanceIcon, MiningIcon, LogisticsIcon, TourismIcon, EducationIcon, MatchMakerIcon, ManualIcon } from './components/Icons.tsx';
import type { View, ReportParameters, AnalyticalModule, AnalyticalModuleGroup } from './types.ts';

export const ORIGINAL_NAV_ITEMS: { id: View, title: string, description: string, icon: React.FC<any> }[] = [ { id: 'who-we-are', title: 'Who Why & Need', description: 'About BWGA', icon: ManualIcon }, { id: 'opportunities', title: 'Data Hub', description: 'Live Intelligence', icon: OpportunitiesIcon }, { id: 'report', title: 'Workspace', description: 'Inquire & Report', icon: ReportIcon }, { id: 'compliance', title: 'Compliance', description: 'Data & Security', icon: ComplianceIcon }, ];

export const AI_PERSONAS: { id: string, title: string, description: string, icon: React.FC<any> }[] = [
    { id: 'Regional Economist', title: 'Regional Economist', description: 'Focuses on macroeconomic trends, supply chains, workforce analytics, and sustainable development impacts.', icon: EconomistIcon },
    { id: 'Venture Capitalist', title: 'Venture Capitalist', description: 'Focuses on market size, scalability, competitive landscape, ROI potential, and disruptive technology.', icon: VentureCapitalistIcon },
    { id: 'Geopolitical Strategist', title: 'Geopolitical Strategist', description: 'Focuses on trade policy, regulatory stability, international relations, and sovereign risk factors.', icon: GeopoliticalStrategistIcon },
    { id: 'ESG Analyst', title: 'ESG Analyst', description: 'Focuses on Environmental, Social, and Governance (ESG) compliance, sustainability, and impact investing.', icon: EsgAnalystIcon },
    { id: 'Infrastructure Planner', title: 'Infrastructure Planner', description: 'Focuses on logistics, utilities, transportation networks, and smart city development.', icon: InfrastructurePlannerIcon },
    { id: 'Supply Chain Analyst', title: 'Supply Chain Analyst', description: 'Focuses on value chain mapping, sourcing, logistical bottlenecks, and supply chain resilience.', icon: SupplyChainAnalystIcon },
    { id: 'Workforce Development Specialist', title: 'Workforce Specialist', description: 'Focuses on talent pools, skills gap analysis, education infrastructure, and labor market dynamics.', icon: WorkforceSpecialistIcon },
];

export const ANALYTICAL_LENSES = [
  "Default Lens",
  "Technology Adoption & Innovation",
  "SME Growth & Development",
  "Foreign Direct Investment (FDI) Attraction",
  "Public-Private Partnerships (PPP)",
  "Regulatory & Compliance Framework",
  "Climate Impact & Adaptation",
];

export const TONES_AND_STYLES = [
  "Professional & Balanced (Default)",
  "Formal & Academic",
  "Action-Oriented Executive Briefing",
  "Skeptical & Critical",
  "Optimistic & Opportunistic",
  "Data-Heavy & Quantitative",
];

export const ORGANIZATION_TYPES = [
  "Government (National)",
  "Government (State/Provincial)",
  "Government (Local/City)",
  "Investment Promotion Agency",
  "Private Enterprise",
  "Financial Institution / Bank",
  "Non-Profit / NGO",
  "Academic / Research",
  "Other"
].sort();

export const DASHBOARD_CATEGORIES = [
  "Supply Chain & Logistics",
  "Technology & Innovation",
  "Renewable Energy & Cleantech",
  "Geopolitical Shifts",
  "Infrastructure & Construction"
];

export const REGIONS_AND_COUNTRIES = [
  {
    name: "Asia-Pacific",
    countries: ["Australia", "Bangladesh", "China", "India", "Indonesia", "Japan", "Kazakhstan", "Malaysia", "New Zealand", "Pakistan", "Philippines", "Singapore", "South Korea", "Taiwan", "Thailand", "Vietnam"].sort()
  },
  {
    name: "Europe",
    countries: ["Austria", "Belgium", "Czech Republic", "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom"].sort()
  },
  {
    name: "Middle East & North Africa",
    countries: ["Algeria", "Egypt", "Iran", "Iraq", "Israel", "Kuwait", "Morocco", "Oman", "Qatar", "Saudi Arabia", "Turkey", "United Arab Emirates"].sort()
  },
  {
    name: "North America",
    countries: ["Canada", "Mexico", "United States"].sort()
  },
  {
    name: "South America",
    countries: ["Argentina", "Brazil", "Chile", "Colombia", "Ecuador", "Peru"].sort()
  },
  {
    name: "Sub-Saharan Africa",
    countries: ["Angola", "Ethiopia", "Kenya", "Nigeria", "South Africa"].sort()
  }
];

export const COUNTRIES = REGIONS_AND_COUNTRIES.flatMap(region => region.countries).sort();


export const INDUSTRIES: { id: string, title: string, icon: React.FC<any> }[] = [
    { id: 'Technology & Innovation', title: 'Tech & Innovation', icon: TechnologyIcon },
    { id: 'Renewable Energy & Cleantech', title: 'Renewable Energy', icon: RenewableEnergyIcon },
    { id: 'Infrastructure & Construction', title: 'Infrastructure', icon: InfrastructureIcon },
    { id: 'Healthcare & Life Sciences', title: 'Healthcare', icon: HealthcareIcon },
    { id: 'Advanced Manufacturing', title: 'Manufacturing', icon: ManufacturingIcon },
    { id: 'Agriculture & AgriTech', title: 'AgriTech', icon: AgricultureIcon },
    { id: 'Financial Services & FinTech', title: 'Financial Services', icon: FinanceIcon },
    { id: 'Mining & Resources', title: 'Mining & Resources', icon: MiningIcon },
    { id: 'Logistics & Supply Chain', title: 'Logistics', icon: LogisticsIcon },
    { id: 'Tourism & Hospitality', title: 'Tourism', icon: TourismIcon },
    { id: 'Education & EdTech', title: 'EdTech', icon: EducationIcon },
    { id: 'Match Maker', title: 'Match Maker', icon: MatchMakerIcon },
];

export const TIERS_BY_ORG_TYPE: Record<string, { id: string, title: string, desc: string, features: string[] }[]> = {
  "Default": [
    { id: 'DirectMatchmaking', title: 'Direct Matchmaking', desc: 'Finds and profiles one ideal foreign partner based on your detailed criteria.', features: ['1 Ideal Partner Match', 'Core Synergy Analysis', 'Contact Strategy Outline'] },
    { id: 'CompetitiveLandscape', title: 'Competitive Landscape', desc: 'Profiles up to three potential partners and analyzes their competitive positioning.', features: ['Up to 3 Partner Matches', 'Comparative SWOT', 'Market Positioning'] },
    { id: 'PartnershipFacilitator', title: 'Partnership Facilitator', desc: 'In-depth analysis of three partners with contact strategy and simulated impact.', features: ['3 In-Depth Profiles', 'Stakeholder Mapping', 'Economic Impact Simulation'] },
    { id: 'StrategicAllianceBlueprint', title: 'Strategic Alliance Blueprint', desc: 'Outlines a joint venture or strategic alliance structure with a top partner.', features: ['In-Depth Partner Analysis', 'JV/Alliance Governance Model', 'Synergy & Risk Mapping'] },
  ],
  "Government": [
    { id: 'Policy Brief', title: 'Policy Brief', desc: 'Analyzes an issue and provides policy recommendations.', features: ['Situational Analysis', 'Comparative Policy Review', 'Actionable Recommendations'] },
    { id: 'FDI Attraction', title: 'FDI Attraction Blueprint', desc: 'Identifies and profiles ideal foreign investors for a specific sector.', features: ['Sector Strength Analysis', 'Ideal Investor Profiling', 'Value Proposition Outline'] },
    { id: 'Economic Impact', title: 'Economic Impact Analysis', desc: 'Models the potential economic effects of a major project or policy.', features: ['Input-Output Modeling', 'Job Creation Forecasting', 'Supply Chain Effects'] },
    { id: 'Workforce Plan', title: 'Workforce Development Plan', desc: 'Analyzes skills gaps and proposes a strategy to build a future-ready workforce.', features: ['Skills Gap Analysis', 'Education Infrastructure Review', 'Industry Partnership Strategy'] },
    { id: 'SupplyChainGap', title: 'Supply Chain Gap Analysis', desc: 'Deep-dive into a value chain to find critical gaps and investment opportunities.', features: ['Value Chain Mapping', 'Input/Output Analysis', 'Targeted Investor Profiles'] },
    { id: 'RegulatoryBenchmarking', title: 'Regulatory Benchmarking', desc: 'Compares your region’s policies against competitors to identify advantages.', features: ['Comparative Policy Matrix', 'Investor "Pain Point" ID', 'Actionable Reform Ideas'] },
    { id: 'SDGAlignment', title: 'SDG Alignment Report', desc: 'Assesses a project’s alignment with UN SDGs to attract impact-focused investment.', features: ['SDG Target Mapping', 'Impact Measurement Framework', '“Green” Finance Potential'] },
    { id: 'InfrastructurePlan', title: 'Infrastructure Master Plan', desc: 'Outlines a strategic plan for critical infrastructure development to support economic growth.', features: ['Infrastructure Gap Analysis', 'Project Prioritization Matrix', 'Investment Phasing Plan'] },
    { id: 'TradeFacilitation', title: 'Intergovernmental Trade Facilitation', desc: 'Connects governments for trade partnerships, tariff offset strategies, and economic diplomacy.', features: ['Government-to-Government Matchmaking', 'Tariff Offset Mechanisms', 'Trade Agreement Optimization', 'Economic Diplomacy Framework'] },
  ],
  "Private Enterprise": [
    { id: 'Market Entry', title: 'Market Entry Strategy', desc: 'Assesses a new market and outlines a strategic approach for entry.', features: ['Market Size & Growth', 'Competitive Landscape', 'Regulatory Analysis', 'Go-to-Market Plan'] },
    { id: 'Partner Vetting', title: 'Partner Vetting Report', desc: 'Conducts deep-dive due diligence on potential local partners.', features: ['Financial Health Analysis', 'Reputation & Track Record', 'Synergy & Risk Assessment'] },
    { id: 'Supply Chain', title: 'Supply Chain Resilience', desc: 'Maps a supply chain and identifies risks and optimization opportunities.', features: ['Value Chain Mapping', 'Bottleneck Identification', 'Geopolitical Risk Exposure'] },
    { id: 'Tech Scout', title: 'Technology Scouting', desc: 'Identifies emerging technologies and potential acquisition targets.', features: ['Innovation Landscape Scan', 'Startup Ecosystem Analysis', 'IP & Tech Due Diligence'] },
    { id: 'SiteSelection', title: 'Site Selection Matrix', desc: 'Compares potential locations for a new facility based on critical factors.', features: ['Logistics & Labor Scoring', 'Real Estate & Utility Costs', 'Local Incentive Review'] },
    { id: 'CompetitiveIntel', title: 'Competitive Intelligence', desc: 'Deep-dive on key competitors in a target market to inform strategy.', features: ['Competitor SWOT Analysis', 'Market Positioning Map', 'Implied Strategic Intent'] },
    { id: 'SDGAlignment', title: 'SDG Alignment Report', desc: 'Assesses a project’s alignment with UN SDGs to strengthen ESG credentials.', features: ['SDG Target Mapping', 'Impact Measurement Framework', '“Green” Finance Potential'] },
    { id: 'GeopoliticalRisk', title: 'Geopolitical Risk Assessment', desc: 'Analyzes the geopolitical landscape of a target market to identify risks and mitigation strategies.', features: ['Political Stability Analysis', 'Regulatory Risk Mapping', 'Supply Chain Vulnerability'] },
    { id: 'TradeOptimization', title: 'Trade Cost Optimization', desc: 'Identifies tariff offset mechanisms and trade cost reduction strategies.', features: ['Tariff Offset Analysis', 'Trade Agreement Utilization', 'Cost Optimization Strategies', 'Regulatory Compliance'] },
  ],
};
// Add aliases for different government levels
TIERS_BY_ORG_TYPE["Government (National)"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Government (State/Provincial)"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Government (Local/City)"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Investment Promotion Agency"] = TIERS_BY_ORG_TYPE["Government"];
// Add aliases for finance and other orgs
TIERS_BY_ORG_TYPE["Financial Institution / Bank"] = TIERS_BY_ORG_TYPE["Private Enterprise"];
TIERS_BY_ORG_TYPE["Non-Profit / NGO"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Academic / Research"] = TIERS_BY_ORG_TYPE["Government"];
TIERS_BY_ORG_TYPE["Other"] = TIERS_BY_ORG_TYPE["Default"];


export const ANALYTICAL_MODULES: Record<string, AnalyticalModuleGroup> = {
  economic: {
    title: 'Economic Intelligence',
    modules: [
      { id: 'marketStability', name: 'Market Stability Analysis', description: 'Advanced market stability metrics and predictions', status: 'Enterprise' },
      { id: 'economicForecasting', name: 'Economic Forecasting Engine', description: 'Multi-factor economic scenario modeling', status: 'Enterprise' },
      { id: 'tradeFlowAnalysis', name: 'Trade Flow Analytics', description: 'Global trade pattern analysis and prediction', status: 'Enterprise' },
    ],
  },
  environmental: {
    title: 'Environmental & Sustainability',
    modules: [
      { id: 'climateRisk', name: 'Climate Risk Assessment', description: 'Climate impact and adaptation analysis', status: 'Enterprise' },
      { id: 'environmentalCompliance', name: 'Environmental Compliance', description: 'Regulatory compliance and risk assessment', status: 'Enterprise' },
      { id: 'sustainabilityMetrics', name: 'Sustainability Analytics', description: 'ESG metrics and sustainability scoring', status: 'Enterprise' },
    ],
  },
  social: {
    title: 'Social Impact & Demographics',
    modules: [
      { id: 'demographicAnalysis', name: 'Demographic Intelligence', description: 'Population trends and demographic analysis', status: 'Enterprise' },
      { id: 'migrationPatterns', name: 'Migration Pattern Analysis', description: 'Population movement and impact assessment', status: 'Enterprise' },
      { id: 'socialImpact', name: 'Social Impact Assessment', description: 'Community and societal impact analysis', status: 'Enterprise' },
    ],
  },
  infrastructure: {
    title: 'Infrastructure & Development',
    modules: [
      { id: 'infrastructureGaps', name: 'Infrastructure Gap Analysis', description: 'Infrastructure needs and optimization', status: 'Enterprise' },
      { id: 'developmentPlanning', name: 'Development Planning Tools', description: 'Regional development strategy optimization', status: 'Enterprise' },
      { id: 'smartCityMetrics', name: 'Smart City Analytics', description: 'Urban development and smart city metrics', status: 'Enterprise' },
    ],
  },
  innovation: {
    title: 'Innovation & Technology',
    modules: [
      { id: 'innovationEcosystem', name: 'Innovation Ecosystem Analysis', description: 'Innovation capacity and ecosystem assessment', status: 'Enterprise' },
      { id: 'techTransferMetrics', name: 'Technology Transfer Analytics', description: 'Technology adoption and transfer analysis', status: 'Enterprise' },
      { id: 'startupEcosystem', name: 'Startup Ecosystem Analysis', description: 'Startup environment and support assessment', status: 'Enterprise' },
    ],
  },
  predictive: {
    title: 'Predictive Intelligence (Nexus Brain)',
    modules: [
      { id: 'trendForecasting', name: 'Emerging Trend Forecasting', description: 'Analyzes current data to forecast future market and technology trends.', status: 'Enterprise' },
      { id: 'scenarioModeling', name: 'Predictive Scenario Modeling', description: 'Simulates potential future scenarios based on key drivers and uncertainties.', status: 'Enterprise' },
      { id: 'disruptionAnalysis', name: 'Disruption & Opportunity Analysis', description: 'Identifies potential disruptive forces and the opportunities they create.', status: 'Enterprise' },
      { id: 'tradeDisruptionAnalysis', name: 'Global Trade Disruption Analysis', description: 'Mathematical modeling of tariff impacts, supply chain disruptions, and market diversification strategies.', status: 'Enterprise' },
      { id: 'marketDiversificationEngine', name: 'Market Diversification Engine', description: 'Advanced algorithms for identifying alternative markets and optimizing global trade portfolios.', status: 'Enterprise' },
      { id: 'tariffOffsetAnalysis', name: 'Tariff Offset & Trade Facilitation', description: 'Comprehensive analysis of tariff offset mechanisms, free trade agreements, and government-to-government trade facilitation strategies.', status: 'Enterprise' },
      { id: 'intergovernmentalTrade', name: 'Intergovernmental Trade Intelligence', description: 'Government-to-government matchmaking, economic diplomacy frameworks, and bilateral trade partnership analysis.', status: 'Enterprise' },
    ],
  },
  governance: {
    title: 'Governance & Policy',
    modules: [
      { id: 'policyImpact', name: 'Policy Impact Simulator', description: 'Policy implementation impact analysis', status: 'Enterprise' },
      { id: 'regulatoryAnalysis', name: 'Regulatory Environment Analysis', description: 'Regulatory framework assessment', status: 'Enterprise' },
      { id: 'governanceMetrics', name: 'Governance Quality Metrics', description: 'Governance effectiveness assessment', status: 'Enterprise' },
    ],
  },
};