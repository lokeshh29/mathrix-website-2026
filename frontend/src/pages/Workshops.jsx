import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';

const Workshops = () => {
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

            <div className="space-y-20">
                {/* Workshop 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-32 bg-rose-600/10 blur-[80px] rounded-full" />
                    <div className="relative z-10 flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3 flex items-center justify-center bg-black/20 rounded-xl p-8">
                            <Terminal size={80} className="text-rose-400" />
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold mb-4">Python for Scientific Computing</h2>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Learn how to leverage Python's powerful libraries like NumPy, SciPy, and Matplotlib to solve complex mathematical problems and visualize data.
                                Perfect for beginners and intermediate coders.
                            </p>
                            <ul className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-400">
                                <li className="flex items-center gap-2">✓ Hands-on Practice</li>
                                <li className="flex items-center gap-2">✓ Real-world Datasets</li>
                                <li className="flex items-center gap-2">✓ Certificate of Completion</li>
                                <li className="flex items-center gap-2">✓ Expert Mentorship</li>
                            </ul>
                            <button className="btn btn-primary">Register for Workshop</button>
                        </div>
                    </div>
                </motion.div>

                {/* Workshop 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute bottom-0 left-0 p-32 bg-pink-600/10 blur-[80px] rounded-full" />
                    <div className="relative z-10 flex flex-col md:flex-row-reverse gap-8">
                        <div className="md:w-1/3 flex items-center justify-center bg-black/20 rounded-xl p-8">
                            <Cpu size={80} className="text-pink-400" />
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold mb-4">AI & Neural Networks</h2>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Understand the mathematics behind Neural Networks. Build your own simple neural network from scratch without using high-level frameworks,
                                understanding the calculus of backpropagation.
                            </p>
                            <ul className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-400">
                                <li className="flex items-center gap-2">✓ Theory + Implementation</li>
                                <li className="flex items-center gap-2">✓ Build from Scratch</li>
                                <li className="flex items-center gap-2">✓ Project-based Learning</li>
                                <li className="flex items-center gap-2">✓ Future Roadmap</li>
                            </ul>
                            <button className="btn btn-primary">Register for Workshop</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Workshops;
