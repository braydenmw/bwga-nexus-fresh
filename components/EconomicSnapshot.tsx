import React, { useState, useEffect } from 'react';
import { fetchEconomicDataForCountry } from '../services/nexusService.ts';
import type { EconomicData } from '../types.ts';
import Spinner from './Spinner.tsx';

interface EconomicSnapshotProps {
    country: string;
    objective?: string;
    isRefining: boolean;
    onRefineObjective: (data: any) => void;
}

interface SmartEconomicData {
    country: string;
    objective: string;
    indicators: Array<{
        name: string;
        value: { value: any; year: string } | string;
        relevance: string;
        priority: string;
    }>;
    regionalContext: any;
    analysisDate: string;
}

const formatValue = (data: { value: number; year: string } | undefined, type: 'currency' | 'number' | 'percent') => {
    if (!data || data.value === null) return { value: 'N/A', year: '' };
    
    let formattedValue: string;
    const value = data.value;

    if (type === 'currency') {
        if (value >= 1_000_000_000_000) {
            formattedValue = `$${(value / 1_000_000_000_000).toFixed(2)}T`;
        } else if (value >= 1_000_000_000) {
            formattedValue = `$${(value / 1_000_000_000).toFixed(2)}B`;
        } else if (value >= 1_000_000) {
            formattedValue = `$${(value / 1_000_000).toFixed(2)}M`;
        } else {
            formattedValue = `$${value.toLocaleString()}`;
        }
    } else if (type === 'number') {
        if (value >= 1_000_000_000) {
             formattedValue = `${(value / 1_000_000_000).toFixed(2)}B`;
        } else if (value >= 1_000_000) {
            formattedValue = `${(value / 1_000_000).toFixed(2)}M`;
        } else {
            formattedValue = value.toLocaleString();
        }
    } else { // percent
        formattedValue = `${value.toFixed(2)}%`;
    }
    
    return { value: formattedValue, year: `(${data.year})` };
};

const DataPoint: React.FC<{ label: string; data: { value: number; year: string } | undefined; type: 'currency' | 'number' | 'percent' }> = ({ label, data, type }) => {
    const { value, year } = formatValue(data, type);
    return (
        <div className="flex justify-between items-baseline text-sm">
            <span className="text-nexus-text-secondary">{label}</span>
            <div className="text-right">
                <span className="font-semibold text-nexus-text-primary">{value}</span>
                <span className="ml-1 text-xs text-nexus-text-muted">{year}</span>
            </div>
        </div>
    );
};

const SmartDataPoint: React.FC<{ indicator: any }> = ({ indicator }) => {
    const data = typeof indicator.value === 'object' && indicator.value.value !== undefined ?
        indicator.value : { value: indicator.value, year: 'N/A' };

    let type: 'currency' | 'number' | 'percent' = 'number';
    if (indicator.name.toLowerCase().includes('gdp') || indicator.name.toLowerCase().includes('fdi') || indicator.name.toLowerCase().includes('export')) {
        type = 'currency';
    } else if (indicator.name.toLowerCase().includes('inflation') || indicator.name.toLowerCase().includes('growth')) {
        type = 'percent';
    }

    const { value, year } = formatValue(data, type);

    return (
        <div className="border border-gray-200 rounded-md p-3 mb-2">
            <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium text-nexus-text-primary">{indicator.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                    indicator.priority === 'high' ? 'bg-red-100 text-red-800' :
                    indicator.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {indicator.priority}
                </span>
            </div>
            <div className="flex justify-between items-baseline text-sm mb-2">
                <span className="text-nexus-text-secondary">Value</span>
                <div className="text-right">
                    <span className="font-semibold text-nexus-text-primary">{value}</span>
                    <span className="ml-1 text-xs text-nexus-text-muted">{year}</span>
                </div>
            </div>
            <p className="text-xs text-nexus-text-secondary italic">{indicator.relevance}</p>
        </div>
    );
};


export const EconomicSnapshot: React.FC<EconomicSnapshotProps> = ({ country, objective, isRefining, onRefineObjective }) => {
    const [data, setData] = useState<SmartEconomicData | EconomicData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSmartData, setIsSmartData] = useState(false);

    useEffect(() => {
        if (!country) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            setData(null);
            try {
                // Try to fetch smart economic data first (with objective context)
                const smartResponse = await fetch(`/api/economic-data?country=${encodeURIComponent(country)}${objective ? `&objective=${encodeURIComponent(objective)}` : ''}`);
                if (smartResponse.ok) {
                    const smartData = await smartResponse.json();
                    setData(smartData);
                    setIsSmartData(true);
                } else {
                    // Fallback to old format
                    const result = await fetchEconomicDataForCountry(country);
                    setData(result);
                    setIsSmartData(false);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [country, objective]);

    if (!country) return null;

    return (
        <div className="p-3 bg-gray-50 rounded-lg border border-nexus-border-subtle">
            <h3 className="font-semibold text-nexus-text-primary text-md mb-1">
                Economic Snapshot: <span className="text-nexus-accent-cyan">{country}</span>
            </h3>
             <p className="text-xs text-nexus-text-secondary mb-3">Live economic indicators to provide real-world context for your report. Data reflects 2025 projections and current market conditions relevant to your analysis.</p>
            {isLoading && (
                <div className="flex items-center justify-center py-4">
                    <Spinner />
                </div>
            )}
            {error && <p className="text-xs text-red-500 bg-red-100 p-2 rounded-md">Could not load economic data.</p>}
            {!isLoading && !error && data && (
                <div className="space-y-2">
                    {isSmartData && (data as SmartEconomicData).indicators ? (
                        <>
                            <p className="text-xs text-nexus-text-secondary mb-3">
                                Analysis for: <span className="font-medium text-nexus-accent-cyan">{(data as SmartEconomicData).objective}</span>
                            </p>
                            {(data as SmartEconomicData).indicators.map((indicator, index) => (
                                <SmartDataPoint key={index} indicator={indicator} />
                            ))}
                        </>
                    ) : (
                        <>
                            <DataPoint label="GDP (current USD)" data={(data as EconomicData).gdp} type="currency" />
                            <DataPoint label="Population" data={(data as EconomicData).population} type="number" />
                            <DataPoint label="Inflation (annual %)" data={(data as EconomicData).inflation} type="percent" />
                            <DataPoint label="FDI, net inflows (USD)" data={(data as EconomicData).fdi} type="currency" />
                        </>
                    )}
                    <button
                        onClick={() => onRefineObjective(data)}
                        disabled={isRefining}
                        className="!mt-4 w-full text-xs font-semibold p-2 rounded-md bg-nexus-accent-cyan/10 text-nexus-accent-cyan hover:bg-nexus-accent-cyan/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRefining ? 'Refining...' : 'Refine Objective with this Data'}
                    </button>
                </div>
            )}
        </div>
    );
};