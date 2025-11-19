
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ReportParameters, UserProfile as UserProfileType, ReportSuggestions } from '../types.ts';
import { generateReportStream, startReportGeneration, checkReportStatus } from '../services/nexusService.ts';
import { REGIONS_AND_COUNTRIES, INDUSTRIES, AI_PERSONAS, ORGANIZATION_TYPES, ANALYTICAL_LENSES, TONES_AND_STYLES, TIERS_BY_ORG_TYPE, ANALYTICAL_MODULES } from '../constants.tsx';
import Spinner from './Spinner.tsx';
import { Inquire } from './Inquire.tsx';
import { CustomPersonaIcon, CustomIndustryIcon, ArrowUpIcon, NexusLogo } from './Icons.tsx';
import QualityAnalysis from './QualityAnalysis.tsx';
import { ProfileStep } from './ProfileStep.tsx';
import { TradeDisruptionDisplay, TradeDisruptionAnalyzer } from './TradeDisruptionModel.tsx';
import { MarketDiversificationDashboard } from './MarketDiversificationModule.tsx';
import Stepper from './Stepper';

interface ReportGeneratorProps {
    params: ReportParameters;
    onParamsChange: (params: ReportParameters) => void;
    onReportUpdate: (params: ReportParameters, content: string, error: string | null, generating: boolean) => void;
    onProfileUpdate: (profile: UserProfileType) => void;
    isGenerating: boolean; 
    onApplySuggestions: (suggestions: ReportSuggestions) => void;
    savedReports: ReportParameters[];
    onSaveReport: (params: ReportParameters) => void;
    onLoadReport: (params: ReportParameters) => void;
    onDeleteReport: (reportName: string) => void;
    onScopeComplete: () => void;
    wizardStep?: number;
    onNextStep?: () => void;
    onPrevStep?: () => void;
    canGoNext?: boolean;
    canGoPrev?: boolean;
}

const WIZARD_PAGES = [
    { id: 1, title: 'Scope & Context', steps: [1, 2, 3] },
    { id: 2, title: 'Analysis & Strategy', steps: [4, 5, 6] },
    { id: 3, title: 'Execution & Planning', steps: [7, 8, 9] },
    { id: 4, title: 'Finalization & Generation', steps: [10, 11, 12] }
];

const StepCard: React.FC<{ title: string; stepNumber: number; children: React.ReactNode }> = ({ title, stepNumber, children }) => (
    <div className="bg-nexus-surface-800 border border-nexus-border-medium rounded-xl shadow-lg">
        <header className="p-4 border-b border-nexus-border-medium flex items-center gap-4 bg-nexus-surface-900/50 rounded-t-xl">
            <div className="w-8 h-8 flex-shrink-0 bg-nexus-accent-cyan/10 text-nexus-accent-cyan rounded-full flex items-center justify-center font-bold text-sm">{stepNumber}</div>
            <h3 className="font-bold text-nexus-text-primary text-lg">{title}</h3>
        </header>
        <div className="p-6 space-y-6">
            {children}
        </div>
    </div>
);

const WIZARD_STEPS = [
    { id: 1, title: 'Profile Setup', page: 1 },
    { id: 2, title: 'Strategic Context', page: 1 },
    { id: 3, title: 'Partnership & Objectives', page: 1 },
    { id: 4, title: 'Analysis Configuration', page: 2 },
    { id: 5, title: 'Risk Assessment', page: 2 },
    { id: 6, title: 'SEAM Architecture', page: 2 },
    { id: 7, title: 'Technology Transfer', page: 3 },
    { id: 8, title: 'Implementation Roadmap', page: 3 },
    { id: 9, title: 'Resource Allocation', page: 3 },
    { id: 10, title: 'Performance Metrics', page: 4 },
    { id: 11, title: 'Sustainability & Final Setup', page: 4 },
    { id: 12, title: 'Review & Generate', page: 4 }
];

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
    params,
    onParamsChange,
    onReportUpdate,
    onProfileUpdate,
    isGenerating,
    ...restInquireProps
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [aiInteractionState, setAiInteractionState] = useState<'idle' | 'welcomed' | 'prompted' | 'answeredPrompt' | 'active'>('idle');

    const [targetRegion, setTargetRegion] = useState('');
    const [targetCountry, setTargetCountry] = useState('');
    const [targetCity, setTargetCity] = useState('');

    const handleStepClick = (stepNumber: number) => {
        const page = WIZARD_STEPS.find(s => s.id === stepNumber)?.page || 1;
        if (page < currentPage)
            setCurrentPage(page);
    };

    // DEBUG: Force default organization type if missing
    useEffect(() => {
        if (!params.organizationType || params.organizationType === '') {
            handleChange('organizationType', 'Default');
        }
    }, [params.organizationType]);

    const [showScroll, setShowScroll] = useState(false);
    const scrollPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const panel = scrollPanelRef.current;
        if (!panel) return;
        const handleScroll = () => setShowScroll(panel.scrollTop > 300);
        panel.addEventListener('scroll', handleScroll);
        return () => panel.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => scrollPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

    useEffect(() => {
        if (params.reportName.trim() && aiInteractionState !== 'active') {
            setAiInteractionState('active');
        }
    }, [params.reportName, aiInteractionState]);

    const handleChange = (field: keyof ReportParameters, value: any) => {
        onParamsChange({ ...params, [field]: value });
    };

    // Handle organization type changes - reset location fields when switching between government and non-government orgs
    useEffect(() => {
        const isGovernmentOrg = params.organizationType?.includes('Government') ||
                               params.organizationType === 'Investment Promotion Agency';

        if (isGovernmentOrg && params.userTier) {
            // For government orgs, we use userTier instead of region
            setTargetRegion('');
            setTargetCountry(params.userCountry || '');
            setTargetCity('');
        } else if (!isGovernmentOrg) {
            // For non-government orgs, handle region-based location
            const regionValue = params.region;
            if (regionValue) {
                const parts = regionValue.split(',').map(p => p.trim());
                const potentialCountry = parts[parts.length - 1];
                const foundRegionData = REGIONS_AND_COUNTRIES.find(r => r.countries.includes(potentialCountry));

                if (foundRegionData) {
                    setTargetRegion(foundRegionData.name);
                    setTargetCountry(potentialCountry);
                    setTargetCity(parts.slice(0, -1).join(', '));
                } else {
                    setTargetRegion('');
                    setTargetCountry('');
                    setTargetCity('');
                }
            } else {
                setTargetRegion('');
                setTargetCountry('');
                setTargetCity('');
            }
        }
    }, [params.region, params.organizationType, params.userTier, params.userCountry]);
    
    useEffect(() => {
        const combinedRegion = [targetCity, targetCountry].filter(Boolean).join(', ');
        if (combinedRegion !== params.region) {
            handleChange('region', combinedRegion);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetCity, targetCountry]);

    const handleMultiSelectToggle = (field: 'aiPersona' | 'analyticalLens' | 'toneAndStyle' | 'industry' | 'tier', value: string) => {
        const currentValues = params[field] as string[] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        
        if ((field === 'aiPersona' || field === 'industry') && newValues.length === 0 && (params[field] as string[]).length > 0) {
            return;
        }

        onParamsChange({ ...params, [field]: newValues });
    };
    
    const getValidationErrors = useCallback((page: number): string[] => {
        const errors: string[] = [];
        switch(page) {
            case 1:
                if (!params.userName.trim()) errors.push("Your Name is required.");
                if (!params.reportName.trim()) errors.push("Report Name is required.");
                if (!params.region.trim()) errors.push("A target location is required.");
                if (params.industry.length === 0) errors.push("At least one Core Industry must be selected.");
                if (params.industry.includes('Custom') && !params.customIndustry?.trim()) errors.push("Custom Industry Definition is required.");
                if (!params.idealPartnerProfile.trim()) errors.push("Ideal Partner Profile is required.");
                if (!params.problemStatement.trim()) errors.push("Core Objective is required.");
                break;
            case 2:
                if (params.tier.length === 0) errors.push("At least one Report Tier must be selected.");
                if (params.aiPersona.length === 0) errors.push("At least one AI Analyst persona must be selected.");
                if (params.aiPersona.includes('Custom') && !params.customAiPersona?.trim()) errors.push("Custom Persona Definition is required.");
                break;
            default: break;
        }
        return errors;
    }, [params]);

    const nextPage = () => {
        setError(null);
        scrollToTop();
        const validationErrors = getValidationErrors(currentPage);
        if (validationErrors.length === 0) {
            if (currentPage < WIZARD_PAGES.length) setCurrentPage(p => p + 1);
        } else {
            setError(validationErrors.join(' '));
        }
    };

    const prevPage = () => {
        setError(null);
        scrollToTop();
        if (currentPage > 1) setCurrentPage(p => p - 1);
    };

    const handleScopeComplete = () => {
        // This might need adjustment based on new flow
        setCurrentPage(1);
        scrollToTop();
    };

    const handleGenerateReport = useCallback(async () => {
        setError(null);
        const allErrors = [...getValidationErrors(1), ...getValidationErrors(2), ...getValidationErrors(3), ...getValidationErrors(4)];
        if (allErrors.length > 0) {
            setError("Please complete all required fields. Missing: " + allErrors.join(', '));
            return;
        }

        onProfileUpdate({ userName: params.userName, userDepartment: params.userDepartment, organizationType: params.organizationType, userCountry: params.userCountry, userTier: params.userTier });
        onReportUpdate(params, '', null, true);

        try {
            // Use new async job queue system
            const jobId = await startReportGeneration(params);

            // Poll for completion
            const pollForCompletion = async () => {
                try {
                    const status = await checkReportStatus(jobId);
                    if (status.status === 'complete') {
                        onReportUpdate(params, status.result || '', null, false);
                    } else if (status.status === 'failed') {
                        onReportUpdate(params, '', status.error || 'Report generation failed', false);
                    } else {
                        // Still processing, poll again in 2 seconds
                        setTimeout(pollForCompletion, 2000);
                    }
                } catch (pollError) {
                    console.error('Polling error:', pollError);
                    setTimeout(pollForCompletion, 2000);
                }
            };

            // Start polling
            setTimeout(pollForCompletion, 2000);

        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            setError(errorMessage);
            onReportUpdate(params, '', errorMessage, false);
        }
    }, [params, onReportUpdate, onProfileUpdate, getValidationErrors]);

    const inputStyles = "w-full p-3 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg focus:ring-2 focus:ring-nexus-accent-cyan focus:outline-none transition-all duration-200 placeholder:text-nexus-text-muted text-nexus-text-primary shadow-sm text-sm";
    const labelStyles = "block text-sm font-semibold text-nexus-text-primary mb-2";
    const currentTiers = TIERS_BY_ORG_TYPE[params.organizationType] || TIERS_BY_ORG_TYPE['Default'] || [];

    const renderPageContent = () => {
        const stepsForPage = WIZARD_STEPS.filter(s => s.page === currentPage);

        return (
            <div className="space-y-8">
                {stepsForPage.map(step => {
                    switch (step.id) {
                        case 1: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Set up your profile and define the high-level scope of your intelligence report.</p>
                                <ProfileStep params={params} handleChange={handleChange} inputStyles={inputStyles} labelStyles={labelStyles} />
                            </StepCard>
                        );
                        case 2: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Define your market opportunity and geographic focus.</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelStyles}>Target Region *</label>
                                        <select value={targetRegion} onChange={e => { setTargetRegion(e.target.value); setTargetCountry(''); setTargetCity(''); }} className={`${inputStyles} text-base`} aria-label="Target Region">
                                            <option value="">Select Global Region</option>
                                            {REGIONS_AND_COUNTRIES.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyles}>Target Country *</label>
                                        <select value={targetCountry} onChange={e => setTargetCountry(e.target.value)} disabled={!targetRegion} className={`${inputStyles} disabled:bg-nexus-surface-900 disabled:text-nexus-text-muted text-base`} aria-label="Target Country">
                                            <option value="">Select Country</option>
                                            {REGIONS_AND_COUNTRIES.find(r => r.name === targetRegion)?.countries.map(country => <option key={country} value={country}>{country}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelStyles}>Target City / Area</label>
                                        <input type="text" value={targetCity} onChange={e => setTargetCity(e.target.value)} className={`${inputStyles} text-base`} placeholder="e.g., Davao City, Metro Manila" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyles}>Analysis Timeframe</label>
                                        <select value={params.analysisTimeframe} onChange={e => handleChange('analysisTimeframe', e.target.value)} className={`${inputStyles} text-base`} aria-label="Analysis Timeframe">
                                            <option>Any Time</option><option>Last 6 Months</option><option>Last 12 Months</option><option>Last 2 Years</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className={`${labelStyles} text-base`}>Core Industry Focus *</label>
                                    <div className="bg-nexus-surface-900 p-4 rounded-xl border border-nexus-border-medium mt-2">
                                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                            {INDUSTRIES.map((industry) => (
                                                <button key={industry.id} onClick={() => handleMultiSelectToggle('industry', industry.id)} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-800 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.industry.includes(industry.id) ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`}>
                                                    <industry.icon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.industry.includes(industry.id) ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                                    <span className="font-semibold text-nexus-text-primary text-xs leading-tight">{industry.title}</span>
                                                </button>
                                            ))}
                                            <button onClick={() => handleMultiSelectToggle('industry', 'Custom')} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-800 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.industry.includes('Custom') ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`} title="Define a custom industry">
                                                <CustomIndustryIcon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.industry.includes('Custom') ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                                <span className="font-semibold text-nexus-text-primary text-xs leading-tight">Custom</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {params.industry.includes('Custom') && (
                                    <div className="mt-2">
                                        <label className={labelStyles}>Custom Industry Definition *</label>
                                        <textarea value={params.customIndustry} onChange={e => handleChange('customIndustry', e.target.value)} rows={2} className={inputStyles} placeholder="Describe the custom industry or niche sector..." />
                                    </div>
                                )}
                            </StepCard>
                        );
                        case 3: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Define your ideal partner and core strategic objectives.</p>
                                <div>
                                    <label className={`${labelStyles} text-base`}>Describe Your Ideal Partner *</label>
                                    <textarea value={params.idealPartnerProfile} onChange={e => handleChange('idealPartnerProfile', e.target.value)} rows={4} className={`${inputStyles} text-base resize-y`} placeholder="Describe your ideal strategic partner in detail..." />
                                    <p className="text-xs text-nexus-text-muted mt-2">Specificity enables precise matching algorithms.</p>
                                </div>
                                <div>
                                    <label className={`${labelStyles} text-base`}>Define Core Strategic Objective (The 'Why') *</label>
                                    <textarea value={params.problemStatement} onChange={e => handleChange('problemStatement', e.target.value)} rows={5} className={`${inputStyles} text-base resize-y`} placeholder="Articulate your strategic objective. What challenge are you addressing? What opportunity are you pursuing?" />
                                    <p className="text-xs text-nexus-text-muted mt-2">Clear objectives enable targeted, actionable intelligence.</p>
                                </div>
                            </StepCard>
                        );
                        case 4: return (
                            <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                <p className="text-sm text-nexus-text-secondary -mt-4 mb-4">Configure your analysis frameworks and AI intelligence settings.</p>
                                <div>
                                    <h4 className="text-base font-bold text-nexus-text-primary mb-2">Analysis Tiers (Methodology)</h4>
                                    <p className="text-nexus-text-secondary text-sm mb-4">Select one or more strategic frameworks for your report. The AI will synthesize the outputs into a single, cohesive intelligence blueprint.</p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {currentTiers.length > 0 ? currentTiers.map((tier) => (
                                            <label key={tier.id} className={`p-4 rounded-xl text-left border-2 transition-all duration-300 w-full flex flex-col h-full cursor-pointer bg-nexus-surface-900 hover:bg-nexus-surface-700 shadow-sm hover:shadow-lg ${params.tier.includes(tier.id) ? 'border-nexus-accent-cyan scale-105 shadow-xl ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-bold text-nexus-text-primary text-lg">{tier.title}</span>
                                                    <input type="checkbox" checked={params.tier.includes(tier.id)} onChange={() => handleMultiSelectToggle('tier', tier.id)} className="h-5 w-5 rounded border-nexus-border-strong bg-nexus-surface-700 text-nexus-accent-cyan focus:ring-nexus-accent-cyan focus:ring-2" />
                                                </div>
                                                <p className="text-sm text-nexus-text-secondary mb-4 flex-grow">{tier.desc}</p>
                                                <div className="border-t border-nexus-border-medium pt-3">
                                                    <p className="text-xs font-bold text-nexus-text-primary mb-2 uppercase tracking-wide">Capabilities</p>
                                                    <ul className="text-xs text-nexus-text-secondary space-y-1">
                                                        {tier.features.map(f => <li key={f} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-nexus-accent-cyan rounded-full"></span> {f}</li>)}
                                                    </ul>
                                                </div>
                                            </label>
                                        )) : (
                                            <div className="col-span-2 p-6 text-center bg-nexus-surface-900 border-2 border-dashed border-nexus-border-medium rounded-xl">
                                                <p className="text-nexus-text-secondary">No tiers available for the selected organization type.</p>
                                                <p className="text-xs text-nexus-text-muted mt-2">Please select a different organization type or contact support.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-nexus-border-medium">
                                    <label className={`${labelStyles} text-base`}>Configure Your AI Analyst Team *</label>
                                    <p className="text-nexus-text-secondary text-sm mt-2 mb-4">Select one or more AI personas. The AI will synthesize their expertise to provide a multi-faceted analysis.</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        {AI_PERSONAS.map((persona) => (
                                            <button key={persona.id} onClick={() => handleMultiSelectToggle('aiPersona', persona.id)} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-900 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.aiPersona.includes(persona.id) ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`} title={persona.description}>
                                                <persona.icon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.aiPersona.includes(persona.id) ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                                <span className="font-semibold text-nexus-text-primary text-xs leading-tight">{persona.title}</span>
                                            </button>
                                        ))}
                                        <button onClick={() => handleMultiSelectToggle('aiPersona', 'Custom')} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-nexus-surface-900 hover:bg-nexus-surface-700 shadow-sm hover:shadow-md ${params.aiPersona.includes('Custom') ? 'border-nexus-accent-cyan scale-105 shadow-lg ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-border-strong'}`} title="Define a custom persona">
                                            <CustomPersonaIcon className={`w-8 h-8 mb-2 transition-colors duration-200 ${params.aiPersona.includes('Custom') ? 'text-nexus-accent-cyan' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                            <span className="font-semibold text-nexus-text-primary text-xs leading-tight">Custom</span>
                                        </button>
                                    </div>
                                    {params.aiPersona.includes('Custom') && (
                                        <div className="mt-4">
                                            <label className={labelStyles}>Custom Persona Definition *</label>
                                            <textarea value={params.customAiPersona} onChange={e => handleChange('customAiPersona', e.target.value)} rows={3} className={inputStyles} placeholder="Describe the persona's expertise, focus, and tone..." />
                                        </div>
                                    )}
                                </div>
                            </StepCard>
                        );
                        // Placeholder for other steps
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                            return (
                                <StepCard key={step.id} title={step.title} stepNumber={step.id}>
                                    <div className="text-center py-8">
                                        <p className="text-nexus-text-secondary">Configuration for "{step.title}" will be available here.</p>
                                        <p className="text-xs text-nexus-text-muted mt-2">This is a placeholder for step {step.id}.</p>
                                    </div>
                                </StepCard>
                            );
                        default: return null;
                    }
                })}
            </div>
        );
    };

    const renderStepContent_OLD = () => {
        const step = 1; // Keep for switch logic, will be replaced
        switch (step) {
            case 1: // Profile & Scope - This case is now split into multiple cards
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <ProfileStep params={params} handleChange={handleChange} inputStyles={inputStyles} labelStyles={labelStyles} />
                    </div>
                );
            case 2: // Strategic Context - This case is now split into multiple cards
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                            <span className="text-2xl">🎯</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Strategic Context</h3>
                            <p className="text-gray-600 text-sm">Define your market opportunity and geographic focus.</p>
                          </div>
                        </div>

                        {/* AI-Powered Recommendations */}
                        <div className="mb-6 p-6 bg-nexus-accent-cyan/5 border border-nexus-accent-cyan/20 rounded-xl">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-nexus-accent-cyan/10 rounded-lg">
                              <NexusLogo className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-nexus-accent-cyan">🤖 Nexus AI Recommendations</h4>
                              <p className="text-sm text-nexus-text-secondary">AI-powered suggestions based on your profile</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="bg-white/50 p-4 rounded-lg border border-nexus-accent-cyan/30">
                              <h5 className="font-semibold text-nexus-text-primary mb-2">Recommended Analysis Tiers for {params.organizationType}</h5>
                              <div className="text-sm text-nexus-text-secondary mb-3">
                                Based on your {params.organizationType} profile, Nexus AI suggests these analysis frameworks:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {currentTiers.slice(0, 3).map((tier) => (
                                  <span key={tier.id} className="px-3 py-1 bg-nexus-accent-cyan/20 text-nexus-accent-cyan text-xs rounded-full border border-nexus-accent-cyan/30">
                                    ⭐ {tier.title}
                                  </span>
                                ))}
                              </div>
                              <p className="text-xs text-nexus-text-muted mt-2 italic">
                                💡 These are AI recommendations - you can select any combination that fits your needs
                              </p>
                            </div>

                            {params.region && (
                              <div className="bg-white/50 p-4 rounded-lg border border-nexus-accent-cyan/30">
                                <h5 className="font-semibold text-nexus-text-primary mb-2">Regional Intelligence Focus</h5>
                                <p className="text-sm text-nexus-text-secondary">
                                  For <strong>{params.region}</strong>, consider adding regional economic analysis and market entry strategies to your report.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={labelStyles}>Target Region *</label>
                                <select value={targetRegion} onChange={e => { setTargetRegion(e.target.value); setTargetCountry(''); setTargetCity(''); }} className={`${inputStyles} text-base`} aria-label="Target Region">
                                    <option value="">Select Global Region</option>
                                    {REGIONS_AND_COUNTRIES.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className={labelStyles}>Target Country *</label>
                                  <select value={targetCountry} onChange={e => setTargetCountry(e.target.value)} disabled={!targetRegion} className={`${inputStyles} disabled:bg-gray-100 disabled:text-gray-500 text-base`} aria-label="Target Country">
                                    <option value="">Select Country</option>
                                    {REGIONS_AND_COUNTRIES.find(r => r.name === targetRegion)?.countries.map(country => <option key={country} value={country}>{country}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                           <div className="space-y-2">
                                 <label className={labelStyles}>Target City / Area</label>
                                 <input type="text" value={targetCity} onChange={e => setTargetCity(e.target.value)} className={`${inputStyles} text-base`} placeholder="e.g., Davao City, Metro Manila" />
                             </div>
                             <div className="space-y-2">
                                 <label className={labelStyles}>Analysis Timeframe</label>
                                 <select value={params.analysisTimeframe} onChange={e => handleChange('analysisTimeframe', e.target.value)} className={`${inputStyles} text-base`} aria-label="Analysis Timeframe">
                                     <option>Any Time</option><option>Last 6 Months</option><option>Last 12 Months</option><option>Last 2 Years</option>
                                 </select>
                             </div>
                         </div>

                        <div className="mt-8">
                            <label className={`${labelStyles} text-base`}>Core Industry Focus *</label>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
                              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                  {INDUSTRIES.map((industry) => (
                                      <button key={industry.id} onClick={() => handleMultiSelectToggle('industry', industry.id)} className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${params.industry.includes(industry.id) ? 'border-gray-800 scale-105 shadow-lg ring-2 ring-gray-800/20' : 'border-gray-200 hover:border-gray-400'}`}>
                                          <industry.icon className={`w-10 h-10 mb-3 transition-colors duration-200 ${params.industry.includes(industry.id) ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                          <span className="font-semibold text-gray-800 text-xs leading-tight">{industry.title}</span>
                                      </button>
                                  ))}
                                  <button onClick={() => handleMultiSelectToggle('industry', 'Custom')} className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${params.industry.includes('Custom') ? 'border-gray-800 scale-105 shadow-lg ring-2 ring-gray-800/20' : 'border-gray-200 hover:border-gray-400'}`} title="Define a custom industry">
                                      <CustomIndustryIcon className={`w-10 h-10 mb-3 transition-colors duration-200 ${params.industry.includes('Custom') ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                      <span className="font-semibold text-gray-800 text-xs leading-tight">Custom</span>
                                  </button>
                              </div>
                            </div>
                        </div>
                        {params.industry.includes('Custom') && (
                            <div className="mt-4">
                                <label className={labelStyles}>Custom Industry Definition *</label>
                                <textarea value={params.customIndustry} onChange={e => handleChange('customIndustry', e.target.value)} rows={2} className={inputStyles} placeholder="Describe the custom industry or niche sector..." />
                            </div>
                        )}
                    </div>
                );
            case 3: // Partnership & Objectives - This case is now split into multiple cards
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                            <span className="text-2xl">🤝</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Partnership & Strategic Objectives</h3>
                            <p className="text-gray-600 text-sm">Define your ideal partner and core strategic objectives.</p>
                          </div>
                        </div>

                        <div className="mt-8">
                            <label className={`${labelStyles} text-base`}>Describe Your Ideal Partner *</label>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
                              <textarea value={params.idealPartnerProfile} onChange={e => handleChange('idealPartnerProfile', e.target.value)} rows={5} className={`${inputStyles} text-base resize-none`} placeholder="Describe your ideal strategic partner in detail..." />
                              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                                <span className="text-gray-800">💡</span>
                                Specificity enables precise matching algorithms.
                              </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <label className={`${labelStyles} text-base`}>Define Core Strategic Objective (The 'Why') *</label>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
                              <textarea value={params.problemStatement} onChange={e => handleChange('problemStatement', e.target.value)} rows={6} className={`${inputStyles} text-base resize-none`} placeholder="Articulate your strategic objective. What challenge are you addressing? What opportunity are you pursuing?" />
                              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                                <span className="text-gray-800">🎯</span>
                                Clear objectives enable targeted, actionable intelligence.
                              </p>
                            </div>
                        </div>
                    </div>
                );
            case 4: // Analysis Configuration - This case is now split into multiple cards
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                            <span className="text-2xl">⚙️</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Analysis Configuration</h3>
                            <p className="text-gray-600 text-sm">Configure your analysis frameworks and AI intelligence settings.</p>
                          </div>
                        </div>

                        <div>
                            <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200 mb-4">
                              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                                <span className="text-gray-500">📊</span>
                                Analysis Tiers (Methodology)
                              </h4>
                              <p className="text-gray-600 text-sm md:text-base">Select one or more strategic frameworks for your report. The AI will synthesize the outputs into a single, cohesive intelligence blueprint. Unsure which to choose? Ask the Nexus Inquire AI in the left panel for guidance.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                            {currentTiers.length > 0 ? currentTiers.map((tier) => (
                                      <label key={tier.id} className={`p-6 md:p-8 rounded-2xl text-left border-2 transition-all duration-300 w-full flex flex-col h-full cursor-pointer bg-white hover:bg-gray-50 shadow-md hover:shadow-lg ${params.tier.includes(tier.id) ? 'border-gray-800 scale-105 shadow-xl ring-2 ring-gray-800/20' : 'border-gray-200 hover:border-gray-400'}`}>
                                          <div className="flex justify-between items-start mb-4">
                                          <span className="font-bold text-gray-900 text-2xl">{tier.title}</span>
                                              <input
                                                  type="checkbox"
                                                  checked={params.tier.includes(tier.id)}
                                                  onChange={() => handleMultiSelectToggle('tier', tier.id)}
                                                  className="h-6 w-6 rounded border-gray-300 text-gray-800 focus:ring-gray-800 focus:ring-2"
                                              />
                                          </div>
                                          <p className="text-base text-gray-600 mb-6 flex-grow">{tier.desc}</p>
                                          <div className="border-t border-gray-200 pt-4">
                                              <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Capabilities</p>
                                              <ul className="text-sm text-gray-600 space-y-2">
                                                  {tier.features.map(f => <li key={f} className="flex items-center gap-3"><span className="w-2 h-2 bg-gray-800 rounded-full"></span> {f}</li>)}
                                              </ul>
                                          </div>
                                      </label>
                              )) : (
                                <div className="col-span-2 p-8 text-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
                                  <p className="text-gray-500">No tiers available for the selected organization type.</p>
                                  <p className="text-sm text-gray-400 mt-2">Please select a different organization type or contact support.</p>
                                </div>
                              )}
                              </div>
                         </div>

                         <div className="pt-6 border-t border-gray-200">
                             <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200 mb-4">
                               <label className={`${labelStyles} text-base`}>Configure Your AI Analyst Team *</label>
                               <p className="text-gray-600 text-sm md:text-base mt-2">Select one or more AI personas. The AI will synthesize their expertise to provide a multi-faceted analysis. This is a key driver of report quality.</p>
                             </div>
                             <div className="grid grid-cols-4 gap-4">
                                 {AI_PERSONAS.map((persona) => (
                                     <button key={persona.id} onClick={() => handleMultiSelectToggle('aiPersona', persona.id)} className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${params.aiPersona.includes(persona.id) ? 'border-gray-800 scale-105 shadow-lg ring-2 ring-gray-800/20' : 'border-gray-200 hover:border-gray-400'}`} title={persona.description}>
                                         <persona.icon className={`w-10 h-10 mb-3 transition-colors duration-200 ${params.aiPersona.includes(persona.id) ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                         <span className="font-semibold text-gray-800 text-xs leading-tight">{persona.title}</span>
                                     </button>
                                 ))}
                                 <button onClick={() => handleMultiSelectToggle('aiPersona', 'Custom')} className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${params.aiPersona.includes('Custom') ? 'border-gray-800 scale-105 shadow-lg ring-2 ring-gray-800/20' : 'border-gray-200 hover:border-gray-400'}`} title="Define a custom persona">
                                     <CustomPersonaIcon className={`w-10 h-10 mb-3 transition-colors duration-200 ${params.aiPersona.includes('Custom') ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                     <span className="font-semibold text-gray-800 text-xs leading-tight">Custom</span>
                                 </button>
                             </div>

                             {params.aiPersona.includes('Custom') && (
                                 <div className="mt-4">
                                     <label className={labelStyles}>Custom Persona Definition *</label>
                                     <textarea value={params.customAiPersona} onChange={e => handleChange('customAiPersona', e.target.value)} rows={3} className={inputStyles} placeholder="Describe the persona's expertise, focus, and tone..." />
                                 </div>
                             )}
                         </div>

                         <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
                             <div>
                                 <label className={`${labelStyles} text-base`}>Analytical Frameworks</label>
                                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-3 space-y-3">
                                     {ANALYTICAL_LENSES.map(lens => (
                                         <label key={lens} className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${params.analyticalLens?.includes(lens) ? 'border-gray-800 bg-gray-100 shadow-sm' : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50'}`}>
                                             <input type="checkbox" checked={params.analyticalLens?.includes(lens)} onChange={() => handleMultiSelectToggle('analyticalLens', lens)} className="h-5 w-5 rounded border-gray-300 text-gray-800 focus:ring-gray-800 focus:ring-2" />
                                             <span className="text-base font-medium text-gray-800">{lens}</span>
                                         </label>
                                     ))}
                                 </div>
                             </div>
                             <div>
                                 <label className={`${labelStyles} text-base`}>Communication Styles</label>
                                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-3 space-y-3">
                                     {TONES_AND_STYLES.map(style => (
                                         <label key={style} className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${params.toneAndStyle?.includes(style) ? 'border-gray-800 bg-gray-100 shadow-sm' : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50'}`}>
                                             <input type="checkbox" checked={params.toneAndStyle?.includes(style)} onChange={() => handleMultiSelectToggle('toneAndStyle', style)} className="h-5 w-5 rounded border-gray-300 text-gray-800 focus:ring-gray-800 focus:ring-2"/>
                                             <span className="text-base font-medium text-gray-800">{style}</span>
                                         </label>
                                     ))}
                                 </div>
                             </div>
                         </div>
                    </div>
                );
            case 12: // Review & Generate
                const isInvalid = (field: keyof ReportParameters, condition?: boolean) => {
                    const value = params[field];
                    if (condition === false) return false; // Explicitly false condition means don't validate
                    if (Array.isArray(value)) return value.length === 0;
                    if (typeof value === 'string') return !value.trim();
                    return false;
                };

                const summaryItemClasses = (invalid: boolean) => // Keep this function as it is
                    `p-3 rounded-lg transition-colors ${invalid ? 'bg-red-100 border border-red-200' : 'bg-gray-50'}`;

                const SummaryItem: React.FC<{label: string, value: React.ReactNode, invalid?: boolean}> = ({label, value, invalid = false}) => (
                    <div className={summaryItemClasses(invalid)}>
                        <div className="text-sm font-semibold text-gray-600">{label}</div>
                        <div className="text-gray-900 pl-2 mt-1">{value || <span className="text-red-600 italic">Not Provided</span>}</div>
                    </div>
                );

                return (
                      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                              <span className="text-2xl">🚀</span>
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Final Review & Generation</h3>
                              <p className="text-gray-600 text-sm">Review the quality assessment and generate your report.</p>
                            </div>
                          </div>

                        <QualityAnalysis params={params} />

                        {/* Nexus Brain Integration - Show available analysis */}
                        {currentPage === 4 && (
                          <div className="my-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                            <h4 className="text-lg font-semibold text-nexus-accent-cyan mb-4 flex items-center gap-2">
                              <span className="text-blue-600">🧠</span>
                              Nexus Brain Analysis Available
                            </h4>
                            <p className="text-sm text-gray-700 mb-4">
                              Before generating your final report, you can use the **Nexus Inquire AI** panel on the left to run advanced analysis on your defined region and objectives.
                              The Nexus Brain will provide RROI diagnosis, TPT simulations, and SEAM ecosystem design.
                            </p>
                            <div className="text-xs text-nexus-text-muted">
                              Note: This analysis will be automatically included in your final report generation.
                            </div>
                          </div>
                        )}

                        <div className="my-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Global Trade Intelligence</h4>
                            <div className="mb-8">
                                {(() => {
                                    const sampleTradeVolume = 2500000000;
                                    const sampleTariffRate = 15;
                                    const sampleMarkets = ['Vietnam', 'India', 'Mexico', 'Brazil', 'Indonesia'];
                                    const analysis = TradeDisruptionAnalyzer.calculateDisruptionImpact(sampleTradeVolume, sampleTariffRate, sampleMarkets, 35);
                                    return <TradeDisruptionDisplay analysis={analysis} />;
                                })()}
                            </div>
                            <div className="mb-8">
                                <MarketDiversificationDashboard
                                    currentMarkets={{ 'United States': 45, 'China': 25, 'European Union': 20, 'Japan': 10 }}
                                    potentialMarkets={['Vietnam', 'India', 'Mexico', 'Brazil', 'Indonesia', 'Turkey', 'South Africa', 'Thailand']}
                                    tradeDisruptionRisk={0.6}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-inner">
                            <div className="grid md:grid-cols-2 gap-6">
                              <SummaryItem label="Report Name" value={params.reportName} invalid={isInvalid('reportName')} />
                              <SummaryItem label="Operator" value={`${params.userName || 'N/A'} (${params.organizationType})`} invalid={isInvalid('userName')} />
                              <SummaryItem label="Analysis Tiers" value={<ul className="list-disc list-inside space-y-1">{params.tier.map(t => <li key={t} className="text-sm">{currentTiers.find(tier => tier.id === t)?.title || t}</li>)}</ul>} invalid={isInvalid('tier')} />
                              <SummaryItem label="Geographic Focus" value={`${params.region || 'N/A'}`} invalid={isInvalid('region')} />
                              <SummaryItem label="Industry Sectors" value={params.industry.filter(i=>i !== 'Custom').join(', ') || 'N/A'} invalid={isInvalid('industry')} />
                              <SummaryItem label="Custom Sector" value={params.customIndustry || 'Not specified'} invalid={isInvalid('customIndustry', params.industry.includes('Custom'))} />
                            </div>
                            <div className="border-t border-gray-200 pt-4 space-y-4">
                              <SummaryItem label="Strategic Objective" value={<div className="italic text-gray-800 bg-gray-100 p-3 rounded-lg border border-gray-200">"{params.problemStatement}"</div>} invalid={isInvalid('problemStatement')} />
                              <SummaryItem label="AI Personas" value={<ul className="list-disc list-inside space-y-1">{params.aiPersona.filter(p=>p !== 'Custom').map(p => <li key={p} className="text-sm">{p}</li>)}</ul>} invalid={isInvalid('aiPersona')} />
                              <SummaryItem label="Custom Profile" value={params.customAiPersona || 'Not configured'} invalid={isInvalid('customAiPersona', params.aiPersona.includes('Custom'))} />
                            </div>
                        </div>
                    </div>
                );
            case 5: // Risk Assessment
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shadow-md border border-red-200">
                            <span className="text-2xl">⚠️</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Risk Assessment</h3>
                            <p className="text-gray-600 text-sm">Evaluate potential risks and mitigation strategies.</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <p className="text-gray-700">Risk assessment framework will be implemented here. This step evaluates potential challenges and develops mitigation strategies for your regional intelligence initiative.</p>
                        </div>
                    </div>
                );
            case 6: // SEAM Architecture
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-md border border-blue-200">
                            <span className="text-2xl">🏗️</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">SEAM Architecture</h3>
                            <p className="text-gray-600 text-sm">Design your partner ecosystem and strategic alliances.</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <p className="text-gray-700">SEAM (Strategic Ecosystem Architecture Model) framework will be implemented here. This step designs the optimal partner network and strategic alliances for your initiative.</p>
                        </div>
                    </div>
                );
            case 7: // Technology Transfer
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shadow-md border border-green-200">
                            <span className="text-2xl">🔄</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Technology Transfer</h3>
                            <p className="text-gray-600 text-sm">Plan technology integration and knowledge transfer.</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <p className="text-gray-700">Technology transfer planning will be implemented here. This step addresses innovation integration, knowledge transfer, and technology adoption strategies.</p>
                        </div>
                    </div>
                );
            case 8: // Implementation Roadmap
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shadow-md border border-purple-200">
                            <span className="text-2xl">🗺️</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Implementation Roadmap</h3>
                            <p className="text-gray-600 text-sm">Develop detailed execution timeline and milestones.</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <p className="text-gray-700">Implementation roadmap development will be implemented here. This step creates detailed execution timelines, milestones, and project management frameworks.</p>
                        </div>
                    </div>
                );
            case 9: // Resource Allocation
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shadow-md border border-yellow-200">
                            <span className="text-2xl">💰</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Resource Allocation</h3>
                            <p className="text-gray-600 text-sm">Optimize resource distribution and budget planning.</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <p className="text-gray-700">Resource allocation optimization will be implemented here. This step develops budget planning, resource distribution strategies, and financial frameworks.</p>
                        </div>
                    </div>
                );
            case 10: // Performance Metrics
                return (
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shadow-md border border-indigo-200">
                            <span className="text-2xl">📊</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Performance Metrics</h3>
                            <p className="text-gray-600 text-sm">Establish success measurement and KPI frameworks.</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <p className="text-gray-700">Performance metrics and KPI frameworks will be implemented here. This step establishes success measurement systems and monitoring dashboards.</p>
                        </div>
                    </div>
                );
            case 11: // Sustainability & Final Setup
                return (
                      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shadow-md border border-green-200">
                              <span className="text-2xl">🌱</span>
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Sustainability Planning & Final Setup</h3>
                              <p className="text-gray-600 text-sm">Configure your report format and prepare for long-term monitoring.</p>
                            </div>
                          </div>

                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Intelligence Dashboard Setup</h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Your 12-step intelligence framework is complete. Configure your final report specifications and establish monitoring parameters for ongoing regional intelligence.
                            </p>
                        </div>

                        {/* Report Length & Output Format - Moved to final step */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                          <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                            <span className="text-gray-500">📊</span>
                            Report Length & Output Format
                          </h4>
                          <p className="text-gray-600 text-sm md:text-base mb-6">Choose the depth of analysis and output format that best fits your completed intelligence framework.</p>

                          <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                  <label className={`${labelStyles} text-base`}>Report Length *</label>
                                  <div className="bg-white p-4 rounded-xl border border-gray-200 mt-3 space-y-3">
                                      {[
                                          { id: 'snapshot', title: 'Snapshot Report', desc: '2-page executive summary with key recommendations', pages: '2 pages' },
                                          { id: 'brief', title: 'Brief Analysis', desc: '5-7 page analysis with core findings and recommendations', pages: '5-7 pages' },
                                          { id: 'standard', title: 'Standard Report', desc: '10-15 page comprehensive analysis with full methodology', pages: '10-15 pages' },
                                          { id: 'comprehensive', title: 'Comprehensive Analysis', desc: '20-30 page in-depth analysis with all modules and appendices', pages: '20-30 pages' }
                                      ].map((option) => (
                                          <label key={option.id} className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${params.reportLength === option.id ? 'border-gray-800 bg-gray-100 shadow-sm' : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50'}`}>
                                              <input type="radio" name="reportLength" value={option.id} checked={params.reportLength === option.id} onChange={(e) => handleChange('reportLength', e.target.value)} className="h-5 w-5 text-gray-800 focus:ring-gray-800 focus:ring-2" />
                                              <div className="flex-grow">
                                                  <div className="font-semibold text-gray-800">{option.title} <span className="text-sm text-gray-500">({option.pages})</span></div>
                                                  <div className="text-sm text-gray-600">{option.desc}</div>
                                              </div>
                                          </label>
                                      ))}
                                  </div>
                              </div>

                              <div>
                                  <label className={`${labelStyles} text-base`}>Output Format *</label>
                                  <div className="bg-white p-4 rounded-xl border border-gray-200 mt-3 space-y-3">
                                      {[
                                          { id: 'report', title: 'Report Only', desc: 'Comprehensive intelligence report' },
                                          { id: 'letter', title: 'Business Letter Only', desc: 'Professional outreach letter' },
                                          { id: 'both', title: 'Report + Letter', desc: 'Both report and business letter' }
                                      ].map((option) => (
                                          <label key={option.id} className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${params.outputFormat === option.id ? 'border-gray-800 bg-gray-100 shadow-sm' : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50'}`}>
                                              <input type="radio" name="outputFormat" value={option.id} checked={params.outputFormat === option.id} onChange={(e) => handleChange('outputFormat', e.target.value)} className="h-5 w-5 text-gray-800 focus:ring-gray-800 focus:ring-2" />
                                              <div className="flex-grow">
                                                  <div className="font-semibold text-gray-800">{option.title}</div>
                                                  <div className="text-sm text-gray-600">{option.desc}</div>
                                              </div>
                                          </label>
                                      ))}
                                  </div>
                              </div>
                          </div>
                        </div>

                        <QualityAnalysis params={params} />

                        {/* Nexus Brain Integration - Show available analysis */}
                        {currentPage === 4 && (
                          <div className="my-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                            <h4 className="text-lg font-semibold text-nexus-accent-cyan mb-4 flex items-center gap-2">
                              <span className="text-blue-600">🧠</span>
                              Nexus Brain Analysis Available
                            </h4>
                            <p className="text-sm text-gray-700 mb-4">
                              Your 12-step intelligence framework is complete. Use the **Nexus Inquire AI** panel on the left to run final advanced analysis before generating your comprehensive report.
                            </p>
                            <div className="text-xs text-nexus-text-muted">
                              Note: All analysis will be automatically included in your final intelligence report.
                            </div>
                          </div>
                        )}

                        <div className="space-y-4 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-inner">
                            <div className="grid md:grid-cols-2 gap-6">
                              <SummaryItem label="Report Name" value={params.reportName} invalid={isInvalid('reportName')} />
                              <SummaryItem label="Operator" value={`${params.userName || 'N/A'} (${params.organizationType})`} invalid={isInvalid('userName')} />
                              <SummaryItem label="Analysis Tiers" value={<ul className="list-disc list-inside space-y-1">{params.tier.map(t => <li key={t} className="text-sm">{currentTiers.find(tier => tier.id === t)?.title || t}</li>)}</ul>} invalid={isInvalid('tier')} />
                              <SummaryItem label="Geographic Focus" value={`${params.region || 'N/A'}`} invalid={isInvalid('region')} />
                              <SummaryItem label="Industry Sectors" value={params.industry.filter(i=>i !== 'Custom').join(', ') || 'N/A'} invalid={isInvalid('industry')} />
                              <SummaryItem label="Custom Sector" value={params.customIndustry || 'Not specified'} invalid={isInvalid('customIndustry', params.industry.includes('Custom'))} />
                            </div>
                            <div className="border-t border-gray-200 pt-4 space-y-4">
                              <SummaryItem label="Strategic Objective" value={<div className="italic text-gray-800 bg-gray-100 p-3 rounded-lg border border-gray-200">"{params.problemStatement}"</div>} invalid={isInvalid('problemStatement')} />
                              <SummaryItem label="AI Personas" value={<ul className="list-disc list-inside space-y-1">{params.aiPersona.filter(p=>p !== 'Custom').map(p => <li key={p} className="text-sm">{p}</li>)}</ul>} invalid={isInvalid('aiPersona')} />
                              <SummaryItem label="Custom Profile" value={params.customAiPersona || 'Not configured'} invalid={isInvalid('customAiPersona', params.aiPersona.includes('Custom'))} />
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    // Reset terms acceptance on page refresh
    useEffect(() => {
        localStorage.removeItem('bwga-nexus-terms-accepted');
    }, []);

    return (
        <div className="flex h-screen bg-nexus-primary-900 font-sans text-nexus-text-primary">
            <div className="w-96 flex-shrink-0 bg-nexus-surface-900 border-r border-nexus-border-medium shadow-lg">
                <Inquire // The left-hand AI co-pilot panel
                    {...restInquireProps}
                    params={params}
                    wizardStep={currentPage}
                    aiInteractionState={aiInteractionState}
                    onAiInteractionStateChange={setAiInteractionState}
                    onScopeComplete={handleScopeComplete}
                    onReportUpdate={onReportUpdate}
                    onProfileUpdate={onProfileUpdate}
                    isGenerating={isGenerating}
                    onNextStep={nextPage}
                    onPrevStep={prevPage}
                    canGoNext={currentPage < WIZARD_PAGES.length}
                    canGoPrev={currentPage > 1}
                />
            </div>
            <div ref={scrollPanelRef} className="flex-grow overflow-y-auto bg-nexus-primary-800">
                <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col min-h-full">
                    <header className="py-6 md:py-8 flex-shrink-0">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-nexus-text-primary tracking-tight mb-2 text-center">
                            Nexus Intelligence System
                        </h2>
                        <p className="text-base md:text-lg text-nexus-text-secondary max-w-2xl mx-auto text-center">
                            12-Step Regional Intelligence Framework - From strategic context to sustainability planning.
                        </p>
                        <div className="mt-8">
                            <Stepper steps={WIZARD_PAGES.map(p => p.title)} currentStep={currentPage} onStepClick={handleStepClick} />
                        </div>
                    </header>

                    <main className="flex-grow pb-16 relative">
                        {renderPageContent()}
                    </main>

                    {/* Footer with navigation buttons */}
                    <footer className="flex-shrink-0 py-4 border-t border-nexus-border-medium bg-nexus-surface-900/80 backdrop-blur-sm sticky bottom-0 z-10">
                        {error && <p className="text-red-400 text-center mb-4 text-sm bg-red-900/20 p-3 rounded-md border border-red-500/30">{error}</p>}

                        <div className="flex justify-between items-center max-w-5xl mx-auto px-4 md:px-6">
                            {currentPage > 1 ? (
                                <button onClick={prevPage} disabled={isGenerating} className="px-6 py-2.5 bg-nexus-surface-700 text-nexus-text-primary font-semibold rounded-lg hover:bg-nexus-surface-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Back</button>
                            ) : <div></div>}

                            {currentPage < WIZARD_PAGES.length ? (
                                <button
                                    onClick={nextPage}
                                    disabled={isGenerating}
                                    className="px-8 py-3 bg-nexus-accent-cyan text-white font-bold rounded-lg hover:bg-nexus-accent-cyan-dark transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next: {WIZARD_PAGES.find(p => p.id === currentPage + 1)?.title} &rarr;
                                </button>
                            ) : (
                                <button onClick={handleGenerateReport} disabled={isGenerating} className="px-8 py-3 bg-nexus-accent-cyan text-white font-bold rounded-lg hover:bg-nexus-accent-cyan-dark transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {isGenerating ? <><Spinner /> Generating...</> : '🚀 Generate Intelligence Blueprint'}
                                </button>
                            )}
                        </div>
                    </footer>
                </div>
            </div>

            {showScroll && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-8 bg-nexus-accent-cyan text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-nexus-accent-cyan-dark transition-all duration-300 z-50"
                    aria-label="Back to top"
                >
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default ReportGenerator;