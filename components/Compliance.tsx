import React from 'react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
            <div className="prose max-w-none text-gray-700 text-base leading-relaxed prose-p:mb-4 prose-strong:font-semibold prose-strong:text-gray-900">
                {children}
            </div>
        </div>
    </section>
);

const Compliance: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <header className="text-center py-24 px-4 bg-white border-b border-gray-200">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                  Ethical AI & Data Governance Framework (High-Level)
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
                    Version 1.0 – May 2025
                </p>
            </header>
            <div className="p-6 md:p-12 max-w-7xl mx-auto">

                <Section title="1. Our Commitment to Responsible AI & Ethical Data Stewardship">
                    <p>
                        At BW Global Advisory (BWGA), we believe that Artificial Intelligence holds immense potential to unlock regional economic opportunities and foster inclusive, sustainable development globally. However, we recognize that this power must be wielded with profound responsibility. Our developing BWGA Nexus™ AI platform is being built upon a foundation of strong ethical principles and robust data governance practices. We are committed to ensuring our technology serves humanity, respects individual rights, and promotes equitable outcomes.
                    </p>
                    <p>
                        This framework outlines our guiding principles for the ethical development and deployment of AI and the responsible management of data within the BWGA Nexus ecosystem. It is a living document and will evolve as AI technologies and global best practices advance.
                    </p>
                </Section>
                
                <Section title="2. Core Ethical Principles for AI Development & Application">
                    <p><strong>• Human-Centricity & Beneficial Purpose:</strong></p>
                    <p>
                        The primary objective of BWGA's AI is to augment human intelligence and support decisions that lead to positive socio-economic outcomes, particularly for underserved regional communities.
                    </p>
                    <p>
                        We prioritize applications of AI that aim to alleviate poverty, enhance inclusive growth, promote environmental sustainability, and improve governance, in alignment with the UN Sustainable Development Goals (SDGs).
                    </p>
                    <p><strong>• Fairness & Non-Discrimination (Bias Mitigation):</strong></p>
                    <p>
                        We acknowledge the potential for biases in data and algorithms. BWGA is committed to proactively identifying and mitigating such biases throughout the AI lifecycle – from data collection and model training to deployment and monitoring.
                    </p>
                    <p>
                        Efforts include diversifying data sources, employing bias detection techniques where feasible, ensuring diverse perspectives in our human curation teams, and regularly auditing AI model outputs for unintended discriminatory impacts.
                    </p>
                    <p><strong>• Transparency & Explainability (Appropriate to Context):</strong></p>
                    <p>
                        While the deepest algorithmic complexities of our proprietary "Nexus AI" may remain trade secrets, we are committed to transparency regarding:
                    </p>
                    <ul>
                        <li><strong>Data Sourcing:</strong> Clearly attributing the general categories and, where permissible, specific public sources of data used in our analyses and reports (e.g., World Bank, OECD, National Statistics Offices).</li>
                        <li><strong>Methodological Approach (High-Level):</strong> Providing understandable explanations of how our AI modules (e.g., URP Index, Opportunity Catalyst) arrive at their insights at a conceptual level.</li>
                        <li><strong>Limitations of AI:</strong> Clearly communicating that AI outputs are tools for decision support and require human judgment and due diligence, not infallible predictions.</li>
                    </ul>
                    <p><strong>• Accountability & Human Oversight (Human-in-the-Loop):</strong></p>
                    <p>
                        BWGA operates on an AI-Human Symbiosis Model. Critical strategic recommendations, high-impact forecasts, and sensitive matchmaking outputs are always subject to review, validation, and contextualization by qualified human experts.
                    </p>
                    <p>
                        We maintain clear lines of responsibility for the development, deployment, and ethical oversight of our AI systems, with ultimate accountability resting with BWGA leadership.
                    </p>
                    <p><strong>• Security & Safety:</strong></p>
                    <p>
                        We are committed to developing AI systems that are robust, secure, and operate safely within their intended parameters, minimizing risks of unintended consequences.
                    </p>
                    <p>
                        Data security measures are implemented to protect the integrity and confidentiality of data processed by our systems.
                    </p>
                </Section>
                
                <Section title="3. Data Governance & Privacy Principles">
                    <p><strong>• Lawfulness, Fairness, and Transparency in Data Processing:</strong></p>
                    <p>
                        BWGA will process data in compliance with applicable data protection laws and regulations in the jurisdictions where we operate and from which data is sourced, including principles aligned with GDPR (General Data Protection Regulation), the Philippine Data Privacy Act (RA 10173), and other relevant national frameworks.
                    </p>
                    <p><strong>• Data Minimization & Purpose Limitation:</strong></p>
                    <p>
                        We strive to collect and process only the data necessary for the specific, legitimate purposes of regional economic analysis, investment matchmaking, and providing strategic insights.
                    </p>
                    <p>
                        Primarily, BWGA leverages publicly available data, official government statistics, and third-party licensed data.
                    </p>
                    <p><strong>• Data Accuracy:</strong></p>
                    <p>
                        We endeavor to use accurate and up-to-date data sources. Our AI includes processes for data cleansing and validation, and we flag data quality or "data desert" issues where identified.
                    </p>
                    <p><strong>• Confidentiality & Security:</strong></p>
                    <p>
                        Confidential information shared with BWGA by clients or partners for specific commissioned analyses will be protected through appropriate technical and organizational security measures and governed by strict Non-Disclosure Agreements (NDAs) or contractual clauses.
                    </p>
                    <p>
                        Access to sensitive data within BWGA is restricted to authorized personnel on a need-to-know basis.
                    </p>
                    <p><strong>• Consent (Where Applicable for Personal Data):</strong></p>
                    <p>
                        While BWGA primarily deals with aggregated, anonymized, or publicly available economic and regional data, should any personal data be involved (e.g., contact information for LGU liaisons provided with consent), its processing will be subject to explicit consent and clear information regarding its use.
                    </p>
                    <p><strong>• Data Ethics in Sourcing (Third-Party Data):</strong></p>
                    <p>
                        When utilizing third-party data providers, we will make reasonable efforts to ascertain their own ethical sourcing and data privacy compliance.
                    </p>
                </Section>

                <Section title="4. Application to Specific BWGA Offerings">
                    <p><strong>• AI-Human Intelligence Reports:</strong> Reports will clearly state the general nature of data sources used and acknowledge the illustrative and pre-commercial R&D status of some AI-driven insights. Confidential client data used for bespoke reports will be protected as per agreement.</p>
                    <p><strong>• BWGA Nexus Live AI Dashboard (Future):</strong> The dashboard will be designed with privacy-enhancing technologies, role-based access controls, and clear user notifications regarding data use and AI-driven recommendations. Data contribution by government partners will be via secure, agreed-upon protocols.</p>
                </Section>

                <Section title="5. Continuous Improvement & Stakeholder Engagement">
                    <p>
                        This Ethical AI & Data Governance Framework is not static. BWGA is committed to:
                    </p>
                    <ul>
                        <li>Regularly reviewing and updating this framework in light of technological advancements, evolving ethical best practices, and feedback from stakeholders (clients, partners, communities).</li>
                        <li>Engaging in dialogue with experts in AI ethics, data privacy, and international development to ensure our approach remains responsible and beneficial.</li>
                        <li>Providing appropriate training to our team (as it grows) on these ethical principles and data governance procedures.</li>
                    </ul>
                    <p><strong>Our Pledge:</strong></p>
                    <p>
                        BW Global Advisory is dedicated to harnessing the power of AI responsibly to create a more equitable and prosperous world by illuminating the potential of its regions. We believe that ethical considerations are not a constraint on innovation, but rather a vital enabler of trustworthy and sustainable technological advancement that truly serves humanity.
                    </p>
                </Section>

                <Section title="BWGA Company Profile & Capabilities Statement">
                    <p><strong>Illuminating Regional Potential. Catalyzing Global Symbiosis. Driving Inclusive Growth.</strong></p>
                    <p><strong>Date: May 2025</strong></p>
                </Section>

                <Section title="1. Our Vision: A World of Thriving Regional Economies">
                    <p>
                        BW Global Advisory (BWGA) envisions a world where the latent economic potential of every regional city and community is unlocked, understood, and connected to strategic global opportunities. We believe in fostering a global economic ecosystem where investment flows intelligently to drive not just profit, but also sustainable development, poverty alleviation, and inclusive prosperity for all, especially in areas traditionally overlooked.
                    </p>
                </Section>

                <Section title="2. Our Mission: To Be the World's Premier AI-Human Intelligence Partner for Regional Development">
                    <p>
                        Our core mission is to bridge the critical "understanding gap" between regional potential and global capital. We achieve this through BWGA Nexus 4.0, our proprietary, developing AI-Human intelligence platform. BWGA Nexus provides governments, investors, and development organizations with unparalleled, actionable insights to:
                    </p>
                    <ul>
                        <li>Identify & Validate high-potential regional investment opportunities worldwide.</li>
                        <li>De-Risk market entry and strategic partnerships through deep, predictive analysis.</li>
                        <li>Facilitate symbiotic connections that deliver mutual economic and social benefits.</li>
                        <li>Empower local communities by ensuring development is inclusive and impactful.</li>
                    </ul>
                </Section>

                <Section title="3. The BWGA Difference: The 'Nexus AI' & Founder-Led Insight">
                    <p>
                        Founded by Brayden Walls, BWGA was born from over 12 months of intensive, "boots-on-the-ground" immersion in diverse regional economies. This firsthand experience revealed systemic challenges – outdated data, misaligned perceptions, and a lack of sophisticated tools to connect genuine regional assets with the right global partners – that traditional approaches often fail to address.
                    </p>
                    <p>
                        BWGA Nexus 4.0 is engineered to be different:
                    </p>
                    <ul>
                        <li><strong>Globally Unique AI Engine:</strong> Our developing "Nexus AI" (currently conceptual application v3.9, evolving to v4.0) integrates historical context, real-time geopolitical and market sensors, predictive modeling, and a "Global Symbiosis Matchmaking" capability. It doesn't just analyze what is; it helps understand what was, forecasts what could be, and prescribes pathways to what should be.</li>
                        <li><strong>The Power of AI-Human Synergy:</strong> We believe AI is a powerful amplifier, but human strategic insight, ethical oversight, and contextual understanding are irreplaceable. Every AI-generated insight is validated and enriched by experienced human analysts, ensuring practical relevance and actionable recommendations.</li>
                        <li><strong>Focus on "Latent Potential" & "Convertible Assets":</strong> We go beyond surface-level data to identify underutilized regional strengths and pathways to transform them into viable economic opportunities.</li>
                        <li><strong>Commitment to Ethical AI & Shared Value:</strong> Our platform is designed with a core commitment to supporting the UN Sustainable Development Goals (SDGs), promoting inclusive growth, and ensuring transparency. A key tenet of our model is the reinvestment of 10% of our net project fees into community-identified initiatives within the regions we analyze.</li>
                    </ul>
                </Section>

                <Section title="4. Our Core Capabilities & Service Offerings (Founder's Tier – Pre-Commercial Stage)">
                    <p>
                        BWGA is currently in an advanced, founder-led, pre-commercial R&D phase for its full Live AI Dashboard. Our primary offering at this stage is the delivery of bespoke AI-Human Intelligence Reports, designed to provide immediate strategic value.
                    </p>
                    <p><strong>A. For Governments (LGUs, Regional Development Authorities, National Agencies):</strong></p>
                    <p>We empower governments to effectively showcase their regions, attract strategic investment, and design impactful development policies.</p>
                    <ul>
                        <li><strong>Tier 1: "Regional Opportunity Snapshot":</strong> Foundational AI-driven assessment of a region's baseline attractiveness (URP Index), key opportunity sectors, and initial risk/advantage overview.</li>
                        <li><strong>Tier 2: "Strategic Investment Attraction & Market Mapping Report":</strong> Deeper analysis of priority sectors, local economic asset mapping, ESG/Climate profile overlays, and identification of types of ideal investor profiles.</li>
                        <li><strong>Tier 3: "Comprehensive Regional Economic Masterplan & Global Positioning Strategy" (Pilot Program):</strong> A 12-month intensive partnership to develop a full transformation roadmap, generate qualified investment leads, build LGU capacity, and position the region as a global innovator. This includes ongoing strategic advisory and input into the BWGA Nexus Live AI Dashboard.</li>
                    </ul>
                    <p><strong>Key AI-Powered Insights for Governments Include:</strong></p>
                    <ul>
                        <li>Universal Regional Potential (URP) Index 5.0: Dynamic, goal-aligned benchmarking.</li>
                        <li>"Latent Asset Identifier" & "Convertible Asset Score."</li>
                        <li>"Transformation Pathway Simulator": Simulating impacts of policy/infrastructure changes.</li>
                        <li>"Incentive Optimizer" & Policy Gap Analysis.</li>
                        <li>Support in aligning with SDGs and attracting climate finance.</li>
                    </ul>
                    <p><strong>B. For Businesses (SMEs to Multinational Corporations):</strong></p>
                    <p>We provide companies with the intelligence to de-risk international expansion, identify "hidden gem" regional markets, and optimize their global footprint.</p>
                    <ul>
                        <li><strong>Tier 1: "Regional Market Explorer" Scan:</strong> AI-driven identification of 2-3 best-fit global regional cities aligning with core business needs, providing a cost-effective "first look."</li>
                        <li><strong>Tier 2: "Strategic Market Entry Blueprint":</strong> Detailed analysis of shortlisted regions, including policy/incentive mapping, sector-specific fit, and initial local partner archetype identification.</li>
                        <li><strong>Tier 3: "Comprehensive Regional Expansion & Investment Roadmap":</strong> Advanced, decision-ready intelligence for significant strategic investments, including multi-region comparative analysis, workforce/logistics deep dives, and ESG/Regulatory due diligence.</li>
                    </ul>
                    <p><strong>Key AI-Powered Insights for Businesses Include:</strong></p>
                    <ul>
                        <li>Precision Matchmaking to "best-fit" regional investment destinations.</li>
                        <li>Nuanced Risk Assessment: Including "Ethical Risk Radar" and "Social License Predictor."</li>
                        <li>"Personalized Incentive Navigator."</li>
                        <li>Identification of non-obvious supply chain synergies and cost-effective operational hubs.</li>
                    </ul>
                </Section>

                <Section title="5. What Makes BWGA Unique – Our 'Nexus' Approach">
                    <ul>
                        <li><strong>Proactive, Not Reactive:</strong> Our AI doesn't just respond; it proactively identifies "unthought-of" opportunities and potential symbiotic partnerships (Region-to-Region, Solution-to-Stakeholder).</li>
                        <li><strong>Predictive & Prescriptive:</strong> We aim to forecast future regional dynamics and offer data-driven recommendations for strategic action, moving beyond purely descriptive analysis.</li>
                        <li><strong>Holistic & Contextual:</strong> We integrate economic, geopolitical, social, environmental, and governance factors, understanding that sustainable development requires a multi-faceted approach. The "Historical Context Engine" ensures lessons from the past inform future strategies.</li>
                        <li><strong>Focus on Inclusive Growth & Poverty Alleviation:</strong> Our AI incorporates an "Inclusive Growth Propensity" lens, ensuring strategies aim to benefit the broader community, not just create economic enclaves.</li>
                        <li><strong>The "Ice-Breaker" & Catalyst for Action:</strong> Our reports and future dashboard simulations are designed to overcome inertia by providing compelling, data-backed rationales for engagement and clear "first steps."</li>
                    </ul>
                </Section>

                <Section title="6. Validation & Early Traction">
                    <p>
                        Despite our pre-commercial status, the BWGA Nexus concept and methodology have garnered significant early validation:
                    </p>
                    <ul>
                        <li><strong>Acknowledged by the Australian Government:</strong> Commendation from the AI Policy Branch, Department of Industry, Science and Resources (Ref: MC25-000584) for innovative potential.</li>
                        <li><strong>Endorsed by Philippine National Agencies:</strong> Positive acknowledgments regarding alignment with national development goals from the National Economic and Development Authority (NEDA) and the Office of the President (PACE Ref: PACEARA-03-04-2025-072).</li>
                        <li><strong>International Development Bank Engagement:</strong> Currently in active discussions with representatives from the World Bank and the Asian Development Bank regarding BWGA's potential to support their regional development and digital transformation initiatives.</li>
                        <li><strong>Early Regional Government Interest:</strong> Positive engagement and expressions of interest for future collaboration from local government leaders in the Philippines (e.g., Pagadian City) and initial dialogues with representatives from other ASEAN governments (e.g., Brunei Darussalam).</li>
                    </ul>
                </Section>

                <Section title="7. The Future: The BWGA Nexus Live AI Dashboard">
                    <p>
                        Our AI-Human Intelligence Reports are the foundational outputs of our developing system. The ultimate vision is the BWGA Nexus Live AI Dashboard – a dynamic, interactive, role-based platform that will provide real-time access to:
                    </p>
                    <ul>
                        <li>Global Regional Atlas with multi-layered intelligence.</li>
                        <li>Personalized opportunity feeds and risk alerts.</li>
                        <li>AI-powered simulation tools for policy and investment scenarios.</li>
                        <li>Secure collaboration zones for verified partners.</li>
                        <li>A transparent "Impact Dashboard" showcasing community reinvestment outcomes.</li>
                    </ul>
                    <p>
                        Partners engaging with our "Founder's Tier" Report Services are not just clients; they are early collaborators contributing valuable insights to the development of this world-first platform and will benefit from priority access and recognition.
                    </p>
                </Section>

                <Section title="8. Our Team (Founder-Led)">
                    <p>
                        BW Global Advisory is currently spearheaded by its founder, Brayden Walls. Mr. Walls brings a unique perspective forged through [briefly mention your core differentiating experience, e.g., "over a year of intensive, self-funded on-the-ground research and direct engagement with regional communities, LGUs, and businesses in developing economies," and "a passion for leveraging technology to solve real-world development challenges"]. His direct experience identifying the critical information and connection gaps that hinder regional progress is the driving force behind BWGA's innovative approach. As we grow, we aim to build a global network of regional experts and data scientists.
                    </p>
                </Section>

                <Section title="9. Primary UNSPSC Classifications for UN Engagement">
                    <ul>
                        <li>Business development services</li>
                        <li>Strategic planning consultation services</li>
                        <li>Data analysis services</li>
                        <li>Artificial intelligence (AI) development services</li>
                        <li>Market research services</li>
                        <li>Economic analysis services</li>
                        <li>Economic development (Governmental services)</li>
                    </ul>
                </Section>

                <Section title="10. Contact Us – Let's Unlock Potential Together">
                    <p>
                        BW Global Advisory is eager to partner with forward-thinking governments, businesses, and development organizations committed to fostering a more prosperous and equitable world.
                    </p>
                    <p><strong>Brayden Walls, Founder</strong></p>
                    <p><strong>BW Global Advisory (ABN 55 978 113 300)</strong></p>
                    <p><strong>Email: brayden@bwglobaladvis.info</strong></p>
                </Section>
            </div>
        </div>
    );
};

export default Compliance;