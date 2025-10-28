
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { fetchIntelligenceForCategory } from '../services/geminiService.ts';
import type { DashboardIntelligence, SymbiosisContext } from '../types.ts';
import Loader from './common/Loader.tsx';
import { DASHBOARD_CATEGORIES } from '../constants.tsx';
import { ExternalLinkIcon, SymbiosisIcon, AnalyzeIcon, NexusLogo } from './Icons.tsx';

interface DashboardProps {
    onAnalyze: (item: DashboardIntelligence['items'][0]) => void;
    onStartSymbiosis: (context: SymbiosisContext) => void;
}

const IntelligenceCard: React.FC<{ 
    item: DashboardIntelligence['items'][0]; 
    onAnalyze: DashboardProps['onAnalyze'];
    onStartSymbiosis: DashboardProps['onStartSymbiosis'];
}> = ({ item, onAnalyze, onStartSymbiosis }) => {
    
    const handleSymbiosisClick = (event: React.MouseEvent, topic: string, content: string) => {
        event.stopPropagation();
        onStartSymbiosis({
            topic: topic,
            originalContent: content,
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 leading-tight">{item.company}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={(e) => handleSymbiosisClick(e, `Strategic Implication for: ${item.company}`, item.implication)}
                        className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        title="Start Symbiosis Chat"
                    >
                        <SymbiosisIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">{item.details}</p>

            <div className="mt-auto space-y-4">
                <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Strategic Implication</p>
                        <button
                            onClick={(e) => handleSymbiosisClick(e, `Strategic Implication for: ${item.company}`, item.implication)}
                            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-all duration-200 opacity-70 hover:opacity-100"
                            title="Start Symbiosis Chat"
                        >
                            <SymbiosisIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{item.implication}</p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                     <span className="text-xs text-gray-500 font-medium">Source: {item.source}</span>
                     <div className="flex items-center gap-3">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-100 px-2 py-1 rounded-md">
                           Source <ExternalLinkIcon className="w-3 h-3 ml-1" />
                        </a>
                        <button onClick={() => onAnalyze(item)} className="inline-flex items-center text-xs font-semibold text-white bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-900 transition-all duration-200 transform hover:scale-105">
                           Analyze <AnalyzeIcon className="w-3 h-3 ml-1" />
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ onAnalyze, onStartSymbiosis }) => {
  const [intelligence, setIntelligence] = useState<DashboardIntelligence[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const hasFetched = useRef(false);

  const loadIntelligence = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIntelligence([]);
    setActiveCategory('All');
    let hasFetchError = false;

    const fetchPromises = DASHBOARD_CATEGORIES.map(category =>
      fetchIntelligenceForCategory(category)
        .then(data => {
          setIntelligence(prev => {
            const newIntelligence = [...prev, data];
            newIntelligence.sort((a, b) => DASHBOARD_CATEGORIES.indexOf(a.category) - DASHBOARD_CATEGORIES.indexOf(b.category));
            return newIntelligence;
          });
        })
        .catch(err => {
          console.error(`Failed to fetch category '${category}':`, err);
          hasFetchError = true;
        })
    );

    await Promise.all(fetchPromises);
    
    if (hasFetchError) {
      setError("Failed to load some intelligence categories. The feed may be incomplete.");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    loadIntelligence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uniqueCategories = useMemo(() => 
    ['All', ...DASHBOARD_CATEGORIES],
  []);

  const filteredIntelligence = useMemo(() => 
    intelligence.filter(categoryData => 
        activeCategory === 'All' || categoryData.category === activeCategory
    ),
  [intelligence, activeCategory]);

  if (isLoading && intelligence.length === 0) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <Loader message="Fetching Live Global Intelligence..." />
        </div>
    );
  }

  if (!isLoading && intelligence.length === 0) {
     return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex items-center justify-center">
            <div className="text-center text-red-800 p-8 bg-red-100 rounded-lg border border-red-200 max-w-lg shadow-md">
                <h3 className="text-xl font-bold">Intelligence Service Error</h3>
                <p className="mt-2 text-gray-700">Could not connect to the live global intelligence feed. The AI service may be temporarily unavailable or returned no data.</p>
                <p className="text-xs text-red-600 mt-2">({error || "No data received."})</p>
                <button onClick={loadIntelligence} className="mt-6 px-5 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-opacity">
                    Retry Connection
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
        <section className="relative bg-white py-20 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                    Live Intelligence Dashboard
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Real-time global intelligence feed with strategic implications. Transform market signals into actionable insights.
                </p>
            </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            <nav className="flex justify-center" aria-label="Intelligence Categories">
                <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-sm">
                    <div className="flex space-x-2 overflow-x-auto">
                        {uniqueCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300
                                ${activeCategory === cat ?
                                    'bg-gray-800 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {error && (
                <div className="bg-red-100 border border-red-200 rounded-xl p-4 text-center">
                    <p className="text-red-800 font-medium">{error}</p>
                </div>
            )}
            {filteredIntelligence.length > 0 ? (
                <div className="space-y-16">
                    {filteredIntelligence.map((categoryData) => (
                        <section key={categoryData.category}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-2xl text-white">📰</span>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{categoryData.category}</h3>
                                    <p className="text-gray-600 text-sm">Latest intelligence and strategic insights</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {categoryData.items.map((item, index) => (
                                    <IntelligenceCard
                                        key={`${item.url}-${index}`}
                                        item={item}
                                        onAnalyze={onAnalyze}
                                        onStartSymbiosis={onStartSymbiosis}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                    {isLoading && (
                        <div className="flex justify-center items-center p-8 mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 border-4 border-gray-300 border-dashed rounded-full animate-spin"></div>
                                <p className="text-gray-600 font-medium">Loading additional intelligence streams...</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center py-16">
                    <div className="text-center bg-white p-12 rounded-2xl shadow-md border border-gray-200 max-w-md">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Intelligence Found</h3>
                        <p className="text-gray-600 mb-6">No items match the current filter. Try reloading or selecting another category.</p>
                        <button onClick={loadIntelligence} className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-900 transition-all duration-200">
                            Refresh Feed
                        </button>
                    </div>
                </div>
            )}
        </main>

        <footer className="py-12 border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                <div className="flex justify-center mb-6">
                    <NexusLogo className="w-10 h-10 text-gray-400" />
                </div>
                <p className="font-semibold text-gray-600">BW Global Advisory</p>
                <p className="text-sm mb-4">ABN 55 978 113 300</p>
                <p className="text-xs">&copy; 2024 BW Global Advisory. All Rights Reserved.</p>
            </div>
        </footer>
    </div>
  );
};

export default Dashboard;