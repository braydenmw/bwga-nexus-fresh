
import React, { useState } from 'react';
import type { ReportParameters } from '../types.ts';
import { SaveIcon, LoadIcon, TrashIcon } from './Icons.tsx';

interface SavedWorkManagerProps {
    currentParams: ReportParameters;
    savedReports: ReportParameters[];
    onSave: (params: ReportParameters) => void;
    onLoad: (params: ReportParameters) => void;
    onDelete: (reportName: string) => void;
}

export const SavedWorkManager: React.FC<SavedWorkManagerProps> = ({
    currentParams,
    savedReports,
    onSave,
    onLoad,
    onDelete
}) => {
    const [showConfirm, setShowConfirm] = useState<string | null>(null);

    const handleSave = () => {
        onSave(currentParams);
    };

    const handleDelete = (reportName: string) => {
        onDelete(reportName);
        setShowConfirm(null);
    };

    const isSaveDisabled = !currentParams.reportName.trim();

    return (
        <div className="p-3 bg-gray-50 rounded-lg border border-nexus-border-subtle mt-6">
            <h3 className="font-semibold text-nexus-text-primary text-md mb-3">Saved Blueprints</h3>
            
            <button
                onClick={handleSave}
                disabled={isSaveDisabled}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold p-2 rounded-lg bg-nexus-accent-cyan text-white hover:bg-nexus-accent-cyan-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <SaveIcon className="w-5 h-5" />
                Save Current Blueprint
            </button>
            {isSaveDisabled && <p className="text-xs text-nexus-text-muted text-center mt-1">A Report Name is required to save.</p>}

            <div className="mt-4 pt-3 border-t border-nexus-border-medium">
                {savedReports.length === 0 ? (
                    <p className="text-xs text-nexus-text-secondary text-center">No blueprints saved yet.</p>
                ) : (
                    <ul className="space-y-2 max-h-48 overflow-y-auto">
                        {savedReports.map((report) => (
                            <li key={report.reportName} className="p-2 bg-white rounded-md flex justify-between items-center group border border-nexus-border-medium">
                                <div className="truncate pr-2">
                                    <p className="text-sm font-medium text-nexus-text-primary truncate" title={report.reportName}>{report.reportName}</p>
                                    <p className="text-xs text-nexus-text-muted truncate">{report.region || 'No Region'} &bull; {report.industry.join(', ')}</p>
                                </div>
                                {showConfirm === report.reportName ? (
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button onClick={() => handleDelete(report.reportName)} className="text-xs font-bold text-red-500 hover:text-red-700">Confirm</button>
                                        <button onClick={() => setShowConfirm(null)} className="text-xs text-nexus-text-secondary hover:text-nexus-text-primary">Cancel</button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        {/* Removed Load Blueprint button */}
                                        {/* Removed Report Sample button */}
                                        <button onClick={() => setShowConfirm(report.reportName)} title="Delete Blueprint" className="p-1 text-nexus-text-secondary hover:text-red-500 transition-colors"><TrashIcon className="w-5 h-5" /></button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};