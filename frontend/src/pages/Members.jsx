import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Members = () => {
    const members = [
        { name: 'Sanjay', role: 'President' },
        { name: 'Hari', role: 'General Secretary' },
        { name: 'Divya Dharshini', role: 'General Secretary' },
        { name: 'Gayathri', role: 'Design Team Lead' },
        { name: 'Lokesh', role: 'Sponsorship & Web Team Lead' },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Meet The Team</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    The brilliant minds working behind the scenes to make Mathrix 2026 a reality.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card group relative overflow-hidden text-center p-8 flex flex-col justify-center items-center min-h-[150px] hover:bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                        <p className="text-purple-400 font-medium tracking-wide">{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Members;
