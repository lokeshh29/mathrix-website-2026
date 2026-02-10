import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import Navbar from './Navbar';
import ThreeBackground from './ThreeBackground';

import ChatBot from './ChatBot';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col relative">
            <ThreeBackground />
            <Navbar />
            <main className="flex-grow pt-24 md:pt-28 relative z-10">
                {children}
            </main>
            {/* <ChatBot /> */}
            <footer className="glass border-t border-white/10 py-8 mt-20">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>© 2026 Mathrix. All rights reserved.</p>
                    <div className="flex justify-center gap-6 mt-4">
                        <a href="https://www.instagram.com/mathrix_official/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors" aria-label="Instagram">
                            <Instagram size={24} />
                        </a>
                        <a href="https://www.linkedin.com/company/mathrix-2025/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                            <Linkedin size={24} />
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">Website developed by Lokesh</p>

                </div>
            </footer>
        </div >
    );
};

export default Layout;
