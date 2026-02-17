import React from 'react';
import { motion } from 'framer-motion';

// Import Logos
import aeccLogo from '../assets/aecc_logo.jpeg';
import radiolinqLogo from '../assets/Radiolinq Logo.png';
// import vertexLogo from '../assets/Vertex Logo.jpg.jpeg'; // File extension double check needed
import vertexLogo from '../assets/Vertex Logo.jpg.jpeg';
import dsnlLogo from '../assets/dsnl.jpeg';
import dynarchLogo from '../assets/dynarch_logo.jpeg';
import agentsFactoryLogo from '../assets/agents_factory_logo.png.jpeg';
import rajamsLogo from '../assets/Rajams.png';
import eliteLogo from '../assets/elite_logo.jpeg';
import topperfyLogo from '../assets/topperfy ai logo.jpeg';
import spaceAirLogo from '../assets/space_air logo.jpeg';

const sponsorCategories = [
    { title: 'TITLE SPONSOR', color: 'text-purple-400', border: 'border-purple-500/30', sponsors: [] },
    { title: 'CO SPONSOR', color: 'text-indigo-400', border: 'border-indigo-500/30', sponsors: [] },
    { title: 'ASSOCIATE SPONSOR', color: 'text-blue-400', border: 'border-blue-500/30', sponsors: [] },
    { title: 'POWERED BY SPONSOR', color: 'text-cyan-400', border: 'border-cyan-500/30', sponsors: [] },
    {
        title: 'APPAREL',
        color: 'text-pink-400',
        border: 'border-pink-500/30',
        sponsors: [
            { name: 'Topperfyai', logo: topperfyLogo, link: '#' },
            { name: 'Space Air', logo: spaceAirLogo, link: '#' }
        ]
    },
    { title: 'PRIZE', color: 'text-yellow-400', border: 'border-yellow-500/30', sponsors: [] },
    { title: 'WORKSHOP', color: 'text-orange-400', border: 'border-orange-500/30', sponsors: [] },
    {
        title: 'TECHNOLOGY',
        color: 'text-emerald-400',
        border: 'border-emerald-500/30',
        sponsors: [
            { name: 'AECC Study Abroad', logo: aeccLogo, link: '#' },
            { name: 'Radiolinq', logo: radiolinqLogo, link: '#' },
            { name: 'Vertex', logo: vertexLogo, link: '#' },
            { name: 'Door Sabha Nigam limited', logo: dsnlLogo, link: '#' }
        ]
    },
    { title: 'GUEST LECTURERS', color: 'text-teal-400', border: 'border-teal-500/30', sponsors: [] },
    { title: 'GIFTING/MEMENTO', color: 'text-rose-400', border: 'border-rose-500/30', sponsors: [] },
    {
        title: 'EVENT',
        color: 'text-green-400',
        border: 'border-green-500/30',
        sponsors: [
            { name: 'Agents Factory', logo: agentsFactoryLogo, link: '#' },
            { name: 'Dynarch Studio', logo: dynarchLogo, link: '#' }
        ]
    },
    { title: 'COUPON/KIT', color: 'text-lime-400', border: 'border-lime-500/30', sponsors: [] },
    { title: 'BEVERAGES', color: 'text-amber-400', border: 'border-amber-500/30', sponsors: [] },
    {
        title: 'PRINTING',
        color: 'text-slate-400',
        border: 'border-slate-500/30',
        sponsors: [
            { name: 'Rajams Digital Offset Prints', logo: rajamsLogo, link: '#' }
        ]
    },
    {
        title: 'BANNER PARTNER',
        color: 'text-fuchsia-400',
        border: 'border-fuchsia-500/30',
        sponsors: [
            { name: 'Elite Flex Print', logo: eliteLogo, link: '#' }
        ]
    },
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
                {sponsorCategories.filter(cat => cat.sponsors.length > 0).map((category, index) => (
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
                            {category.sponsors && category.sponsors.length > 0 ? (
                                category.sponsors.map((sponsor, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={sponsor.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        className={`glass-card p-4 w-80 h-48 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border ${category.border} border-opacity-30 group`}
                                    >
                                        {sponsor.logo ? (
                                            <div className="w-full h-32 flex items-center justify-center mb-2 overflow-hidden rounded-lg bg-white/90 p-2">
                                                <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
                                            </div>
                                        ) : (
                                            <div className="w-full h-32 flex items-center justify-center mb-2 bg-white/5 rounded-lg border border-white/10">
                                                <span className="text-gray-500 text-sm">Logo Coming Soon</span>
                                            </div>
                                        )}
                                        <span className={`text-lg font-bold ${category.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}>{sponsor.name}</span>
                                    </motion.a>
                                ))
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className={`glass-card p-8 w-80 h-40 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border ${category.border} border-opacity-30`}
                                >
                                    <span className="text-lg font-medium text-gray-500 italic">Coming Soon</span>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Sponsors;
