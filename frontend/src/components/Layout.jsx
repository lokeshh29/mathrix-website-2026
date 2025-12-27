import React from 'react';
import Navbar from './Navbar';
import ThreeBackground from './ThreeBackground';

import ChatBot from './ChatBot';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col relative">
            <ThreeBackground />
            <Navbar />
            <main className="flex-grow pt-28 relative z-10">
                {children}
            </main>
            <ChatBot />
            <footer className="glass border-t border-white/10 py-8 mt-20">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>© 2026 Mathrix. All rights reserved.</p>
                    <div className="flex justify-center gap-6 mt-4">
                        <a href="#" className="hover:text-purple-400 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
                    </div>

                    {/* Developer Credit */}
                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-3">
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Designed & Developed by</p>
                        <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-full border border-white/10 cursor-default group">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-xs">L</span>
                            </div>
                            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Lokesh</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default Layout;
