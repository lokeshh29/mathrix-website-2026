import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <footer className="glass border-t border-white/10 py-8 mt-20">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>© 2025 Mathrix Symposium. All rights reserved.</p>
                    <div className="flex justify-center gap-6 mt-4">
                        {/* Social placeholders */}
                        <a href="#" className="hover:text-purple-400 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
