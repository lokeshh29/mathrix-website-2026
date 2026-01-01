import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Members = () => {
    const team = [
        {
            title: "PRESIDENT",
            members: [
                { name: "Sanjay S" }
            ]
        },
        // {
        //     title: "VICE PRESIDENT",
        //     members: [
        //         { name: "Pradeeshwaran M" }
        //     ]
        // },
        {
            title: "SECRETARIES",
            members: [
                { name: "Divya Dharshini B" },
                { name: "Hariharan T" }
            ]
        },
        {
            title: "Joint Secretaries",
            members: [
                // 2nd Years
                { name: "Kailash N" },
                { name: "Jeevika A" },
                { name: "Shesha N" },
                { name: "Santhoshini R" },
                // 3rd Years
                { name: "Yogashri R" },
                { name: "Varunessh S" },
                { name: "Edwin Joyel J S" },
                { name: "Irfana A" }
            ]
        },
        {
            title: "Assistant Secretaries",
            members: [
                { name: "Himasni A" },
                { name: "Kaviya M" },
                { name: "Udhayakesavan U" },
                { name: "Dhwaraka S N" }
            ]
        },
        {
            title: "Student Incharges",
            members: [
                { name: "Lokesh Kumar R", role: "Sponsorship" },
                { name: "Irfana A", role: "Registration" },
                { name: "Divya Dharshini B", role: "Marketing & Promotions" },
                { name: "Barath V", role: "Logistics" },
                { name: "Shesha N", role: "Workshop" },
                { name: "Varunessh S", role: "Prize & Certificates" },
                { name: "Kailash N", role: "Stage Arrangements" },
                { name: "Kaviya M", role: "Hospitality & Catering" },
                { name: "Edwin Joyel J S", role: "Social Media" },
                { name: "Gayathri M", role: "Designing" },
                { name: "Yogasri R", role: "Invitation" },
                { name: "Dhwaraka S N", role: "Reception" },
                { name: "Santhoshini R", role: "Decoration" },
                { name: "Nivetha", role: "Souvenir" },
                { name: "Himasni A", role: "Documentation" }
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 pb-32">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Meet The Team</h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    The driving force behind the Mathrix 2026.
                </p>
            </motion.div>

            <div className="flex flex-col gap-24">
                {team.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="relative">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-3xl font-bold mb-10 text-center text-pink-300 uppercase tracking-widest relative"
                        >
                            <span className="relative z-10 px-6 py-2 border-b border-pink-500/30 inline-block">
                                {section.title}
                            </span>
                        </motion.h2>

                        <div className="flex flex-wrap justify-center gap-8">
                            {section.members.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card group relative p-8 flex flex-col justify-center items-center w-full sm:w-80 md:w-72 hover:bg-white/5 border border-white/5 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 rounded-2xl shadow-lg"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-pink-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/10 transition-all duration-500" />
                                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{member.name}</h3>
                                    <p className="text-pink-400/80 font-medium text-sm tracking-wider uppercase relative z-10">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Members;
