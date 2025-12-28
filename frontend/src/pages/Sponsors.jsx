import React from 'react';
import { motion } from 'framer-motion';

const sponsorCategories = [
    { title: 'TITLE SPONSOR', color: 'text-purple-400', border: 'border-purple-500/30' },
    { title: 'CO SPONSOR', color: 'text-indigo-400', border: 'border-indigo-500/30' },
    { title: 'ASSOCIATE SPONSOR', color: 'text-blue-400', border: 'border-blue-500/30' },
    { title: 'POWERED BY SPONSOR', color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { title: 'APPAREL', color: 'text-pink-400', border: 'border-pink-500/30' },
    { title: 'PRIZE', color: 'text-yellow-400', border: 'border-yellow-500/30' },
    { title: 'WORKSHOP', color: 'text-orange-400', border: 'border-orange-500/30' },
    { title: 'TECHNOLOGY', color: 'text-emerald-400', border: 'border-emerald-500/30' },
    { title: 'GUEST LECTURERS', color: 'text-teal-400', border: 'border-teal-500/30' },
    { title: 'GIFTING/MEMENTO', color: 'text-rose-400', border: 'border-rose-500/30' },
    { title: 'EVENT', color: 'text-green-400', border: 'border-green-500/30' },
    { title: 'COUPON/KIT', color: 'text-lime-400', border: 'border-lime-500/30' },
    { title: 'BEVERAGES', color: 'text-amber-400', border: 'border-amber-500/30' },
    { title: 'PRINTING/LOGISTICS', color: 'text-slate-400', border: 'border-slate-500/30' },
];

const Sponsors = () => {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-4"
            >
                Our Sponsors
            </motion.h1>
            <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
                We are proud to be supported by industry leaders who believe in the power of mathematics and technology.
            </p>

            <div className="space-y-16">
                {sponsorCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <h2 className={`text-2xl font-bold mb-8 uppercase tracking-widest flex items-center justify-center gap-4 ${category.color}`}>
                            <span className={`h-px w-10 bg-current opacity-50`}></span>
                            {category.title}
                            <span className={`h-px w-10 bg-current opacity-50`}></span>
                        </h2>

                        <div className="flex flex-wrap justify-center gap-8">
                            {/* Placeholder for future Company Names */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={`glass-card p-8 w-80 h-40 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border ${category.border} border-opacity-30`}
                            >
                                <span className="text-lg font-medium text-gray-500 italic">Coming Soon</span>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Sponsors;
