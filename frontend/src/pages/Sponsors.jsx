import React from 'react';
import { motion } from 'framer-motion';

const sponsors = [
    { name: 'TechGiant', tier: 'Platinum', logo: 'https://via.placeholder.com/300x100?text=TechGiant' },
    { name: 'InnovateCorp', tier: 'Platinum', logo: 'https://via.placeholder.com/300x100?text=InnovateCorp' },
    { name: 'DevStudio', tier: 'Gold', logo: 'https://via.placeholder.com/250x80?text=DevStudio' },
    { name: 'CodeMasters', tier: 'Gold', logo: 'https://via.placeholder.com/250x80?text=CodeMasters' },
    { name: 'FutureSystems', tier: 'Gold', logo: 'https://via.placeholder.com/250x80?text=FutureSystems' },
    { name: 'ByteWorks', tier: 'Silver', logo: 'https://via.placeholder.com/200x60?text=ByteWorks' },
    { name: 'DataFlow', tier: 'Silver', logo: 'https://via.placeholder.com/200x60?text=DataFlow' },
    { name: 'NetSolutions', tier: 'Silver', logo: 'https://via.placeholder.com/200x60?text=NetSolutions' },
    { name: 'CloudNine', tier: 'Silver', logo: 'https://via.placeholder.com/200x60?text=CloudNine' },
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

            {/* Platinum Tier */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-cyan-400 mb-8 uppercase tracking-widest flex items-center justify-center gap-4">
                    <span className="h-px w-10 bg-cyan-400/50"></span>
                    Platinum Sponsors
                    <span className="h-px w-10 bg-cyan-400/50"></span>
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {sponsors.filter(s => s.tier === 'Platinum').map((sponsor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 w-80 h-40 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border-cyan-500/30"
                        >
                            <span className="text-2xl font-bold text-white">{sponsor.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Gold Tier */}
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-yellow-400 mb-8 uppercase tracking-widest flex items-center justify-center gap-4">
                    <span className="h-px w-10 bg-yellow-400/50"></span>
                    Gold Sponsors
                    <span className="h-px w-10 bg-yellow-400/50"></span>
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {sponsors.filter(s => s.tier === 'Gold').map((sponsor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-6 w-64 h-32 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border-yellow-500/30"
                        >
                            <span className="text-xl font-bold text-white">{sponsor.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Silver Tier */}
            <div>
                <h2 className="text-xl font-bold text-gray-300 mb-8 uppercase tracking-widest flex items-center justify-center gap-4">
                    <span className="h-px w-10 bg-gray-400/50"></span>
                    Silver Sponsors
                    <span className="h-px w-10 bg-gray-400/50"></span>
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {sponsors.filter(s => s.tier === 'Silver').map((sponsor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-4 w-48 h-24 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border-gray-500/30"
                        >
                            <span className="text-lg font-medium text-white">{sponsor.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sponsors;
