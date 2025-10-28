import React from 'react';
import type { SEAM_Blueprint } from '../../types';

export const SEAMResultDisplay: React.FC<{ seam: SEAM_Blueprint }> = ({ seam }) => (
     <div className="space-y-3">
        <p className="text-sm italic text-nexus-text-secondary">{seam.ecosystemSummary}</p>
        {seam.partners.map(p => (
            <div key={p.entity} className="p-2 border-l-2 border-nexus-border-medium">
                 <p className="font-semibold text-sm text-nexus-text-primary">{p.entity} <span className="text-xs font-bold uppercase text-nexus-accent-gold">({p.type})</span></p>
                 <p className="text-xs text-nexus-text-secondary mt-1">{p.rationale}</p>
            </div>
        ))}
    </div>
);