import React from 'react';
import { NexusLogo } from './Icons';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <header className="bg-gray-800 shadow-md">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <NexusLogo className="w-10 h-10 mr-4" />
                        <h1 className="text-2xl font-bold">BW Nexus AI</h1>
                    </div>
                    <div>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Who We Are</a>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Inquire</a>
                    </div>
                </nav>
            </header>
            <main className="flex-grow container mx-auto px-6 py-8">
                {children}
            </main>
            <footer className="bg-gray-800">
                <div className="container mx-auto px-6 py-4 text-center text-gray-400">
                    <p>&copy; 2024 BW Global Advisory. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;