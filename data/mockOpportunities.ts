import type { LiveOpportunitiesResponse } from '../types.ts';

export const MOCK_OPPORTUNITIES: LiveOpportunitiesResponse = {
  feed: [
    {
      id: "WB-12345",
      timestamp: "2024-05-20T10:00:00Z",
      type: "opportunity",
      content: {
        project_name: "National Digital Transformation Backbone",
        country: "Kenya",
        sector: "Technology & Innovation",
        value: "$500 Million",
        summary: "World Bank funded project to establish a nationwide fiber optic network and data centers to boost digital services and connectivity.",
        source_url: "https://projects.worldbank.org/en/projects-operations/project-detail/P178229",
        ai_feasibility_score: 85,
        ai_risk_assessment: "Key risk involves navigating complex regional regulations and ensuring last-mile connectivity in rural areas.",
      }
    },
    {
        id: "NEWS-001",
        timestamp: "2024-05-20T09:00:00Z",
        type: 'news',
        content: {
            headline: "Vietnam Emerges as Key Hub in Semiconductor Supply Chain Shift",
            summary: "Major chip manufacturers are increasing investment in Vietnamese facilities, citing skilled labor and government incentives as key drivers for diversifying away from traditional manufacturing centers.",
            source: "Reuters",
            link: "#",
            region: "Southeast Asia",
        }
    },
    {
      id: "ADB-67890",
      timestamp: "2024-05-19T14:30:00Z",
      type: "opportunity",
      content: {
        project_name: "Panay-Guimaras-Negros Island Bridges Project",
        country: "Philippines",
        sector: "Infrastructure & Construction",
        value: "$3.2 Billion",
        summary: "A flagship infrastructure project to connect three major islands in the Visayas region with a series of long-span bridges, aimed at boosting trade and tourism.",
        source_url: "https://www.adb.org/projects/50252-002/main",
        ai_feasibility_score: 78,
        ai_risk_assessment: "Significant engineering and environmental challenges, alongside potential for land acquisition delays, are the primary risks.",
      }
    },
    {
        id: "INDICATOR-001",
        timestamp: "2024-05-19T08:00:00Z",
        type: 'indicator',
        content: {
            name: "LATAM Green Energy Investment",
            value: "$25.4B (YTD)",
            change: 15.2,
            region: "Latin America"
        }
    },
    {
      id: "AfDB-11223",
      timestamp: "2024-05-18T11:00:00Z",
      type: "opportunity",
      content: {
        project_name: "Desert to Power Initiative - G5 Sahel",
        country: "Niger",
        sector: "Renewable Energy & Cleantech",
        value: "$20 Billion (Multi-phase)",
        summary: "African Development Bank initiative to develop 10 GW of solar generation capacity across the Sahel region to provide clean energy to 250 million people.",
        source_url: "https://www.afdb.org/en/desert-to-power-initiative",
        ai_feasibility_score: 92,
        ai_risk_assessment: "Geopolitical instability in the Sahel region presents a major operational and security risk for the project's implementation.",
      }
    },
     {
        id: "NEWS-002",
        timestamp: "2024-05-18T09:00:00Z",
        type: 'news',
        content: {
            headline: "Chile and Germany Sign Landmark Green Hydrogen Alliance",
            summary: "The agreement aims to accelerate production and establish a transatlantic supply chain for green hydrogen, positioning Chile as a key global supplier.",
            source: "Bloomberg",
            link: "#",
            region: "Global",
        }
    },
  ]
};
