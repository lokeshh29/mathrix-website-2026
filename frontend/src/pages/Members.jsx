import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Members = () => {
    const members = [
        { name: 'Alex Johnson', role: 'President', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Sarah Lee', role: 'Vice President', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Michael Chen', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Emily Davis', role: 'Event Coordinator', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'David Kim', role: 'Design Lead', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Jessica Brown', role: 'Content Head', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
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
                        className="glass-card group relative overflow-hidden text-center p-6"
                    >
                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-purple-500/20 group-hover:ring-purple-500 transition-all">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="text-purple-400 text-sm mb-4">{member.role}</p>

                        <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                            <button className="p-2 bg-white/5 rounded-full hover:bg-white/20 hover:text-purple-400 transition-colors"><Github size={18} /></button>
                            <button className="p-2 bg-white/5 rounded-full hover:bg-white/20 hover:text-blue-400 transition-colors"><Linkedin size={18} /></button>
                            <button className="p-2 bg-white/5 rounded-full hover:bg-white/20 hover:text-red-400 transition-colors"><Mail size={18} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Members;
