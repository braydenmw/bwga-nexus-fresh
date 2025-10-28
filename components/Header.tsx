import React, { useState } from 'react';
import type { View } from '../types.ts';
import { NexusLogo } from './Icons.tsx';
import { ORIGINAL_NAV_ITEMS } from '../constants.tsx';

interface HeaderProps {
    currentView: View;
    onViewChange: (view: any) => void;
}

const NAV_ITEMS = ORIGINAL_NAV_ITEMS.filter(item => item.id !== 'technical-manual');

const NavLink: React.FC<{
    onClick: () => void;
    isActive: boolean;
    title: string;
}> = ({ onClick, isActive, title }) => (
    <button
        onClick={onClick}
        className={`relative font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-300 ${isActive ? 'text-blue-600' : ''}`}
    >
        {title}
        {isActive && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></span>
        )}
    </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (view: View) => {
        onViewChange(view);
        setMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => handleNavClick('who-we-are')}
                    >
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                BW Nexus AI
                            </h1>
                            <p className="text-xs text-gray-600 leading-tight">A BW Global Advisory Initiative</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                isActive={currentView === item.id}
                                title={item.title}
                            />
                        ))}
                    </nav>

                    {/* Contact Button & Mobile Menu Toggle */}
                    <div className="flex items-center gap-4">
                        <button className="hidden lg:block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Contact Us
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <nav className="flex flex-col items-center gap-4 p-4">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full text-left font-semibold p-3 rounded-md ${
                                    currentView === item.id
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {item.title}
                            </button>
                        ))}
                        <button className="w-full bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-2">
                            Contact Us
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};