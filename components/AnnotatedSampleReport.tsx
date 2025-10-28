import React from 'react';
import { NexusLogo } from './Icons.tsx';

const Annotation: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="relative pl-12">
        <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 font-bold text-lg bg-nexus-accent-brown/20 text-nexus-accent-brown border-2 border-nexus-accent-brown/50 rounded-full">{number}</div>
        <h4 className="font-bold text-nexus-accent-brown">{title}</h4>
        <p className="mt-1 text-sm text-nexus-text-secondary">{children}</p>
    </div>
);

export const AnnotatedSampleReport: React.FC = () => {
    return (
        <div id="annotated-report" className="bg-nexus-primary-900 p-4 md:p-8">
            {/* Disclaimer */}
            <div className="sample-notice border-2 border-dashed border-nexus-border-medium p-4 rounded-lg mb-8 bg-nexus-surface-800 text-center">
                <h3 className="text-lg font-bold text-nexus-text-primary">Sample Report Output (Tier: Regional Explorer)</h3>
                <p className="text-sm text-nexus-text-secondary mt-2">
                    <strong>Please Note:</strong> This is a condensed and illustrative example. The length, depth, and specific analytical modules of your actual report will vary based on your selected tiers and the complexity of your objective.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Letter Content */}
                <div className="lg:col-span-2 bg-nexus-surface-800 border border-nexus-border-medium rounded-xl shadow-lg p-8 sm:p-12 text-nexus-text-secondary">
                    <header className="flex justify-between items-start mb-8">
                        <div>
                            <p className="font-semibold text-nexus-text-primary">BW Nexus AI</p>
                            <p className="text-sm text-nexus-text-muted">Global Economic Empowerment OS</p>
                        </div>
                        <NexusLogo className="w-16 h-16 text-nexus-text-primary" />
                    </header>

                    <div className="mb-8">
                        <p className="text-sm">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <br />
                        <p className="text-sm">Jane Doe</p>
                        <p className="text-sm">Mindanao Development Authority</p>
                        <p className="text-sm">Philippines</p>
                    </div>

                    <main className="space-y-6">
                        <p className="text-base leading-relaxed"><strong>RE: Investment Intelligence Brief for AgriTech in Mindanao</strong><br/>This report provides a competitive landscape analysis of the AgriTech sector in Mindanao, Philippines. Our AI engine has analyzed the opportunity based on your strategic objectives, producing an overall investment score of <strong className="text-nexus-text-primary">78/100 (Tier 2 - High Growth Potential)</strong>. Mindanao exhibits exceptional agricultural resources and strong government support, positioning it as a prime candidate for AgriTech investment. Key challenges in infrastructure and supply chain logistics temper the score, but represent clear targets for development.</p>
                        
                        <p className="text-base leading-relaxed">Utilizing Location Quotient (LQ) and Shift-Share analyses, our findings indicate a strong specialization in high-value crops (LQ &gt; 1.5) but a lag in technology adoption. This points to significant opportunities in supply chain technology, precision farming, and aquaculture tech.</p>

                        <section>
                            <h2 className="text-xl font-bold text-nexus-text-primary mb-3">Competitive Landscape Analysis (Shift-Share)</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="border-b border-nexus-border-medium">
                                            <th className="p-2 font-semibold text-nexus-text-primary">Factor</th>
                                            <th className="p-2 font-semibold text-nexus-text-primary">Score (/10)</th>
                                            <th className="p-2 font-semibold text-nexus-text-primary">Weight</th>
                                            <th className="p-2 font-semibold text-nexus-text-primary">Analysis Summary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>National Growth Effect</td>
                                            <td>8</td>
                                            <td>0.30</td>
                                            <td>The Philippine national focus on agricultural modernization provides a strong tailwind for regional growth.</td>
                                        </tr>
                                        <tr>
                                            <td>Industry Mix Effect</td>
                                            <td>9</td>
                                            <td>0.30</td>
                                            <td>Mindanao's focus on high-demand crops (banana, pineapple, coconut) is a significant advantage.</td>
                                        </tr>
                                        <tr>
                                            <td>Regional Competitive Effect</td>
                                            <td>6</td>
                                            <td>0.40</td>
                                            <td>Logistical inefficiencies create competitive pressure from Vietnam and Thailand. This is the key area for intervention.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-nexus-text-primary mb-3">Recommended Partners</h2>
                            <p className="text-sm mb-2">Based on your ideal partner profile, our AI has identified the following vetted international companies:</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="border-b border-nexus-border-medium">
                                            <th className="p-2 font-semibold text-nexus-text-primary">Company</th>
                                            <th className="p-2 font-semibold text-nexus-text-primary">Origin</th>
                                            <th className="p-2 font-semibold text-nexus-text-primary">Match Strength</th>
                                            <th className="p-2 font-semibold text-nexus-text-primary">Rationale</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Netafim</td>
                                            <td>Israel</td>
                                            <td>92%</td>
                                            <td>Global leader in precision irrigation; directly addresses water management issues in Mindanao's plantations.</td>
                                        </tr>
                                        <tr>
                                            <td>Trimble Inc.</td>
                                            <td>United States</td>
                                            <td>88%</td>
                                            <td>Specializes in GPS and data analytics for agriculture; could overhaul crop monitoring and yield management.</td>
                                        </tr>
                                        <tr>
                                            <td>DeLaval</td>
                                            <td>Sweden</td>
                                            <td>85%</td>
                                            <td>A key player in dairy and livestock management technology; potential to revolutionize the regional dairy sector.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-nexus-text-primary mb-3">Strategic Recommendations</h2>
                            <ol className="list-decimal list-outside ml-6 space-y-2 text-base leading-relaxed">
                                <li><strong>Launch the "Agri-Corridor" Initiative:</strong> Prioritize investment in farm-to-port road and cold storage infrastructure to reduce post-harvest losses and close the logistics gap with regional competitors.</li>
                                <li><strong>Establish a Digital Farmer Program:</strong> Partner with a company like Trimble Inc. to launch a subsidized program for smallholders to adopt GPS and sensor technology, providing training and data support.</li>
                                <li><strong>Create a Special Economic Zone for AgriTech:</strong> Offer tax incentives and streamlined regulations for international AgriTech firms establishing R&D and manufacturing facilities in Mindanao.</li>
                            </ol>
                        </section>

                    </main>
                </div>
                {/* Annotations Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Annotation number="1" title="User-Defined Context">
                        The header section is populated directly from your inputs in <strong>Step 1 (Your Profile)</strong> and <strong>Step 3 (The Opportunity)</strong>. This establishes the formal origin and ensures the focus is precise from the outset.
                    </Annotation>
                    <Annotation number="2" title="AI-Calculated Score & Rationale">
                        The Nexus AI engine analyzes all gathered data against its internal models and your strategic objective, producing a single, weighted score for at-a-glance assessment. The AI then provides a qualitative summary of its findings, explaining the <strong>'why'</strong> behind the score.
                    </Annotation>
                    <Annotation number="3" title="Objective-Driven Summary">
                        The Executive Summary is not generic. The AI synthesizes the key findings and recommendations that are most relevant to the <strong>'Core Objective'</strong> you defined in <strong>Step 4</strong> of the generation process.
                    </Annotation>
                    <Annotation number="4" title="Core Analytical Methodologies">
                        This table is a direct output of a core Regional Science model like <strong>Shift-Share Analysis</strong>. The AI uses Google Search to find public data (e.g., employment statistics) and applies the framework to it, providing a rigorous, data-driven foundation for the insights.
                    </Annotation>
                    <Annotation number="5" title="Bespoke Partner Search">
                        For matchmaking-focused tiers, the AI uses your detailed <strong>'Ideal Partner Profile'</strong> from <strong>Step 3</strong> to search for and analyze suitable companies, creating a vetted shortlist with a clear rationale for each match.
                    </Annotation>
                    <Annotation number="6" title="Actionable Recommendations">
                        This is the final output of the symbiotic process. The AI proposes specific, actionable steps to address the findings. You, the user, can then use the <strong>Symbiosis Chat</strong> to refine, challenge, and expand on these ideas, transforming the report from a static document into a dynamic strategic tool.
                    </Annotation>
                </div>
            </div>
        </div>
    );
};