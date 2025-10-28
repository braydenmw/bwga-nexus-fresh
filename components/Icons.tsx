import React from 'react';

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.children}
  </svg>
);

export const DataProfessionalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 200 200" {...props}>
      <defs>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--secondary-accent)" />
          <stop offset="100%" stopColor="var(--primary-accent)" />
        </linearGradient>
      </defs>
      {/* Globe background */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="var(--border-color)" strokeWidth="2" opacity="0.3" />
      <path d="M100,10 A 90 90 0 0 1 100,190" fill="none" stroke="var(--border-color)" strokeWidth="2" opacity="0.3" />
      <path d="M10,100 A 90 90 0 0 1 190,100" fill="none" stroke="var(--border-color)" strokeWidth="2" opacity="0.3" />
      <ellipse cx="100" cy="100" rx="40" ry="90" fill="none" stroke="var(--border-color)" strokeWidth="2" opacity="0.3" />
      
      {/* Central Figure */}
      <g transform="translate(0, 10)">
        <circle cx="100" cy="60" r="20" fill="url(#iconGrad)" />
        <path d="M70 100 C 70 90, 70 80, 100 80 C 130 80, 130 90, 130 100 L 130 150 H 70 Z" fill="url(#iconGrad)" />
      </g>
      
      {/* Data elements */}
      <rect x="20" y="120" width="20" height="60" rx="4" fill="var(--primary-accent)" opacity="0.7" />
      <rect x="45" y="90" width="20" height="90" rx="4" fill="var(--primary-accent)" opacity="0.9" />
      <rect x="135" y="60" width="20" height="120" rx="4" fill="var(--secondary-accent)" opacity="0.9" />
      <rect x="160" y="100" width="20" height="80" rx="4" fill="var(--secondary-accent)" opacity="0.7" />
    </svg>
);

export const RegionalDevelopmentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 200 200" {...props}>
        <defs>
            <linearGradient id="devGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary-accent)" />
                <stop offset="100%" stopColor="var(--secondary-accent)" />
            </linearGradient>
        </defs>
        {/* Globe */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.2" />
        <path d="M40 160 Q 100 120, 160 160" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.2" />
        <path d="M40 40 Q 100 80, 160 40" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.2" />
        <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.2" />

        {/* Person standing on globe */}
        <g transform="translate(0, 20)">
            {/* Person silhouette */}
            <circle cx="100" cy="60" r="15" fill="url(#devGrad)" />
            <path d="M85 75 C 85 70, 85 65, 100 65 C 115 65, 115 70, 115 75 L 115 110 H 85 Z" fill="url(#devGrad)" />
            {/* Arms */}
            <path d="M75 85 L 85 85" stroke="url(#devGrad)" strokeWidth="6" strokeLinecap="round" />
            <path d="M115 85 L 125 85" stroke="url(#devGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Legs */}
            <path d="M90 110 L 90 130" stroke="url(#devGrad)" strokeWidth="6" strokeLinecap="round" />
            <path d="M110 110 L 110 130" stroke="url(#devGrad)" strokeWidth="6" strokeLinecap="round" />
        </g>
    </svg>
);


export const NexusLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z M15 31 L50 12.5 L85 31 L85 69 L50 87.5 L15 69 Z M50 22 L25 35.5 L50 49 L75 35.5 Z M25 42.5 L50 56 L50 80 L25 66.5 Z M75 42.5 L50 56 L50 80 L75 66.5 Z"></path>
    </svg>
);

export const MissionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </Icon>
);

export const ManualIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </Icon>
);

export const OpportunitiesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </Icon>
);

export const InquireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18L12 21.75 15.75 18m-7.5-6L12 5.25 15.75 12" />
    </Icon>
);

export const ReportIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </Icon>
);

export const ComplianceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.35-3.132-.984-4.522A11.959 11.959 0 0118 6.036a11.959 11.959 0 01-5.962-1.544c-.425-.162-1.054-.162-1.479 0z" />
    </Icon>
);

export const PartnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.289 2.72a3 3 0 01-4.682-2.72 9.094 9.094 0 013.741-.479m7.289 2.72a8.973 8.973 0 01-7.289-2.72m0 0a8.973 8.973 0 017.289 2.72M12 5.25a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.01 9.01 0 008.536-12.72M3.464 8.28A9.01 9.01 0 0012 21" />
    </Icon>
);

export const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </Icon>
);

export const SymbiosisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M12 2L12 2C17.5228 2 22 6.47715 22 12V12"></path><path d="M22 12L22 12C22 17.5228 17.5228 22 12 22H12"></path><path d="M12 22L12 22C6.47715 22 2 17.5228 2 12V12"></path><path d="M2 12L2 12C2 6.47715 6.47715 2 12 2H12"></path><path d="M9 15L12 12L15 15"></path><path d="M12 12L12 9"></path>
    </Icon>
);

export const AnalyzeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
    </Icon>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </Icon>
);

export const LetterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </Icon>
);

export const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Icon>
);

export const GeospatialIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </Icon>
);

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.35-3.132-.984-4.522A11.959 11.959 0 0118 6.036a11.959 11.959 0 01-5.962-1.544c-.425-.162-1.054-.162-1.479 0z" />
    </Icon>
);

export const BookmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </Icon>
);

export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.098a2.25 2.25 0 01-2.25 2.25H5.998a2.25 2.25 0 01-2.25-2.25v-4.098m16.5 0a2.25 2.25 0 00-2.25-2.25H5.998a2.25 2.25 0 00-2.25 2.25m16.5 0v-2.25A2.25 2.25 0 0018 9.75H6A2.25 2.25 0 003.75 12v2.25m16.5 0v-4.5A2.25 2.25 0 0018 7.5H6A2.25 2.25 0 003.75 9.75v4.5" />
    </Icon>
);

export const MegaphoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 12h-3a7.5 7.5 0 000-12h3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9a3 3 0 100 6h3a3 3 0 000-6h-3z" />
    </Icon>
);

export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </Icon>
);

export const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </Icon>
);

export const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </Icon>
);

export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </Icon>
);

export const QuestionMarkCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </Icon>
);

export const BlueprintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5V3.75H3.75zM9 9h6.75M9 12h6.75M9 15h6.75M12 20.25v-1.5" />
    </svg>
);

export const VentureCapitalistIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.517l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </Icon>
);

export const EconomistIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0H21m-9 12.75h5.25m-5.25 0h-5.25m5.25 0V18m0 0a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm-7.5 0h-.75A.75.75 0 003 18.75V21m0 0h12.75" />
    </Icon>
);

export const GeopoliticalStrategistIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25L9 3m0 0l5.25 2.25M9 3v10.5M14.25 5.25L9 7.5M3.75 5.25L9 7.5m0 0v10.5m0-10.5L3.75 5.25M9 7.5L14.25 5.25m0 0l5.25 2.25m-5.25-2.25v10.5m5.25-10.5L9 18" />
    </Icon>
);

export const EsgAnalystIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9h-9v9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 019 9h-9V3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 01-9-9h9v9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 00-9 9h9V3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 10-7.072 7.072" />
    </Icon>
);

export const InfrastructurePlannerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21V13.5m0 0V3h9v10.5m-9 0h9m-9 0H3m6.75 0H21m-1.5 0V3h-3.75v10.5m3.75 0h-3.75M3 21h18" />
    </Icon>
);

export const SupplyChainAnalystIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6h4.5m-4.5 4.5h4.5m-4.5 4.5h4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9.75v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12v4.5" />
    </Icon>
);

export const WorkforceSpecialistIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.53-2.475c0 .245.02.488.06.726" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12.75a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19.128a9.38 9.38 0 00-2.625.372 9.337 9.337 0 00-4.121-.952 4.125 4.125 0 007.53 2.475c0 .245-.02.488-.06.726" />
    </Icon>
);

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3.6V20.4M7.2 7.2l9.6 9.6M16.8 7.2l-9.6 9.6" />
    </Icon>
);

export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.53-2.475c0 .245.02.488.06.726" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12.75a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19.128a9.38 9.38 0 00-2.625.372 9.337 9.337 0 00-4.121-.952 4.125 4.125 0 007.53 2.475c0 .245-.02.488-.06.726" />
    </Icon>
);

export const PuzzleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v.65c0 .384-.148.755-.414 1.036-.282.283-.689.417-1.101.417-.512 0-.992-.192-1.35-.512-.36-.32-.55-.754-.55-1.21v-.456c0-.384.148-.755.414-1.036.282-.283.689-.417 1.101-.417.512 0 .992.192 1.35.512.36.32.55.754.55 1.21v.456c0 .355-.186.676-.401.959-.221.29-.349.634-.349 1.003 0 1.036 1.007 1.875 2.25 1.875s2.25-.84 2.25-1.875c0-.369-.128-.713-.349-1.003-.215-.283-.401-.604-.401-.959v-.65z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15.75a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5h3M10.5 3.75h3M10.5 6h3M10.5 8.25h3M10.5 10.5h3M10.5 12.75h3M10.5 15h3M10.5 17.25h3M10.5 19.5h3" />
    </Icon>
);

export const TechnologyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25zm-6-2.25h.008v.008H15V3zm-3.375 0h.008v.008h-.008V3zm-3.375 0h.008v.008h-.008V3z" />
    </Icon>
);

export const RenewableEnergyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l16.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3.75v16.5" />
    </Icon>
);

export const InfrastructureIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m16.5-18v18m-1.5-18h-13.5m13.5 18h-13.5" />
    </Icon>
);

export const HealthcareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0 1.32-.84 2.5-2.01 2.872A10.49 10.49 0 0112 21c-2.83 0-5.434-.99-7.49-2.628A2.25 2.25 0 012.25 16.5v-3c0-1.036.63-1.944 1.55-2.275a9.01 9.01 0 014.2-1.043 8.98 8.98 0 011.65.247 9.04 9.04 0 014.125-2.733A2.492 2.492 0 0118.75 6c1.38 0 2.5 1.12 2.5 2.5V8.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25V15m1.875-1.875H10.125" />
    </Icon>
);

export const ManufacturingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21V10.5M12 21V10.5m3.75 10.5V10.5M9.75 6.75h4.5" />
    </Icon>
);

export const AgricultureIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 010-5.304m5.304 0a3.75 3.75 0 010 5.304m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.788m13.788 0c3.808 3.808 3.808 9.98 0 13.788" />
    </Icon>
);

export const FinanceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0H21m-9 12.75h5.25m-5.25 0h-5.25m5.25 0V18m0 0a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    </Icon>
);

export const MiningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877-1.103 1.103a.75.75 0 01-1.06 0l-1.104-1.103-5.877 5.877a2.652 2.652 0 003.75 3.75l1.103-1.104a.75.75 0 011.06 0l1.103 1.103z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.125 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM12 4.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V4.125z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.875 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" />
    </Icon>
);

export const LogisticsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a1.125 1.125 0 001.125-1.125v-6.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v6.625c0 .621.504 1.125 1.125 1.125z" />
    </Icon>
);

export const TourismIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8-9h-1M4 12H3m14.66-4.66l-.71.71M6.34 17.66l-.71.71M17.66 6.34l-.71-.71M6.34 6.34l-.71-.71" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" />
    </Icon>
);

export const EducationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l15.482 0m0 0l15.482 0" />
    </Icon>
);

export const MatchMakerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-2.25 3h7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </Icon>
);

export const SymbiosisGraphicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M12 2L12 2C17.5228 2 22 6.47715 22 12V12"></path><path d="M22 12L22 12C22 17.5228 17.5228 22 12 22H12"></path><path d="M12 22L12 22C6.47715 22 2 17.5228 2 12V12"></path><path d="M2 12L2 12C2 6.47715 6.47715 2 12 2H12"></path><path d="M9 15L12 12L15 15"></path><path d="M12 12L12 9"></path>
    </Icon>
);

export const CustomPersonaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-7.5" />
    </Icon>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-4.18v-.75c0-1.035-.84-1.875-1.875-1.875h-.75A1.875 1.875 0 008.25 8.25v.75a6.01 6.01 0 001.5 4.18M12 18v-5.25M8.25 21h7.5M12 13.5V21" />
    </Icon>
);

export const TargetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a6 6 0 100 12 6 6 0 000-12z" />
    </Icon>
);

export const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </Icon>
);

export const CustomIndustryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15.75V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021.75 18v-2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75V4.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121.75 4.5v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 11.25h16.5" />
    </Icon>
);

export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.028 16.5l-2-7A1 1 0 018.11 8.11l7 2A1 1 0 0016 9.028l-1.428 5a1 1 0 001.409 1.169l14-7a1 1 0 000-1.788l-14-7z" />
    </Icon>
);

export const ChatBubbleLeftRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72.35c-1.134.106-2.193-.54-2.614-1.543l-1.03-2.298c-.42-.933-1.48-1.543-2.614-1.543l-3.72-.35c-1.133-.106-1.98-.983-1.98-2.193v-4.286c0-.97.616-1.813 1.5-2.097m0 0A9.025 9.025 0 0112 5.25c2.33 0 4.474.857 6.112 2.261m-12.224 0A9.025 9.025 0 0012 5.25c-2.33 0-4.474.857-6.112 2.261" />
    </Icon>
);

export const SaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </Icon>
);

export const LoadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </Icon>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.144-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.057-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </Icon>
);