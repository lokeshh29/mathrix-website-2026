import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Brain } from 'lucide-react';

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

            {/* Workshops Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
                {/* Workshop 1: Gen AI */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 md:p-10 relative overflow-hidden text-center group hover:border-cyan-500/30 transition-all duration-500 flex flex-col h-full"
                >
                    <div className="absolute top-0 right-0 p-32 bg-cyan-600/10 blur-[80px] rounded-full group-hover:bg-cyan-600/20 transition-all" />
                    <div className="relative z-10 flex flex-col items-center gap-6 flex-grow">
                        <div className="flex items-center justify-center bg-black/20 rounded-xl p-6 group-hover:scale-110 transition-transform duration-500">
                            <Brain size={60} className="text-cyan-400" />
                        </div>
                        <div className="w-full flex flex-col items-center flex-grow">
                            <h2 className="text-3xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">Generative AI Workshop</h2>
                            <p className="text-cyan-400 font-mono text-sm mb-4">Feb 10, 2026 • 10:00 AM - 01:00 PM</p>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                Explore the frontiers of Artificial Intelligence. Learn to build and fine-tune generative models in this hands-on session.
                            </p>
                            <div className="mt-auto w-full flex flex-col items-center gap-4">
                                <div className="bg-white/5 inline-block px-6 py-2 rounded-xl border border-white/10">
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Contact</p>
                                    <p className="text-xl font-bold text-white">Hari</p>
                                </div>
                                <button
                                    onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all transform hover:scale-[1.02] active:scale-95 text-lg"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Workshop 2: Ethical Hacking */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-8 md:p-10 relative overflow-hidden text-center group hover:border-emerald-500/30 transition-all duration-500 flex flex-col h-full"
                >
                    <div className="absolute top-0 right-0 p-32 bg-emerald-600/10 blur-[80px] rounded-full group-hover:bg-emerald-600/20 transition-all" />
                    <div className="relative z-10 flex flex-col items-center gap-6 flex-grow">
                        <div className="flex items-center justify-center bg-black/20 rounded-xl p-6 group-hover:scale-110 transition-transform duration-500">
                            <Terminal size={60} className="text-emerald-400" />
                        </div>
                        <div className="w-full flex flex-col items-center flex-grow">
                            <h2 className="text-3xl font-bold mb-2 group-hover:text-emerald-300 transition-colors">Ethical Hacking Bootcamp</h2>
                            <p className="text-emerald-400 font-mono text-sm mb-4">Feb 12, 2026 • 02:00 PM - 05:00 PM</p>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                Master the art of cybersecurity. Learn penetration testing, vulnerability assessment, and network defense strategies.
                            </p>
                            <div className="mt-auto w-full flex flex-col items-center gap-4">
                                <div className="bg-white/5 inline-block px-6 py-2 rounded-xl border border-white/10">
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Contact</p>
                                    <p className="text-xl font-bold text-white">Hari</p>
                                </div>
                                <button
                                    onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:scale-[1.02] active:scale-95 text-lg"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Workshops;
