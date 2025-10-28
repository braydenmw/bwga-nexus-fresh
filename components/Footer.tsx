import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} BWGA Global. All Rights Reserved.</p>
                        <p className="text-xs text-gray-500 mt-1">Empowering Decisions, Driving Growth.</p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;