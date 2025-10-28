import React from 'react';

interface PageNavigationProps {
    currentIndex: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({ currentIndex, total, onPrev, onNext }) => {
    const pageNumber = currentIndex + 1;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 mt-4 border-t border-nexus-border-medium flex justify-between items-center">
            <button
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="nexus-button-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
                &larr; Previous
            </button>
            <div className="text-sm font-semibold text-nexus-text-secondary">
                Page{' '}
                <span 
                    className="text-nexus-accent-brown font-bold text-base"
                    style={{ textShadow: '0 0 8px rgba(146, 64, 14, 0.6)' }}
                >
                    {pageNumber}
                </span> 
                {' '}of {total}
            </div>
            <button
                onClick={onNext}
                disabled={currentIndex >= total - 1}
                className="nexus-button-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
                Next &rarr;
            </button>
        </div>
    );
};