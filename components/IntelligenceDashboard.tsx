import React from 'react';
import type { ReportParameters, OpportunityScore, ModuleScore, ComplexityScore } from '../types.ts';

interface IntelligenceDashboardProps {
  params: ReportParameters;
  opportunityScore?: OpportunityScore;
  moduleScore?: ModuleScore;
  complexityScore?: ComplexityScore;
}

export const IntelligenceDashboard: React.FC<IntelligenceDashboardProps> = ({
  params,
  opportunityScore,
  moduleScore,
  complexityScore
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-nexus-surface-800 border border-nexus-border-medium rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-nexus-accent-cyan/20 rounded-lg flex items-center justify-center">
          <span className="text-nexus-accent-cyan text-lg">📊</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-nexus-text-primary">Intelligence Dashboard</h3>
          <p className="text-sm text-nexus-text-secondary">Real-time analytics and scoring insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Opportunity Score */}
        {opportunityScore && (
          <div className="bg-nexus-surface-900 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-nexus-text-primary mb-3">Opportunity Score</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-nexus-text-secondary">Overall</span>
                <span className={`text-sm font-bold ${getScoreColor(opportunityScore.totalScore)}`}>
                  {opportunityScore.totalScore}/100
                </span>
              </div>
              <div className="w-full bg-nexus-surface-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getScoreBarColor(opportunityScore.totalScore)}`}
                  style={{ width: `${opportunityScore.totalScore}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-nexus-text-secondary">Market:</span>
                  <span className={`ml-1 ${getScoreColor(opportunityScore.marketPotential)}`}>
                    {opportunityScore.marketPotential}
                  </span>
                </div>
                <div>
                  <span className="text-nexus-text-secondary">Risk:</span>
                  <span className={`ml-1 ${getScoreColor(100 - opportunityScore.riskFactors)}`}>
                    {100 - opportunityScore.riskFactors}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module Score */}
        {moduleScore && (
          <div className="bg-nexus-surface-900 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-nexus-text-primary mb-3">Module Score</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-nexus-text-secondary">Overall</span>
                <span className={`text-sm font-bold ${getScoreColor(moduleScore.totalScore)}`}>
                  {moduleScore.totalScore}/100
                </span>
              </div>
              <div className="w-full bg-nexus-surface-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getScoreBarColor(moduleScore.totalScore)}`}
                  style={{ width: `${moduleScore.totalScore}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-nexus-text-secondary">Complexity:</span>
                  <span className={`ml-1 ${getScoreColor(100 - moduleScore.complexityLevel)}`}>
                    {100 - moduleScore.complexityLevel}
                  </span>
                </div>
                <div>
                  <span className="text-nexus-text-secondary">Timeline:</span>
                  <span className={`ml-1 ${getScoreColor(100 - moduleScore.implementationTimeline)}`}>
                    {100 - moduleScore.implementationTimeline}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complexity Score */}
        {complexityScore && (
          <div className="bg-nexus-surface-900 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-nexus-text-primary mb-3">Complexity Score</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-nexus-text-secondary">Overall</span>
                <span className={`text-sm font-bold ${getScoreColor(complexityScore.totalScore)}`}>
                  {complexityScore.totalScore}/100
                </span>
              </div>
              <div className="w-full bg-nexus-surface-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getScoreBarColor(complexityScore.totalScore)}`}
                  style={{ width: `${complexityScore.totalScore}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-nexus-text-secondary">Technical:</span>
                  <span className={`ml-1 ${getScoreColor(100 - complexityScore.technicalComplexity)}`}>
                    {100 - complexityScore.technicalComplexity}
                  </span>
                </div>
                <div>
                  <span className="text-nexus-text-secondary">Regulatory:</span>
                  <span className={`ml-1 ${getScoreColor(100 - complexityScore.regulatoryCompliance)}`}>
                    {100 - complexityScore.regulatoryCompliance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="mt-6 bg-nexus-surface-900 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-nexus-text-primary mb-3">Key Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-nexus-accent-cyan">🎯</span>
              <span className="text-xs text-nexus-text-secondary">
                Focus: {params.region} - {params.industry.join(', ')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-nexus-accent-cyan">👥</span>
              <span className="text-xs text-nexus-text-secondary">
                Team: {params.aiPersona?.length || 0} AI analysts engaged
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-nexus-accent-cyan">📈</span>
              <span className="text-xs text-nexus-text-secondary">
                Tier: {params.userTier} access level
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-nexus-accent-cyan">⚡</span>
              <span className="text-xs text-nexus-text-secondary">
                Status: Real-time intelligence active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceDashboard;