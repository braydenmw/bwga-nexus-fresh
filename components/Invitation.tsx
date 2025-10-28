
import React from 'react';
import Card from './common/Card.tsx';
import { PartnerIcon } from './Icons.tsx';

const StepIcon: React.FC<{ path: string }> = ({ path }) => (
    <div className="flex-shrink-0 w-16 h-16 bg-nexus-surface-700 border-2 border-nexus-accent-cyan/50 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-nexus-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
        </svg>
    </div>
);

const Step: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <Card className="text-center flex flex-col items-center p-6 border-nexus-border-medium hover:border-nexus-accent-cyan/50">
        <div className="flex-shrink-0 w-16 h-16 bg-nexus-surface-700 border-2 border-nexus-accent-cyan/50 rounded-full flex items-center justify-center mb-4">
            {icon}
        </div>
        <h4 className="text-lg font-bold text-nexus-text-primary mb-2">{title}</h4>
        <p className="text-sm text-nexus-text-secondary flex-grow">{children}</p>
    </Card>
);

const Invitation: React.FC = () => {
    return (
        <div className="p-4 md:p-8 overflow-y-auto h-full">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-nexus-text-primary tracking-tighter">The Path to Partnership</h2>
                    <p className="mt-4 text-lg text-nexus-text-secondary max-w-3xl mx-auto">
                        BW Nexus AI is a strategic matchmaking service. Follow this process to identify and analyze ideal foreign partners for your regional development goals.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Step icon={<StepIcon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />} title="1. Define Your Role">
                        Provide your details. This context frames the analysis from your unique strategic perspective.
                    </Step>
                    
                    <Step icon={<StepIcon path="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9.3l.06-.055a2 2 0 012.828 0l1.414 1.414a2 2 0 002.828 0l.06-.055M12 21.25V19.25" />} title="2. Detail the Opportunity">
                        Specify the target regional city and its core industry focus. This defines the "what" and "where" of the opportunity you are presenting.
                    </Step>

                    <Step icon={<PartnerIcon className="w-8 h-8 text-nexus-accent-cyan" />} title="3. Profile the Ideal Partner">
                        Describe your ideal foreign company: their size, key technologies, and target markets. The more precise you are, the better the match.
                    </Step>
                    
                    <Step icon={<StepIcon path="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 3l6-3m0 0l-6 3m6-3v10" />} title="4. Select Matchmaking Depth">
                        Choose a report tier. Each selection unlocks a deeper level of matchmaking, from a single match to a vetted shortlist with impact simulation.
                    </Step>
                    
                    <Step icon={<StepIcon path="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />} title="5. Define Strategic Intent">
                        Articulate your core objective. This critical input guides the AI's analysis of *why* this partnership is valuable and what it should achieve.
                    </Step>

                    <Step icon={<StepIcon path="M13 10V3L4 14h7v7l9-11h-7z" />} title="6. Activate the Nexus Engine">
                        With all parameters set, initiate the matchmaking process. The AI will find and analyze your ideal partners, building your bespoke report.
                    </Step>
                </div>

                <div className="mt-12">
                    <h3 className="text-3xl font-extrabold text-nexus-text-primary tracking-tighter text-center mb-6">Usage Models</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-nexus-accent-cyan/30">
                            <h4 className="text-xl font-bold text-nexus-accent-cyan mb-3">On-Demand Matchmaking</h4>
                            <p className="text-nexus-text-secondary mb-4">
                                Ideal for specific campaigns or initiatives. Select any matchmaking tier and generate a single, comprehensive report for a one-time fee.
                            </p>
                            <p className="text-nexus-text-primary font-semibold">
                                Perfect for targeted partnership development.
                            </p>
                        </Card>
                        <Card className="border-nexus-accent-gold/30">
                            <h4 className="text-xl font-bold text-nexus-accent-gold mb-3">Full Platform License</h4>
                            <p className="text-nexus-text-secondary mb-4">
                                Unlock the full potential of the Nexus matchmaking engine with unlimited access. Ideal for government departments, investment promotion agencies, and large enterprises.
                            </p>
                            <p className="text-nexus-text-primary font-semibold">
                                Contact us for a consultation.
                            </p>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Invitation;