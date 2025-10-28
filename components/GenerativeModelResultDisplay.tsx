import React from 'react';
import type { GenerativeModel } from '../../types';

export const GenerativeModelResultDisplay: React.FC<{ model: GenerativeModel }> = ({ model }) => (
    <div className="space-y-3">
        <h4 className="font-bold text-md text-nexus-accent-brown">{model.modelName}</h4>
        <p className="text-sm italic text-nexus-text-secondary">{model.description}</p>
        {model.corePrinciples.map(p => (
            <div key={p.principle} className="p-2 border-l-2 border-nexus-border-medium"><p className="font-semibold text-sm text-nexus-text-primary">{p.principle}: <span className="font-normal text-xs text-nexus-text-secondary">{p.rationale}</span></p></div>
        ))}
    </div>
);