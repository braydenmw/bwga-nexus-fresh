import React from 'react';
import type { RROI_Index } from '../../types';

export const RROIResultDisplay: React.FC<{ rroi: RROI_Index }> = ({ rroi }) => (
    <div className="space-y-3">
        <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm font-semibold text-nexus-text-secondary">Overall Score</p>
            <p className="text-4xl font-bold text-nexus-accent-cyan">{rroi.overallScore}</p>
        </div>
        <p className="text-sm italic text-nexus-text-secondary">{rroi.summary}</p>
        {Object.values(rroi.components).map((c) => (
            <div key={c.name} className="p-2 border-l-2 border-nexus-border-medium">
                <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-sm text-nexus-text-primary">{c.name}</p>
                    <p className="font-bold text-sm text-nexus-accent-cyan">{c.score}/100</p>
                </div>
                <p className="text-xs text-nexus-text-secondary mt-1">{c.analysis}</p>
            </div>
        ))}
    </div>
);