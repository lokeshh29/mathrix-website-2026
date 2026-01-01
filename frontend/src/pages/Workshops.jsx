import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';

const Workshops = () => {
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/1qBAEEEM24j9_MJxfSXcaylG4ttRAobLJwMItSqMNaXA/edit?usp=forms_home&ouid=114183402363803052568&ths=true";

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Workshops</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Deep dive into the world of technology and mathematics with our hands-on workshops.
                </p>
            </motion.div>

            {/* Upcoming Workshop */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12 relative overflow-hidden text-center"
            >
                <div className="absolute top-0 right-0 p-32 bg-purple-600/10 blur-[80px] rounded-full" />
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="flex items-center justify-center bg-black/20 rounded-xl p-6">
                        <Cpu size={60} className="text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Tech Workshop</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed text-xl">
                            Workshop scheduled during <span className="text-white font-bold">February 2nd week</span>.
                        </p>
                        <div className="flex flex-col items-center gap-6">
                            <div className="bg-white/5 inline-block px-6 py-3 rounded-xl border border-white/10">
                                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Contact for Details</p>
                                <p className="text-2xl font-bold text-white">Hari</p>
                            </div>
                            <button
                                onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:scale-105 active:scale-95"
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Workshops;
