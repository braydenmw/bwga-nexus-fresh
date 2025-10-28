import React, { useMemo } from 'react';
import type { ReportParameters } from '../types.ts';
import QualityGauge from './QualityGauge.tsx';

interface QualityAnalysisProps {
    params: ReportParameters;
}

const QualityAnalysis: React.FC<QualityAnalysisProps> = ({ params }) => {
    const { score, recommendations } = useMemo(() => {
        let currentScore = 100;
        const recs: string[] = [];

        if (params.problemStatement.length < 50) {
            currentScore -= 25;
            recs.push("Elaborate on your 'Core Objective' for a more focused analysis.");
        }
        if (params.idealPartnerProfile.length < 50) {
            currentScore -= 20;
            recs.push("Provide more detail in the 'Ideal Partner Profile' to improve matchmaking.");
        }
        if (params.aiPersona.length > 2) {
            currentScore -= 10;
            recs.push("Using 1-2 AI Personas yields a more focused report. More can dilute the analysis.");
        }
        if (params.industry.length === 0) {
            currentScore -= 15;
            recs.push("Select at least one 'Core Industry' to ground the analysis.");
        }
        if (recs.length === 0) {
            recs.push("Your configuration is strong. The AI has high confidence in the output.");
        }

        return { score: Math.max(0, currentScore), recommendations: recs };
    }, [params]);

    return (
        <div className="mb-6">
            <QualityGauge score={score} recommendations={recommendations} />
        </div>
    );
};

export default QualityAnalysis;