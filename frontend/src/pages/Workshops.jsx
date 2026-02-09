import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Brain } from 'lucide-react';

const Workshops = () => {
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc1gZyVo_x4sJa0nprc4GLYY6gXHFq5bVZHl0LRZafObaUS5g/viewform?usp=publish-editor";

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

            {/* Workshop - Quantum Computing */}
            <div className="flex justify-center max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 md:p-12 relative overflow-hidden text-center group hover:border-violet-500/30 transition-all duration-500 flex flex-col w-full"
                >
                    <div className="absolute top-0 right-0 p-40 bg-violet-600/10 blur-[100px] rounded-full group-hover:bg-violet-600/25 transition-all" />
                    <div className="absolute bottom-0 left-0 p-32 bg-purple-600/10 blur-[80px] rounded-full group-hover:bg-purple-600/20 transition-all" />
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <div className="flex items-center justify-center bg-gradient-to-br from-violet-900/40 to-purple-900/40 rounded-2xl p-8 group-hover:scale-110 transition-transform duration-500 border border-violet-500/20">
                            <Cpu size={70} className="text-violet-400" />
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <h2 className="text-4xl font-bold mb-3 group-hover:text-violet-300 transition-colors bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                                Quantum Computing
                            </h2>
                            <p className="text-violet-400 font-mono text-sm mb-6">Happening on Feb 14 2026</p>
                            <p className="text-gray-300 mb-6 leading-relaxed text-lg max-w-xl">
                                Step into the revolutionary world of <span className="text-violet-300 font-semibold">Quantum Computing</span> — where the laws of quantum mechanics meet cutting-edge technology!
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed max-w-xl">
                                Discover the mind-bending concepts of <span className="text-purple-300">qubits</span>, <span className="text-purple-300">superposition</span>, and <span className="text-purple-300">quantum entanglement</span>. Learn how quantum algorithms are poised to solve problems that would take classical computers millions of years. From cryptography to drug discovery, quantum computing is reshaping the future — and this workshop is your gateway to understanding it all!
                            </p>
                            <div className="mt-auto w-full flex flex-col items-center gap-5">
                                <div className="bg-white/5 inline-block px-8 py-3 rounded-xl border border-violet-500/20">
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Contact</p>
                                    <p className="text-xl font-bold text-white">mathrix.ceg@gmail.com</p>
                                </div>
                                <button
                                    onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                                    className="w-full max-w-md px-10 py-5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all transform hover:scale-[1.02] active:scale-95 text-lg"
                                >
                                    🚀 Register Now
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
