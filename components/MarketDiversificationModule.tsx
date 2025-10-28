import React, { useState, useEffect } from 'react';
import { TradeDisruptionAnalyzer, TradeDisruptionDisplay } from './TradeDisruptionModel.tsx';

interface MarketDiversificationMetrics {
  currentMarketConcentration: number; // HHI index
  diversificationPotential: number;
  alternativeMarkets: MarketOpportunity[];
  riskAdjustedReturns: number;
  implementationComplexity: number;
}

interface MarketOpportunity {
  market: string;
  region: string;
  tradeVolume: number;
  growthRate: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  entryBarriers: number; // 1-10 scale
  competitiveAdvantage: string;
  recommendedStrategy: string;
}

interface DiversificationAnalysis {
  primaryMarket: string;
  currentDependence: number; // Percentage of total exports
  metrics: MarketDiversificationMetrics;
  opportunities: MarketOpportunity[];
  strategicRecommendations: string[];
  timeline: {
    shortTerm: string[]; // 1-2 years
    mediumTerm: string[]; // 3-5 years
    longTerm: string[]; // 5+ years
  };
}

export class MarketDiversificationEngine {
  // Calculate Herfindahl-Hirschman Index for market concentration
  static calculateMarketConcentration(marketShares: { [market: string]: number }): number {
    const totalShare = Object.values(marketShares).reduce((sum, share) => sum + share, 0);
    const hhi = Object.values(marketShares).reduce((sum, share) => {
      const normalizedShare = share / totalShare;
      return sum + (normalizedShare * normalizedShare);
    }, 0) * 10000; // Scale to 0-10000

    return hhi;
  }

  // Advanced diversification scoring algorithm
  static analyzeDiversificationOpportunities(
    currentMarkets: { [market: string]: number },
    potentialMarkets: string[],
    tradeDisruptionRisk: number
  ): DiversificationAnalysis {
    const currentConcentration = this.calculateMarketConcentration(currentMarkets);
    const primaryMarket = Object.keys(currentMarkets).reduce((a, b) =>
      currentMarkets[a] > currentMarkets[b] ? a : b
    );

    const currentDependence = Math.max(...Object.values(currentMarkets));

    // Generate market opportunities based on diversification potential
    const opportunities = this.generateMarketOpportunities(potentialMarkets, tradeDisruptionRisk);

    // Calculate diversification potential
    const diversificationPotential = Math.min(100, (10000 - currentConcentration) / 100);

    // Risk-adjusted returns calculation
    const riskAdjustedReturns = this.calculateRiskAdjustedReturns(opportunities, tradeDisruptionRisk);

    // Implementation complexity assessment
    const implementationComplexity = this.assessImplementationComplexity(opportunities);

    return {
      primaryMarket,
      currentDependence,
      metrics: {
        currentMarketConcentration: currentConcentration,
        diversificationPotential,
        alternativeMarkets: opportunities,
        riskAdjustedReturns,
        implementationComplexity
      },
      opportunities,
      strategicRecommendations: this.generateStrategicRecommendations(currentConcentration, opportunities),
      timeline: this.createImplementationTimeline(opportunities)
    };
  }

  private static generateMarketOpportunities(
    potentialMarkets: string[],
    disruptionRisk: number
  ): MarketOpportunity[] {
    const regions = ['ASEAN', 'EU', 'NAFTA', 'Middle East', 'Africa', 'Latin America'];
    const opportunities: MarketOpportunity[] = [];

    potentialMarkets.forEach((market, index) => {
      const region = regions[index % regions.length];
      const baseVolume = Math.random() * 5000000 + 1000000; // $1M - $6M
      const growthRate = Math.random() * 0.15 + 0.02; // 2-17% growth
      const riskLevel = disruptionRisk > 0.7 ? 'High' : disruptionRisk > 0.4 ? 'Medium' : 'Low';
      const entryBarriers = Math.floor(Math.random() * 7) + 2; // 2-8 scale

      opportunities.push({
        market,
        region,
        tradeVolume: baseVolume,
        growthRate,
        riskLevel: riskLevel as 'Low' | 'Medium' | 'High',
        entryBarriers,
        competitiveAdvantage: this.generateCompetitiveAdvantage(market, region),
        recommendedStrategy: this.generateEntryStrategy(entryBarriers, riskLevel)
      });
    });

    return opportunities.sort((a, b) => b.tradeVolume - a.tradeVolume);
  }

  private static generateCompetitiveAdvantage(market: string, region: string): string {
    const advantages = [
      `Strong regional supply chain presence in ${region}`,
      `Established trade relationships and cultural understanding`,
      `Competitive cost structure for ${market} market requirements`,
      `Technological edge in sustainable production methods`,
      `Strategic geographic positioning for logistics efficiency`,
      `Proven track record in similar market conditions`
    ];
    return advantages[Math.floor(Math.random() * advantages.length)];
  }

  private static generateEntryStrategy(barriers: number, risk: string): string {
    if (barriers <= 3 && risk === 'Low') return 'Direct market entry with local partnership';
    if (barriers <= 5) return 'Joint venture or strategic alliance approach';
    if (barriers <= 7) return 'Gradual market penetration through distributors';
    return 'Comprehensive due diligence and phased entry strategy';
  }

  private static calculateRiskAdjustedReturns(
    opportunities: MarketOpportunity[],
    baseRisk: number
  ): number {
    const avgReturn = opportunities.reduce((sum, opp) => sum + opp.growthRate, 0) / opportunities.length;
    const avgRisk = opportunities.reduce((sum, opp) => {
      const riskScore = opp.riskLevel === 'Low' ? 0.2 : opp.riskLevel === 'Medium' ? 0.5 : 0.8;
      return sum + riskScore;
    }, 0) / opportunities.length;

    return Math.max(0, Math.min(100, (avgReturn * 100) - (avgRisk * baseRisk * 50)));
  }

  private static assessImplementationComplexity(opportunities: MarketOpportunity[]): number {
    const avgBarriers = opportunities.reduce((sum, opp) => sum + opp.entryBarriers, 0) / opportunities.length;
    const highRiskCount = opportunities.filter(opp => opp.riskLevel === 'High').length;
    const riskMultiplier = 1 + (highRiskCount / opportunities.length);

    return Math.min(100, (avgBarriers / 10) * 100 * riskMultiplier);
  }

  private static generateStrategicRecommendations(
    concentration: number,
    opportunities: MarketOpportunity[]
  ): string[] {
    const recommendations = [];

    if (concentration > 2500) {
      recommendations.push("Critical: Extremely high market concentration detected. Immediate diversification required.");
    } else if (concentration > 1500) {
      recommendations.push("High market concentration. Accelerate diversification initiatives.");
    }

    const highGrowthOpportunities = opportunities.filter(opp => opp.growthRate > 0.1);
    if (highGrowthOpportunities.length > 0) {
      recommendations.push(`Prioritize high-growth markets: ${highGrowthOpportunities.slice(0, 2).map(o => o.market).join(', ')}`);
    }

    const lowRiskOpportunities = opportunities.filter(opp => opp.riskLevel === 'Low');
    if (lowRiskOpportunities.length > 0) {
      recommendations.push("Focus initial diversification efforts on low-risk markets to build momentum.");
    }

    recommendations.push("Develop comprehensive market entry playbooks for each target market.");
    recommendations.push("Establish regional trade offices and partnership networks.");

    return recommendations;
  }

  private static createImplementationTimeline(opportunities: MarketOpportunity[]): {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  } {
    const lowBarrierOpps = opportunities.filter(opp => opp.entryBarriers <= 4);
    const mediumBarrierOpps = opportunities.filter(opp => opp.entryBarriers > 4 && opp.entryBarriers <= 7);
    const highBarrierOpps = opportunities.filter(opp => opp.entryBarriers > 7);

    return {
      shortTerm: [
        `Market research and partnership identification in ${lowBarrierOpps.slice(0, 2).map(o => o.market).join(', ')}`,
        "Establish trade representative offices in priority markets",
        "Develop market entry templates and compliance frameworks"
      ],
      mediumTerm: [
        `Expand presence in ${mediumBarrierOpps.slice(0, 2).map(o => o.market).join(', ')}`,
        "Build strategic alliances and joint ventures",
        "Implement comprehensive market monitoring systems"
      ],
      longTerm: [
        `Full market penetration in ${highBarrierOpps.slice(0, 1).map(o => o.market).join(', ')}`,
        "Develop regional headquarters and manufacturing facilities",
        "Achieve balanced global market distribution (target HHI < 1500)"
      ]
    };
  }
}

export const MarketDiversificationDashboard: React.FC<{
  currentMarkets: { [market: string]: number };
  potentialMarkets: string[];
  tradeDisruptionRisk: number;
}> = ({ currentMarkets, potentialMarkets, tradeDisruptionRisk }) => {
  const [analysis, setAnalysis] = useState<DiversificationAnalysis | null>(null);

  useEffect(() => {
    const result = MarketDiversificationEngine.analyzeDiversificationOpportunities(
      currentMarkets,
      potentialMarkets,
      tradeDisruptionRisk
    );
    setAnalysis(result);
  }, [currentMarkets, potentialMarkets, tradeDisruptionRisk]);

  if (!analysis) return <div>Loading analysis...</div>;

  const { metrics, opportunities, strategicRecommendations, timeline } = analysis;

  return (
    <div className="market-diversification-dashboard space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-nexus-accent-brown to-nexus-accent-cyan p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-2">Market Diversification Intelligence</h2>
        <p className="text-white/80">Strategic analysis for reducing trade dependency and capturing new opportunities</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-nexus-surface-800 p-4 rounded-lg border border-nexus-border-medium">
          <h4 className="text-sm font-semibold text-nexus-accent-brown mb-2">Market Concentration</h4>
          <p className="text-2xl font-bold text-nexus-text-primary">{metrics.currentMarketConcentration.toFixed(0)}</p>
          <p className="text-xs text-nexus-text-secondary">HHI Index</p>
        </div>

        <div className="bg-nexus-surface-800 p-4 rounded-lg border border-nexus-border-medium">
          <h4 className="text-sm font-semibold text-nexus-accent-cyan mb-2">Diversification Potential</h4>
          <p className="text-2xl font-bold text-nexus-text-primary">{metrics.diversificationPotential.toFixed(1)}%</p>
          <p className="text-xs text-nexus-text-secondary">Opportunity Score</p>
        </div>

        <div className="bg-nexus-surface-800 p-4 rounded-lg border border-nexus-border-medium">
          <h4 className="text-sm font-semibold text-nexus-accent-brown mb-2">Risk-Adjusted Returns</h4>
          <p className="text-2xl font-bold text-nexus-text-primary">{metrics.riskAdjustedReturns.toFixed(1)}%</p>
          <p className="text-xs text-nexus-text-secondary">Expected Return</p>
        </div>

        <div className="bg-nexus-surface-800 p-4 rounded-lg border border-nexus-border-medium">
          <h4 className="text-sm font-semibold text-nexus-accent-cyan mb-2">Implementation Complexity</h4>
          <p className="text-2xl font-bold text-nexus-text-primary">{metrics.implementationComplexity.toFixed(1)}%</p>
          <p className="text-xs text-nexus-text-secondary">Difficulty Score</p>
        </div>
      </div>

      {/* Market Opportunities */}
      <div className="bg-nexus-surface-800 p-6 rounded-xl border border-nexus-border-medium">
        <h3 className="text-xl font-bold text-nexus-text-primary mb-4">Alternative Market Opportunities</h3>
        <div className="space-y-4">
          {opportunities.slice(0, 5).map((opp, index) => (
            <div key={index} className="bg-nexus-surface-700 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-nexus-text-primary">{opp.market}</h4>
                  <p className="text-sm text-nexus-text-secondary">{opp.region}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  opp.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' :
                  opp.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {opp.riskLevel} Risk
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-nexus-text-secondary">Trade Volume</p>
                  <p className="font-semibold text-nexus-text-primary">${(opp.tradeVolume / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-xs text-nexus-text-secondary">Growth Rate</p>
                  <p className="font-semibold text-nexus-text-primary">{(opp.growthRate * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-nexus-text-secondary">Entry Barriers</p>
                  <p className="font-semibold text-nexus-text-primary">{opp.entryBarriers}/10</p>
                </div>
              </div>

              <div className="text-sm text-nexus-text-secondary">
                <p className="mb-2"><strong>Competitive Advantage:</strong> {opp.competitiveAdvantage}</p>
                <p><strong>Recommended Strategy:</strong> {opp.recommendedStrategy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-nexus-surface-800 p-6 rounded-xl border border-nexus-border-medium">
        <h3 className="text-xl font-bold text-nexus-text-primary mb-4">Strategic Recommendations</h3>
        <ul className="space-y-2">
          {strategicRecommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-nexus-surface-700 rounded-lg">
              <span className="text-nexus-accent-cyan mt-1">•</span>
              <span className="text-sm text-nexus-text-secondary">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Implementation Timeline */}
      <div className="bg-nexus-surface-800 p-6 rounded-xl border border-nexus-border-medium">
        <h3 className="text-xl font-bold text-nexus-text-primary mb-4">Implementation Timeline</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-nexus-accent-cyan mb-3">Short Term (1-2 Years)</h4>
            <ul className="space-y-2">
              {timeline.shortTerm.map((item, index) => (
                <li key={index} className="text-sm text-nexus-text-secondary flex items-start gap-2">
                  <span className="text-nexus-accent-cyan mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-nexus-accent-brown mb-3">Medium Term (3-5 Years)</h4>
            <ul className="space-y-2">
              {timeline.mediumTerm.map((item, index) => (
                <li key={index} className="text-sm text-nexus-text-secondary flex items-start gap-2">
                  <span className="text-nexus-accent-brown mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-nexus-accent-cyan mb-3">Long Term (5+ Years)</h4>
            <ul className="space-y-2">
              {timeline.longTerm.map((item, index) => (
                <li key={index} className="text-sm text-nexus-text-secondary flex items-start gap-2">
                  <span className="text-nexus-accent-cyan mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDiversificationEngine;