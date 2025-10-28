import React from 'react';

const VillageCityMergeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <filter id="pencilTexture" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3a4a6a" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2a2a2a" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="groundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4a5a7a" />
                <stop offset="100%" stopColor="#3a3a3a" />
            </linearGradient>
        </defs>

        <g style={{ filter: 'url(#pencilTexture)' }}>
            {/* Background */}
            <rect x="0" y="0" width="400" height="70" fill="url(#skyGradient)" />
            <rect x="0" y="70" width="400" height="30" fill="url(#groundGradient)" />

            {/* Village on the left - Asian style */}
             <g id="village" stroke="#222" strokeWidth="1.2" fill="none">
                  {/* Asian House 1 - pencil sketch style */}
                  <rect x="18" y="60" width="22" height="10" rx="2" fill="#e6ecf5" stroke="#222" strokeWidth="1.2" />
                  <path d="M16 60 Q29 48, 44 60 Q38 54, 24 54 Q20 56, 16 60 Z" fill="#b0c4de" stroke="#222" strokeWidth="1.2" />
                  <line x1="18" y1="60" x2="40" y2="60" stroke="#222" strokeWidth="0.7" />
                  <line x1="29" y1="48" x2="38" y2="54" stroke="#222" strokeWidth="0.7" />
                  {/* Asian House 2 - pencil sketch style */}
                  <rect x="48" y="65" width="14" height="8" rx="2" fill="#e6ecf5" stroke="#222" strokeWidth="1.2" />
                  <path d="M46 65 Q55 58, 64 65 Q60 62, 52 62 Q48 64, 46 65 Z" fill="#b0c4de" stroke="#222" strokeWidth="1.2" />
                  <line x1="46" y1="65" x2="62" y2="65" stroke="#222" strokeWidth="0.7" />
                  <line x1="55" y1="58" x2="60" y2="62" stroke="#222" strokeWidth="0.7" />
                  {/* Bamboo Fence - pencil sketch style */}
                  <rect x="20" y="75" width="2" height="8" fill="#e6ecf5" stroke="#222" strokeWidth="0.7" />
                  <rect x="24" y="75" width="2" height="8" fill="#e6ecf5" stroke="#222" strokeWidth="0.7" />
                  <rect x="28" y="75" width="2" height="8" fill="#e6ecf5" stroke="#222" strokeWidth="0.7" />
                  <rect x="32" y="75" width="2" height="8" fill="#e6ecf5" stroke="#222" strokeWidth="0.7" />
                  {/* Lantern - pencil sketch style */}
                  <ellipse cx="38" cy="77" rx="2" ry="2.5" fill="#e6ecf5" stroke="#222" strokeWidth="0.7" />
                  <rect x="37.5" y="79" width="1" height="3" fill="#b0c4de" stroke="#222" strokeWidth="0.7" />
                  {/* Stylized Pine Tree - pencil sketch style */}
                  <ellipse cx="80" cy="65" rx="6" ry="12" fill="#e6ecf5" stroke="#222" strokeWidth="1.2" />
                  <rect x="78" y="77" width="4" height="8" fill="#b0c4de" stroke="#222" strokeWidth="0.7" />
                  {/* Bamboo Tree - pencil sketch style */}
                  <rect x="95" y="68" width="2" height="12" fill="#e6ecf5" stroke="#222" strokeWidth="0.7" />
                  <ellipse cx="96" cy="68" rx="4" ry="7" fill="#b0c4de" stroke="#222" strokeWidth="0.7" />
                  <ellipse cx="94" cy="72" rx="2" ry="4" fill="#b0c4de" stroke="#222" strokeWidth="0.7" />
              </g>

            {/* City on the right */}
            <g id="city" stroke="#000" strokeWidth="0.5" fill="#3a3a3a">
                {/* Building 1 */}
                <rect x="360" y="20" width="30" height="50" />
                {/* Building 2 */}
                <rect x="330" y="30" width="25" height="40" />
                {/* Building 3 */}
                <rect x="300" y="40" width="25" height="30" />
                {/* Building 4 */}
                <rect x="270" y="25" width="20" height="45" />
                {/* Building 5 */}
                <rect x="240" y="50" width="25" height="20" />
            </g>

            {/* Transition in the middle */}
            <g id="transition" stroke="#000" strokeWidth="0.5">
                {/* Road */}
                <path d="M110 70 L230 70 L260 100 L80 100 Z" fill="#4a4a4a" />

                {/* Mid-size buildings */}
                <rect x="130" y="50" width="25" height="20" fill="#6a7a9a" />
                <path d="M128 50 L157 50 L142.5 40 Z" fill="#5a6a8a" />

                <rect x="170" y="45" width="30" height="25" fill="#6a7a9a" />
                <path d="M168 45 L202 45 L185 32 Z" fill="#5a6a8a" />
            </g>
        </g>
    </svg>
);

export default VillageCityMergeIcon;