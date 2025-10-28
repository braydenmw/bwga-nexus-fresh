import React from 'react';
import type { TPT_Simulation } from '../../types';

export const TPTResultDisplay: React.FC<{ sim: TPT_Simulation }> = ({ sim }) => (
    <div className="space-y-3">
        <p className="text-sm italic text-nexus-text-secondary">{sim.impactAnalysis}</p>
        {sim.predictedOutcomes.map(o => (
            <div key={o.metric} className="p-2 border-l-2 border-nexus-border-medium">
                <p className="font-semibold text-sm text-nexus-text-primary">{o.metric}</p>
                <p className="text-xs text-nexus-text-secondary">Predicted Change: <span className="font-bold text-lg text-nexus-accent-cyan">{o.startValue} &rarr; {o.endValue}</span></p>
            </div>
        ))}
    </div>
);