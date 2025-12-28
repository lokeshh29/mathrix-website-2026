import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Members = () => {
    const team = [
        {
            title: "Chairperson",
            members: [
                { name: "Sanjay S", role: "2nd MSc Maths" }
            ]
        },
        {
            title: "Vice Chairperson",
            members: [
                { name: "Pradeeshwaran", role: "5th MSc CS/IT" }
            ]
        },
        {
            title: "Secretaries",
            members: [
                { name: "Divya Dharshini", role: "4th MSc CS/IT" },
                { name: "Hariharan", role: "4th MSc CS/IT" }
            ]
        },
        {
            title: "Joint Secretaries",
            members: [
                // 2nd Years
                { name: "Kailash", role: "2nd Year MSc CS/IT" },
                { name: "Jeevika", role: "2nd Year MSc CS/IT" },
                { name: "Shesha", role: "2nd Year MSc CS/IT" },
                { name: "Santhoshini", role: "2nd Year MSc CS/IT" },
                // 3rd Years
                { name: "Yogashri", role: "3rd Year MSc CS/IT" },
                { name: "Varunesh", role: "3rd Year MSc CS/IT" },
                { name: "Edwin Joyel", role: "3rd Year MSc CS/IT" },
                { name: "Irfana", role: "3rd Year MSc CS/IT" }
            ]
        },
        {
            title: "Assistant Secretaries",
            members: [
                { name: "Himasni", role: "1st MSc Maths" },
                { name: "Kaviya M", role: "1st MSc Maths" },
                { name: "Udhaya Kesavan", role: "1st MSc CS/IT" },
                { name: "Dhwaraka", role: "1st MSc CS/IT" }
            ]
        },
        {
            title: "Student Incharges",
            members: [
                { name: "Kailash", role: "Stage Arrangements" },
                { name: "Divya Dharshini", role: "Marketing & Promotions" },
                { name: "Yogasri", role: "Invitation" },
                { name: "Irfana", role: "Registration" },
                { name: "Varunesh", role: "Prize & Certificates" },
                { name: "Kaviya", role: "Hospitality & Catering" },
                { name: "Dhwaraka", role: "Reception" },
                { name: "Nivetha", role: "Souvenir" },
                { name: "Shesha", role: "Workshop" },
                { name: "Santhoshini", role: "Decoration" },
                { name: "Edwin Joyel", role: "Social Media" },
                { name: "Gayathri", role: "Designing" },
                { name: "Lokesh Kumar R", role: "Sponsorship" },
                { name: "Barath", role: "Logistics" },
                { name: "Himasni", role: "Documentation" }
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
                    The driving force behind Mathrix 2026.
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
