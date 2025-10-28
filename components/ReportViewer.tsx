
import React, { useMemo, useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import { marked } from 'marked';
import html2canvas from 'html2canvas';
import type { ReportParameters, SymbiosisContext } from '../types.ts';
import { DownloadIcon, LetterIcon, NexusLogo } from './Icons.tsx';
import Card from './common/Card.tsx';


interface ReportViewerProps {
  content: string;
  parameters: ReportParameters;
  isGenerating: boolean;
  onReset: () => void;
  onStartSymbiosis: (context: SymbiosisContext) => void;
  onGenerateLetter: () => void;
  error: string | null;
}

const NsilChart: React.FC<{ jsonString: string }> = ({ jsonString }) => {
  try {
    const chartData = JSON.parse(jsonString);
    if (chartData.type === 'bar' && Array.isArray(chartData.data)) {
      return (
        <Card className="my-6 bg-nexus-primary-800/50">
            <h4 className="text-lg font-semibold mb-4 text-center text-nexus-text-primary">{chartData.title || "Component Analysis"}</h4>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData.data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="name" stroke="var(--text-secondary)" />
                        <YAxis stroke="var(--text-secondary)" />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                        <Legend wrapperStyle={{color: 'var(--text-primary)'}}/>
                        <Bar dataKey="value" fill="var(--secondary-accent)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
      );
    }
    return <pre className="bg-red-900/50 p-2 rounded-md text-xs text-red-300">Invalid chart data format.</pre>;
  } catch (e) {
    return <pre className="bg-red-900/50 p-2 rounded-md text-xs text-red-300">Failed to parse chart JSON.</pre>;
  }
};

const ReportMetadata: React.FC<{ parameters: ReportParameters }> = ({ parameters }) => (
    <div className="blueprint-header mb-0 bg-gradient-to-r from-nexus-surface-800 to-nexus-surface-700 border-b-2 border-nexus-accent-cyan shadow-soft">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-xs font-semibold text-nexus-accent-cyan tracking-wider uppercase">INTELLIGENCE BLUEPRINT</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-nexus-text-primary mt-1 font-serif leading-tight">{parameters.reportName}</h1>
                    <p className="text-sm text-nexus-text-secondary mt-1 font-medium">{parameters.region} — {parameters.industry.join(' / ')}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold text-nexus-accent-brown tracking-wider uppercase">ANALYST PERSONA</p>
                    <span className="blueprint-persona-tag mt-1 bg-gradient-to-r from-nexus-accent-brown to-nexus-accent-brown-dark shadow-medium">{parameters.aiPersona.join(' + ')}</span>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-nexus-border-medium grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs font-mono bg-nexus-surface-900/50 rounded-lg p-3">
                <div><strong className="text-nexus-text-secondary block uppercase tracking-wide">OPERATOR:</strong> <span className="text-nexus-text-primary font-semibold">{parameters.userName}</span></div>
                <div><strong className="text-nexus-text-secondary block uppercase tracking-wide">DEPARTMENT:</strong> <span className="text-nexus-text-primary font-semibold">{parameters.userDepartment}</span></div>
                <div><strong className="text-nexus-text-secondary block uppercase tracking-wide">REPORT TIERS:</strong> <span className="text-nexus-text-primary font-semibold">{parameters.tier.join(', ')}</span></div>
                <div><strong className="text-nexus-text-secondary block uppercase tracking-wide">DATE:</strong> <span className="text-nexus-text-primary font-semibold">{new Date().toLocaleDateString()}</span></div>
            </div>
    </div>
);

const ReportDisclaimer: React.FC = () => (
    <div className="mb-6 p-4 bg-gradient-to-r from-nexus-surface-800 to-nexus-surface-700 border border-nexus-border-medium rounded-lg text-nexus-text-secondary text-xs shadow-soft">
        <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-4 h-4 bg-nexus-accent-brown rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-white">!</span>
            </div>
            <div>
                <p className="font-semibold text-nexus-text-primary mb-1">Important Disclaimer</p>
                <p>This report is generated by an AI-Human Intelligence Platform and is intended for guidance and decision-support only. Information is sourced from publicly available data and should be independently verified before making any strategic or financial commitments. BWGA makes no warranties as to its absolute completeness or accuracy.</p>
            </div>
        </div>
    </div>
);

const ReportFooter: React.FC = () => (
    <footer className="mt-8 pt-4 border-t-2 border-nexus-accent-cyan text-center text-xs text-nexus-text-secondary bg-gradient-to-r from-nexus-surface-800 to-nexus-surface-700 rounded-t-lg p-4 shadow-soft">
        <div className="flex items-center justify-center gap-2 mb-2">
            <NexusLogo className="w-6 h-6 text-nexus-accent-cyan" />
            <div>
                <p className="font-bold text-nexus-text-primary">Report Generated by BWGA Nexus 7.0</p>
                <p className="text-xs text-nexus-text-muted">AI-Human Intelligence Platform</p>
            </div>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Brayden Walls Global Advisory. All rights reserved.</p>
    </footer>
);

const ReportLoadingIndicator: React.FC = () => {
    const [message, setMessage] = useState("Initializing Nexus AI core...");
    const messages = [
        "Accessing global data streams...",
        "Synthesizing analyst perspectives...",
        "Applying analytical frameworks...",
        "Searching for real-world corporate partners...",
        "Structuring intelligence blueprint...",
        "Cross-referencing data sources for accuracy...",
        "Finalizing strategic recommendations...",
    ];

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2500);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center text-nexus-text-secondary p-8 my-8 bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 rounded-xl shadow-medium border border-nexus-border-medium">
            <div className="relative">
                <NexusLogo className="w-12 h-12 text-nexus-accent-cyan animate-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-nexus-accent-brown animate-ping opacity-20"></div>
            </div>
            <p className="mt-4 text-base font-bold text-nexus-text-primary">{message}</p>
            <p className="text-xs mt-1 max-w-sm">Please wait, this process can take a moment as the AI builds your comprehensive intelligence blueprint.</p>
            <div className="mt-4 flex space-x-1">
                <div className="w-1.5 h-1.5 bg-nexus-accent-cyan rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-nexus-accent-brown rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-1.5 h-1.5 bg-nexus-accent-cyan rounded-full animate-bounce animation-delay-400"></div>
            </div>
        </div>
    );
};


const ReportViewer: React.FC<ReportViewerProps> = ({ 
    content, 
    parameters,
    isGenerating, 
    onReset,
    onStartSymbiosis,
    onGenerateLetter,
    error,
}) => {
  const reportContainerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPdf = async () => {
    const reportElement = reportContainerRef.current?.querySelector('.blueprint-render-area');
    if (!reportElement || !reportContainerRef.current) return;

    setIsDownloading(true);
    try {
        const canvas = await html2canvas(reportElement as HTMLElement, {
            scale: 2,
            backgroundColor: null, // Use transparent background for better theme compatibility
            useCORS: true,
            windowWidth: 1100 // Force a wider canvas for better layout
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
        
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
        pdf.save(`Nexus-Report-${parameters.reportName.replace(/\s+/g, '-')}.pdf`);
    } catch (e) {
        console.error("Failed to generate PDF", e);
    } finally {
        setIsDownloading(false);
    }
  };


  const addSymbiosisHooks = () => {
    if (!reportContainerRef.current) return;

    const interactiveElements = reportContainerRef.current.querySelectorAll('.nsil-interactive');
    
    interactiveElements.forEach(el => {
      const element = el as HTMLElement;
      if (element.querySelector('.symbiosis-trigger')) return; // Avoid adding multiple triggers

      const title = element.dataset.symbiosisTitle || 'this topic';
      const content = element.dataset.symbiosisContent || element.innerText;

      const button = document.createElement('button');
      button.className = 'symbiosis-trigger absolute top-2 right-2 p-1 text-nexus-accent-brown hover:text-nexus-accent-cyan rounded-full hover:bg-nexus-surface-700 transition-all opacity-50 group-hover:opacity-100';
      button.title = 'Start Symbiosis Chat';
      button.innerHTML = `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L12 2C17.5228 2 22 6.47715 22 12V12"></path><path d="M22 12L22 12C22 17.5228 17.5228 22 12 22H12"></path><path d="M12 22L12 22C6.47715 22 2 17.5228 2 12V12"></path><path d="M2 12L2 12C2 6.47715 6.47715 2 12 2H12"></path><path d="M9 15L12 12L15 15"></path><path d="M12 12L12 9"></path></svg>`;

      button.onclick = (e) => {
        e.stopPropagation();
        onStartSymbiosis({
          topic: title,
          originalContent: content,
          reportParameters: parameters
        });
      };

      element.classList.add('relative', 'group');
      element.appendChild(button);
    });
  };

  useEffect(() => {
    // Run hooks only once when generation is finished to avoid performance issues
    if (!isGenerating && content) {
        addSymbiosisHooks();
    }
  }, [isGenerating, content, parameters, onStartSymbiosis]);
  
  const reportParts = useMemo(() => {
    if (!content) return [];
    
    const chartSplitRegex = /(<nsil:chart>[\s\S]*?<\/nsil:chart>)/g;
    let processedContent = content;

    // NSIL Tag Transformations to HTML
    // Add handlers for the missing matchmaking and structural tags
    processedContent = processedContent.replace(/<nsil:match_making_analysis>([\s\S]*?)<\/nsil:match_making_analysis>/g, '$1'); // This is a root tag, just render its content
    processedContent = processedContent.replace(/<nsil:match>([\s\S]*?)<\/nsil:match>/g, '<div class="nsil-match my-8 p-6 bg-nexus-surface-700/50 border border-nexus-border-medium rounded-xl">$1</div>');
    processedContent = processedContent.replace(/<nsil:company_profile name="(.*?)" headquarters="(.*?)" website="(.*?)">([\s\S]*?)<\/nsil:company_profile>/g, '<div class="nsil-company-profile mb-4"><h3>$1</h3><p class="text-sm text-nexus-text-secondary"><strong>HQ:</strong> $2 | <a href="$3" target="_blank" rel="noopener noreferrer" class="text-nexus-accent-cyan hover:underline">Website</a></p><div class="mt-2">$4</div></div>');
    processedContent = processedContent.replace(/<nsil:synergy_analysis>([\s\S]*?)<\/nsil:synergy_analysis>/g, '<div class="nsil-interactive nsil-synergy-analysis mt-4" data-symbiosis-title="Synergy Analysis" data-symbiosis-content="$1"><h4>Synergy Analysis</h4>$1</div>');
    processedContent = processedContent.replace(/<nsil:strategic_outlook>([\s\S]*?)<\/nsil:strategic_outlook>/g, '<div class="nsil-strategic-outlook mt-6 pt-4 border-t border-nexus-border-medium"><h3>Strategic Outlook</h3>$1</div>');    processedContent = processedContent.replace(/<nsil:executive_summary>([\s\S]*?)<\/nsil:executive_summary>/g, '<div class="nsil-interactive nsil-summary" data-symbiosis-title="Executive Summary" data-symbiosis-content="$1"><h3>Executive Summary</h3>$1</div>');
    processedContent = processedContent.replace(/<nsil:confidence_flag level="(\w+)" reason="(.*?)">([\s\S]*?)<\/nsil:confidence_flag>/g, (match, level, reason, text) => {
        return `<span class="nsil-confidence-flag relative group cursor-help border-b-2 border-dashed border-amber-500/50 text-amber-400">
                    ${text}
                    <span class="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-max max-w-xs bg-nexus-text-primary text-nexus-primary-900 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-nexus-border-medium shadow-lg z-10">
                        <strong class="text-amber-400">AI Confidence Note (${level}):</strong> ${reason}
                    </span>
                </span>`;
    });
    processedContent = processedContent.replace(/<nsil:match_score value="([\d.]*)">([\s\S]*?)<\/nsil:match_score>/g, '<div class="nsil-score my-6 text-center"><div class="text-6xl font-bold text-nexus-accent-brown">$1</div><p class="text-nexus-text-secondary mt-2">$2</p></div>');
    processedContent = processedContent.replace(/<nsil:risk_map>([\s\S]*?)<\/nsil:risk_map>/g, '<div class="nsil-riskmap my-6"><h3>Risk & Opportunity Map</h3><div class="grid md:grid-cols-3 gap-4 mt-2">$1</div></div>');
    processedContent = processedContent.replace(/<nsil:zone color="(\w+)" title="(.*?)">([\s\S]*?)<\/nsil:zone>/g, (match, color, title, text) => {
        const colorClasses = {
            green: 'border-green-500 bg-green-900/20',
            yellow: 'border-yellow-500 bg-yellow-900/20',
            red: 'border-red-500 bg-red-900/20'
        }[color] || 'border-gray-500';
        return `<div class="nsil-interactive nsil-zone border-t-4 ${colorClasses} p-4 rounded-b-lg bg-nexus-surface-800" data-symbiosis-title="Risk Zone: ${title}" data-symbiosis-content="${text}"><h5 class="font-bold text-nexus-text-primary">${title}</h5><p class="text-sm text-nexus-text-secondary mt-1">${text}</p></div>`
    });    processedContent = processedContent.replace(/<nsil:source_attribution>([\s\S]*?)<\/nsil:source_attribution>/g, '<div class="nsil-source mt-6 pt-4 border-t border-nexus-border-medium"><h3>Source Attribution</h3>$1</div>');

    const parts = processedContent.split(chartSplitRegex);

    return parts.map((part, index) => {
        if (part.startsWith('<nsil:chart>')) {
            const json = part.replace(/<\/?nsil:chart>/g, '');
            return { type: 'chart', content: json, key: `chart-${index}` };
        }
        
        if (!part.trim()) return null;
        
        const html = marked.parse(part) as string;
        return { type: 'html', content: html, key: `html-${index}` };
    }).filter(Boolean);
  }, [content]);

  return (
    <div>
        <header className="sticky top-4 z-10 p-2 bg-nexus-surface-800/80 backdrop-blur-xl border-b border-nexus-border-medium flex justify-between items-center flex-shrink-0">
            <div>
                <h2 className="text-lg font-bold text-nexus-text-primary truncate pr-4" title={parameters.reportName}>{parameters.reportName || "Strategic Blueprint"}</h2>
                <p className="text-xs text-nexus-text-secondary">{parameters.region} - {parameters.industry.join(' / ')}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={onGenerateLetter}
                    className="bg-nexus-accent-cyan text-white font-bold py-1 px-2 rounded-lg hover:bg-nexus-accent-cyan-dark transition-colors flex items-center gap-2 text-xs"
                >
                    <LetterIcon className="w-4 h-4" />
                    Outreach Letter
                </button>
                <button
                    onClick={onReset}
                    className="nexus-button-secondary text-xs py-1 px-2"
                >
                    New Report
                </button>
                <button
                    onClick={handleDownloadPdf}
                    disabled={isGenerating || isDownloading}
                    className="bg-nexus-accent-brown text-white font-bold py-1 px-2 rounded-lg hover:bg-nexus-accent-brown-dark transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 text-xs"
                >
                    <DownloadIcon className="w-4 h-4" />
                    {isDownloading ? 'Downloading...' : 'Download PDF'}
                </button>
            </div>
        </header>
      <div ref={reportContainerRef} role="document">
        <div className="max-w-3xl mx-auto p-4 md:p-6">
            <div className="report-document-container shadow-strong text-sm bg-gradient-to-br from-nexus-surface-900 to-nexus-surface-800 border border-nexus-border-medium rounded-xl overflow-hidden">
                <div className="blueprint-render-area bg-gradient-to-b from-nexus-surface-800 to-nexus-surface-700">
                    <ReportMetadata parameters={parameters} />
                    <div className="blueprint-content bg-gradient-to-b from-white/5 to-transparent">
                        {error && (
                            <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-500/30 text-red-300 shadow-soft">
                                <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                                    <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">!</span>
                                    Report Generation Error
                                </h3>
                                <p className="text-xs">{error}</p>
                            </div>
                        )}
                        <ReportDisclaimer />

                        {reportParts.map((part, index) => {
                            if (!part) return null;
                            if (part.type === 'chart') {
                                return <NsilChart key={part.key || `chart-${index}`} jsonString={part.content} />;
                            }
                            // It's an HTML part
                            return <div key={part.key || `html-${index}`} dangerouslySetInnerHTML={{ __html: part.content }} className="prose prose-invert max-w-none" />;
                        })}

                        {isGenerating && (
                            <ReportLoadingIndicator />
                        )}

                        {!isGenerating && content && <ReportFooter />}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;