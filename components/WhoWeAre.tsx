import React from 'react';
import { BlueprintIcon, NexusLogo } from './Icons.tsx';

interface WhoWeAreProps {
    onViewChange: (view: string) => void;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onViewChange }) => {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans antialiased">
            {/* Hero Section */}
            <section className="relative py-28 md:py-40">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Asian country village"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Your Region's Value, Understood Globally.
                    </h1>
                    <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        For decades, regional economies have been the unsung engines of national prosperity, yet their true value remains invisible to the global market. BW Nexus AI is the world's first Strategic Symbiosis System designed to translate your region's potential into a language that builds confidence, attracts investment, and forges the partnerships you deserve.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

                {/* Section: The Problem & The Founder */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="space-y-12">
                        <div className="text-center max-w-5xl mx-auto">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">The Search for New Frontiers: A Crisis of Clarity</h2>
                            <p className="mt-4 text-lg text-gray-600">A great economic realignment is underway. Countless reports from governments, universities, and global firms confirm that leaders are actively looking beyond traditional markets to secure supply chains and find new growth. The irony is that the opportunities they seek are often right in their own backyard—in the regional economies that have been misunderstood or underestimated for decades.</p>
                        </div>
                        <div className="max-w-5xl mx-auto">
                            <p className="text-lg text-gray-600">The challenge is a crisis of clarity. Decision-makers are paralyzed by a fog of second-hand information, outdated perceptions, and prohibitive research costs. Regional leaders, in turn, often lack the confidence or the specific tools to translate their deep local knowledge into the language of global strategy. This creates a communication impasse where immense potential remains locked away.</p>
                            <div className="mt-6 p-4 bg-gray-100 border-l-4 border-gray-800 rounded-r-lg">
                                <p className="text-lg text-gray-600 italic">This system was developed to solve this. It takes just a few words—an idea, a goal—and transforms them into a structured, data-driven analysis. It provides the clarity and confidence needed to break the ice, enabling leaders on both sides to finally see the true worth a place and its people hold.</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center pt-12 border-t border-gray-200">
                            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A person working on a laptop with data visualizations, representing the intersection of technology and human insight." className="rounded-xl shadow-lg object-cover w-full h-full max-h-96" />
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4">A Message from the Founder</h3>
                                <blockquote className="text-lg italic font-medium text-gray-700 leading-relaxed">
                                    "I built this system after years of working directly with local leaders who had the will, the people, and the resources—but not the platform to show it. Nexus AI is the tool I wish they had. It's a bridge of confidence, designed to help the world rediscover the value of places—and the people—that have long been underestimated."
                                </blockquote>
                                <p className="mt-6 font-semibold text-gray-800">— The Founder, BW Global Advisory</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Our Guiding Principles */}
                <section className="p-8 md:p-12 bg-white rounded-2xl shadow-lg">
                    <div className="bg-gray-100 border-l-4 border-orange-500 rounded-r-lg p-8 max-w-5xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">A System Built on a Global Realization</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Regional economies are the unsung engines of global prosperity. They supply the food, resources, and industries that fuel national economies, and their people are the backbone of a global workforce, often traveling far from home to support their families. Yet, as major cities face overcrowding and diminishing returns, the immense geographical and human potential of these regions remains overlooked.
                        </p>
                        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                            <strong>BW Nexus AI was built on this realization.</strong> It is a pioneering system designed to give a voice to these underestimated places. It specializes in early-stage understanding, transforming initial ideas into clear, actionable insights. By providing the reliable, unbiased intelligence that leaders have been asking for, Nexus AI bridges the gap between local realities and global opportunities, ensuring the value of these vital communities is no longer taken for granted.
                        </p>
                    </div>
                </section>

                {/* Section: The BWGA Nexus Platform */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="space-y-16">
                        {/* What BW Nexus AI Produces */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A team collaborating on a strategic blueprint." className="rounded-xl shadow-lg object-cover w-full h-full" />
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">What BW Nexus AI Produces</h2>
                                <p className="text-gray-600 mb-6">The system generates a comprehensive Partnership Toolkit tailored for early engagement and sustained development:</p>
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 bg-orange-500 rounded-full flex-shrink-0"></div>A world-class intelligence report featuring structured, data-driven analysis using proprietary frameworks to reveal economic DNA, ecosystem architectures, and strategic recommendations.</li>
                                    <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 bg-orange-500 rounded-full flex-shrink-0"></div>A professionally drafted outreach letter that reduces perceived risk, builds genuine interest, and initiates confident dialogue, enabling users to start conversations like "We believe we have something that could be of benefit to both of us."</li>
                                    <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 bg-orange-500 rounded-full flex-shrink-0"></div>Evidence-backed cases for partnerships, including insights into readiness for investment, symbiotic ecosystems, and simulations of policy or project impacts, all customized to specific goals such as attracting FDI, entering new markets, or modeling socio-economic effects.</li>
                                </ul>
                            </div>
                        </div>

                        {/* For Whom */}
                        <div>
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">For Whom</h2>
                                <p className="mt-2 max-w-3xl mx-auto text-lg text-gray-600">It's built for a diverse range of stakeholders in global regional development who seek to foster change and clarify overlooked opportunities:</p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">Governments</h4>
                                    <p className="text-gray-600 mb-4">To highlight regional strengths, draw in strategic investments, and craft policies that drive sustainable growth in areas often dismissed as peripheral.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">Private Enterprise</h4>
                                    <p className="text-gray-600 mb-4">To navigate expansions into hidden markets, vet partners, and optimize supply chains in regions where traditional analysis falls short.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">Financial Institutions & Banks</h4>
                                    <p className="text-gray-600 mb-4">To assess project viability, align with ESG standards, and forecast economic outlooks for asset classes that others ignore.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">NGOs & Academia</h4>
                                    <p className="text-gray-600 mb-4">To conduct impact studies, synthesize data for research, and model development programs that give voice to communities taken for granted.</p>
                                </div>
                            </div>
                        </div>

                        {/* Why It's Different */}
                        <div className="pt-12 border-t border-gray-200">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Why It's Different from Other Systems</h2>
                                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">As the world's first Strategic Symbiosis System, BW Nexus AI fundamentally redefines regional development by focusing on early-stage clarity and the reclamation of undervalued potential. Unlike generic AI tools, standard reports, or basic matchmaking platforms that rely on outdated data, high costs, or superficial insights, it tackles the "crisis of clarity" head-on, translating raw ideas into a global language that builds confidence and attracts investment. It gives voice to change by empowering those in overlooked places—small Asian cities, regional hubs, or emerging economies—to articulate their worth, turning what most take for granted into recognized assets.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Proprietary Technologies</h3>
                                        <p className="text-gray-600">Innovations like Nexus Symbiotic Intelligence Language™ (for clear, queryable dialogue), Regional Readiness & Opportunity Index (RROI) (uncovering true economic DNA), Strategic Ecosystem Architecture Model (SEAM) (building resilient partner networks), and AI-Human Confidence Bridge (crafting risk-reducing communications).</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Early Stages of Interest</h3>
                                        <p className="text-gray-600">Where others are paralyzed by fog, Nexus AI requires just a few words to create structured, evidence-backed cases, breaking the ice for serious engagement without extensive upfront research.</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Classifications on Overlooked Places</h3>
                                        <p className="text-gray-600">It moves beyond biases to reveal opportunities in regions dismissed as underdeveloped, fostering symbiotic partnerships where others see only risks, and providing the clarification people have demanded to drive meaningful, inclusive global development.</p>
                                    </div>
                                </div>
                                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A diverse team working on a complex project, representing symbiosis." className="rounded-xl shadow-lg object-cover w-full h-full" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: In Essence: The World's First Strategic Symbiosis System */}
                <section className="text-center bg-gray-800 text-white rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">The World's First Strategic Symbiosis System</h2>
                    <p className="text-lg text-gray-300 mb-6 max-w-4xl mx-auto">
                        BW Nexus AI is not just another AI platform. It is the world’s first Strategic Symbiosis System—designed to connect vision with reality, ambition with opportunity, and people with purpose. It takes a single idea—what if we could see the world clearly, region by region?—and turns it into a living intelligence engine that makes understanding accessible to everyone. Because the first spark of understanding is where every great partnership begins.
                    </p>
                    <div className="my-8 py-6 border-t border-b border-gray-700 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">Simple, Transparent Access</h3>
                        <p className="text-gray-300 mb-2">Gain full access to the BW Nexus AI platform with unlimited usage.</p>
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white mb-2">$15</p>
                            <p className="text-gray-300 font-semibold mb-4">for 7 day access</p>
                            <p className="text-lg font-bold text-white mb-2">3 months subscription $175 • 6 months subscription $395 • 12 months subscription $595</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onViewChange('report')}
                        className="bg-orange-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center gap-3 justify-center">
                            <BlueprintIcon className="w-6 h-6" />
                            Launch the Workspace
                        </div>
                    </button>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                    <div className="flex justify-center mb-6">
                        <NexusLogo className="w-10 h-10 text-gray-500" />
                    </div>
                    <p className="font-semibold text-gray-600">BW Global Advisory</p>
                    <p className="text-sm mb-4">ABN 55 978 113 300</p>
                    <p className="text-xs">&copy; 2024 BW Global Advisory. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default WhoWeAre;