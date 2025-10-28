import React, { useState, useEffect, useCallback } from 'react';
import { fetchLiveOpportunities, saveUserOpportunity, getUserOpportunities, fetchPredictiveAnalysis } from '../services/nexusService.ts';
import type { LiveOpportunityItem, SymbiosisContext, FeedPost, PredictiveAnalysis } from '../types.ts';
import { PlusCircleIcon, GeospatialIcon, ShieldCheckIcon, BookmarkIcon, BriefcaseIcon, NexusLogo, GlobeIcon } from './Icons.tsx';
import Loader from './common/Loader.tsx';
import { AddOpportunityModal } from './AddOpportunityModal.tsx';
import { RegionalSnapshot } from './RegionalSnapshot.tsx';
import { DataFeedItem } from './DataFeedItem.tsx';
import Card from './common/Card.tsx';

const PredictiveHorizonScan: React.FC<{ feed: FeedPost[] }> = ({ feed }) => {
    const [analysis, setAnalysis] = useState<PredictiveAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const opportunities = feed.filter(p => p.type === 'opportunity');
        if (opportunities.length < 3) { // Only run if there's enough data
            setIsLoading(false);
            return;
        }

        const runAnalysis = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await fetchPredictiveAnalysis(feed);
                setAnalysis(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load predictive analysis.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        
        const timer = setTimeout(runAnalysis, 1000); // Debounce to prevent rapid calls
        return () => clearTimeout(timer);

    }, [feed]);
    
    const hasContent = analysis && (analysis.emergingTrends.length > 0 || analysis.futureOpportunities.length > 0 || analysis.potentialDisruptions.length > 0);

    if (isLoading) {
        return (
            <Card className="nexus-card-glass p-6 mb-6 animate-fadeIn animation-delay-400 border-nexus-accent-cyan/30 bg-nexus-accent-cyan/5">
                <div className="flex items-center gap-3 mb-2">
                    <NexusLogo className="w-8 h-8 text-nexus-accent-cyan animate-pulse" />
                    <h3 className="font-semibold text-nexus-text-primary text-lg">Nexus Brain: Predictive Scan</h3>
                </div>
                <p className="text-sm text-nexus-text-secondary">Analyzing feed for future trends and opportunities...</p>
            </Card>
        );
    }
    
    if (error || !hasContent) {
        return null; // Don't render if there's an error or no content
    }

    const AnalysisSection: React.FC<{ title: string, items: { title: string, content: string }[] }> = ({ title, items }) => {
        if (items.length === 0) return null;
        return (
             <div>
                <h4 className="text-base font-semibold text-nexus-text-primary mb-2">{title}</h4>
                <ul className="space-y-2">
                    {items.map((item, i) => (
                        <li key={i} className="text-sm p-3 bg-white/60 border border-nexus-border-medium rounded-md shadow-sm">
                            <strong className="text-nexus-text-primary block">{item.title}</strong>
                            <p className="text-nexus-text-secondary mt-1">{item.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    };
    
    return (
        <Card className="nexus-card-glass p-6 mb-6 animate-fadeIn animation-delay-400 border-nexus-accent-cyan/50 bg-nexus-accent-cyan/5">
            <div className="flex items-center gap-3 mb-2">
                <NexusLogo className="w-8 h-8 text-nexus-accent-cyan" />
                <h3 className="font-semibold text-nexus-text-primary text-lg">Nexus Brain: Predictive Horizon Scan</h3>
            </div>
            <p className="text-sm text-nexus-text-secondary mb-4">AI-driven analysis of emerging trends based on the current data feed.</p>
            <div className="grid md:grid-cols-3 gap-6">
                <AnalysisSection title="Emerging Trends" items={analysis.emergingTrends.map(t => ({ title: t.trend, content: t.justification }))} />
                <AnalysisSection title="Future Opportunities" items={analysis.futureOpportunities.map(o => ({ title: o.opportunity, content: o.rationale }))} />
                <AnalysisSection title="Potential Disruptions" items={analysis.potentialDisruptions.map(d => ({ title: d.disruption, content: d.impact }))} />
            </div>
        </Card>
    );
};


const ConnectionGuide: React.FC = () => (
    <Card className="nexus-card-error mb-6 animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <div className="nexus-icon-circle-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Action Required: Connection Failure</h3>
      </div>
      
      <div className="space-y-4">
        <p className="text-red-200">
          The application is running in <strong>offline/fallback mode</strong> because it failed to connect to the live AI service.
        </p>
        <p className="text-red-200">
          This typically happens when the server-side component is unresponsive or not configured correctly. The most common cause is a missing API Key.
        </p>
        
        <div className="p-4 bg-nexus-primary-900/50 rounded-lg border border-nexus-border-medium">
          <h4 className="text-white mb-3 font-semibold">How to Fix This:</h4>
          <p className="text-amber-200 mb-4 text-sm">
            The application administrator must configure the backend service with a valid API Key by setting a server-side environment variable.
          </p>
          
          <div className="p-3 bg-nexus-primary-900 rounded text-sm font-mono text-nexus-text-secondary">
            <div><strong>Variable Name:</strong> <code className="text-white">API_KEY</code></div>
            <div className="mt-2"><strong>Variable Value:</strong> <code className="text-white">[Your Google Gemini API Key]</code></div>
            <div className="mt-2 text-xs text-nexus-text-secondary">
              <strong>Note:</strong> This is the Google Gemini API key that needs to be configured in your Vercel environment variables for the AI features to work properly.
            </div>
          </div>
        </div>
      </div>
    </Card>
);

const IntelligenceToolItem: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="nexus-icon-circle-accent">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-nexus-text-primary mb-1">{title}</h4>
            <p className="text-sm text-nexus-text-secondary">{children}</p>
        </div>
    </div>
);

const RotatingGlobalInsights: React.FC<{ feed: FeedPost[] }> = ({ feed }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const globalInsights = [
        {
            region: "Southeast Asia",
            title: "Manufacturing Corridor Boom",
            content: "Vietnam and Thailand emerging as cost-effective manufacturing hubs with skilled labor forces and improving infrastructure.",
            opportunities: ["Electronics assembly", "Automotive parts", "Textile production"]
        },
        {
            region: "East Africa",
            title: "Digital Transformation Wave",
            content: "Kenya and Rwanda leading fintech innovation with mobile payment systems and growing startup ecosystems.",
            opportunities: ["Fintech partnerships", "Mobile technology", "Digital services"]
        },
        {
            region: "Latin America",
            title: "Renewable Energy Frontier",
            content: "Chile and Brazil dominating clean energy development with vast solar and wind potential.",
            opportunities: ["Solar panel manufacturing", "Wind turbine components", "Energy storage systems"]
        },
        {
            region: "Central Europe",
            title: "Advanced Manufacturing Revival",
            content: "Poland and Czech Republic offering high-tech manufacturing with EU market access and skilled engineering talent.",
            opportunities: ["Automotive innovation", "Industrial automation", "Aerospace components"]
        },
        {
            region: "Middle East",
            title: "Infrastructure Mega-Projects",
            content: "UAE and Saudi Arabia driving massive infrastructure development with focus on smart cities and transportation.",
            opportunities: ["Construction technology", "Smart city solutions", "Transportation systems"]
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % globalInsights.length);
        }, 8000); // Rotate every 8 seconds

        return () => clearInterval(interval);
    }, []);

    const currentInsight = globalInsights[currentIndex];

    return (
        <Card className="nexus-card-glass p-6 mb-6 animate-fadeIn animation-delay-300 border-nexus-accent-gold/50 bg-nexus-accent-gold/5">
            <div className="flex items-center gap-3 mb-4">
                <GlobeIcon className="w-8 h-8 text-nexus-accent-gold animate-pulse" />
                <div>
                    <h3 className="font-semibold text-nexus-text-primary text-lg">Global Market Spotlight</h3>
                    <p className="text-sm text-nexus-text-secondary">Rotating insights on regional economic developments</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-nexus-accent-gold">{currentInsight.region}</h4>
                    <div className="flex gap-1">
                        {globalInsights.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                title={`View ${globalInsights[index].region} insights`}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    index === currentIndex ? 'bg-nexus-accent-gold' : 'bg-nexus-text-muted'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-white/10 p-4 rounded-lg">
                    <h5 className="font-semibold text-nexus-text-primary mb-2">{currentInsight.title}</h5>
                    <p className="text-sm text-nexus-text-secondary mb-3">{currentInsight.content}</p>
                    <div>
                        <p className="text-xs font-semibold text-nexus-accent-gold mb-2">Key Business Opportunities:</p>
                        <div className="flex flex-wrap gap-2">
                            {currentInsight.opportunities.map((opp, index) => (
                                <span key={index} className="px-2 py-1 bg-nexus-accent-gold/20 text-nexus-accent-gold text-xs rounded-full">
                                    {opp}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs text-nexus-text-muted">
                        Auto-rotating • Click dots to navigate • Discover new markets for your business
                    </p>
                </div>
            </div>
        </Card>
    );
};

interface LiveOpportunitiesProps {
    onAnalyze: (item: LiveOpportunityItem) => void;
    onStartSymbiosis: (context: SymbiosisContext) => void;
}

export const LiveOpportunities: React.FC<LiveOpportunitiesProps> = ({ onAnalyze, onStartSymbiosis }) => {
    const [feed, setFeed] = useState<FeedPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isConnectionError, setIsConnectionError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setIsConnectionError(false);

        const liveData = await fetchLiveOpportunities();
        
        if (liveData.isMockData) {
            setIsConnectionError(true);
            setError("Server is in fallback mode. Live data unavailable.");
        }
        
        const userAdded = getUserOpportunities();
        const combinedFeed = [
            ...userAdded.map(item => ({
                id: item.project_name + item.summary + Math.random().toString(),
                timestamp: new Date().toISOString(),
                type: 'opportunity',
                content: item,
            } as FeedPost)),
            ...(liveData.feed || []),
        ];
        
        const sortedFeed = combinedFeed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setFeed(sortedFeed);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleSaveNewOpportunity = (newItem: Omit<LiveOpportunityItem, 'isUserAdded' | 'ai_feasibility_score' | 'ai_risk_assessment'>) => {
        saveUserOpportunity(newItem);
        setIsModalOpen(false);
        loadData();
    };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="grid lg:grid-cols-5 gap-8 mb-8 items-center">
                    <div className="lg:col-span-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4 animate-fadeIn text-nexus-text-primary">
                            Global Data Hub
                        </h2>
                        <p className="text-lg text-nexus-text-secondary max-w-2xl animate-fadeIn animation-delay-200">
                            The Nexus clearinghouse for live development opportunities, news, and economic indicators. Our AI provides an initial feasibility and risk assessment on aggregated tenders and projects.
                        </p>
                    </div>
                    <Card className="nexus-card-glass p-4 lg:col-span-2 animate-fadeIn animation-delay-400">
                         <h3 className="font-semibold text-nexus-accent-brown mb-3">Sector Focus Snapshot</h3>
                         <RegionalSnapshot feed={feed} />
                    </Card>
                </header>
                
                <RotatingGlobalInsights feed={feed} />

                <PredictiveHorizonScan feed={feed} />

                <Card className="nexus-card-glass p-6 mb-6 animate-fadeIn animation-delay-600">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <IntelligenceToolItem icon={<BriefcaseIcon className="w-7 h-7" />} title="Identify Opportunities">
                            Scan live tenders and projects aggregated from global development banks and government sources.
                        </IntelligenceToolItem>
                        <IntelligenceToolItem icon={<ShieldCheckIcon className="w-7 h-7" />} title="Assess Risk & Feasibility">
                            Our AI provides a preliminary score and qualitative risk summary for each opportunity.
                        </IntelligenceToolItem>
                        <IntelligenceToolItem icon={<GeospatialIcon className="w-7 h-7" />} title="Contextualize with News">
                            Stay informed with a curated feed of relevant geopolitical and economic news impacting key regions.
                        </IntelligenceToolItem>
                        <IntelligenceToolItem icon={<BookmarkIcon className="w-7 h-7" />} title="Build Your Watchlist">
                            List your own private opportunities or projects to keep them organized and ready for deep-dive analysis.
                        </IntelligenceToolItem>
                    </div>
                </Card>

                <Card className="nexus-card-glass p-6 mb-6 animate-fadeIn animation-delay-700 border-nexus-accent-cyan/50 bg-nexus-accent-cyan/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="nexus-icon-circle-accent">
                            <GlobeIcon className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-nexus-text-primary text-lg">Market Discovery Tools</h3>
                            <p className="text-sm text-nexus-text-secondary">Find new business markets and regional opportunities</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                            <h4 className="font-semibold text-nexus-accent-cyan mb-2">🌍 Regional Market Scanner</h4>
                            <p className="text-sm text-nexus-text-secondary mb-3">Discover emerging markets with growth potential in your industry sector.</p>
                            <button className="w-full text-sm bg-nexus-accent-cyan/20 hover:bg-nexus-accent-cyan/30 text-nexus-accent-cyan py-2 px-3 rounded-md transition-colors">
                                Scan Markets
                            </button>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                            <h4 className="font-semibold text-nexus-accent-cyan mb-2">📈 Business Climate Index</h4>
                            <p className="text-sm text-nexus-text-secondary mb-3">Compare business-friendly regions with tax incentives and regulatory advantages.</p>
                            <div className="space-y-2">
                                <div className="text-xs text-nexus-text-secondary">
                                    <div className="flex justify-between items-center mb-1">
                                        <span>Singapore</span>
                                        <span className="text-green-400 font-semibold">95/100</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span>Netherlands</span>
                                        <span className="text-green-400 font-semibold">92/100</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>UAE</span>
                                        <span className="text-yellow-400 font-semibold">88/100</span>
                                    </div>
                                </div>
                                <button className="w-full text-sm bg-nexus-accent-cyan/20 hover:bg-nexus-accent-cyan/30 text-nexus-accent-cyan py-2 px-3 rounded-md transition-colors">
                                    View Full Rankings
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                            <h4 className="font-semibold text-nexus-accent-cyan mb-2">🔗 Partnership Finder</h4>
                            <p className="text-sm text-nexus-text-secondary mb-3">Connect with regional partners, distributors, and strategic alliances.</p>
                            <div className="space-y-2">
                                <div className="text-xs text-nexus-text-secondary">
                                    <div className="mb-2">
                                        <strong className="text-nexus-accent-cyan">Market Entry Guides:</strong>
                                    </div>
                                    <div className="space-y-1">
                                        <div>• Southeast Asia Manufacturing</div>
                                        <div>• East Africa Fintech</div>
                                        <div>• Latin America Renewable Energy</div>
                                    </div>
                                </div>
                                <button className="w-full text-sm bg-nexus-accent-cyan/20 hover:bg-nexus-accent-cyan/30 text-nexus-accent-cyan py-2 px-3 rounded-md transition-colors">
                                    Explore Partnerships
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                {isConnectionError && <ConnectionGuide />}

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-nexus-text-primary">Live Intelligence Feed</h3>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="nexus-button-primary flex items-center gap-2"
                    >
                        <PlusCircleIcon className="w-5 h-5"/>
                        List New Project
                    </button>
                </div>

                {isLoading ? (
                    <div className="min-h-[400px] flex items-center justify-center">
                        <Loader message="Connecting to Global Data Hub..." />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {feed.map((post, index) => (
                           <DataFeedItem 
                             key={post.id} 
                             post={post}
                             onAnalyze={onAnalyze}
                             onStartSymbiosis={onStartSymbiosis} 
                           />
                       ))}
                    </div>
                )}
                 
                 {!isLoading && feed.length === 0 && (
                    <div className="text-center py-16">
                        <div className="nexus-icon-circle-accent mx-auto mb-4">
                            <BriefcaseIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-nexus-text-primary mb-2">No opportunities found</h3>
                        <p className="text-nexus-text-secondary">
                            Start by adding your first opportunity or check back later for new data.
                        </p>
                    </div>
                )}
            </div>

            <AddOpportunityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNewOpportunity}
            />

            {/* Lower Header/Footer with ABN and Copyright */}
            <footer className="mt-16 py-8 border-t border-nexus-border-medium bg-nexus-primary-800/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <div className="space-y-2">
                        <p className="text-sm text-nexus-text-secondary">
                            BW Global Advisory operates under Australian Business Number <strong className="text-nexus-text-primary">ABN 55 978 113 300</strong>
                        </p>
                        <p className="text-xs text-nexus-text-muted">
                            © 2024 BW Global Advisory. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};