import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Star, Zap, Code, Terminal, Brain, Coffee, Trophy, Lightbulb, Database, Sparkles, Camera, Users } from 'lucide-react';

const Schedule = () => {
    const workshopSchedule = [
        {
            date: "Feb 10, 2026",
            day: "Tuesday",
            title: "Generative AI Workshop",
            time: "10:00 AM - 01:00 PM",
            location: "RCC",
            icon: Brain,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20"
        },
        {
            date: "Feb 12, 2026",
            day: "Thursday",
            title: "Ethical Hacking Bootcamp",
            time: "02:00 PM - 05:00 PM",
            location: "RCC",
            icon: Terminal,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        }
    ];

    const eventSchedule = [
        {
            time: "10:30 AM – 11:00 AM",
            title: "Query Quest (Session 1)",
            category: "Technical",
            location: "LH-6",
            icon: Database,
            description: "Round 1: MCQ on SQL basics.",
            coordinator: "RM Menaka, Madhumitha V"
        },
        {
            time: "10:30 AM – 11:15 AM",
            title: "MagicMatix (Session 1)",
            category: "General",
            location: "LH-1",
            icon: Sparkles,
            description: "Round 1: Number Crossword.",
            coordinator: "Sundhar Balamoorthy, Adithya B"
        },
        {
            time: "10:40 AM – 12:15 PM",
            title: "Treasure Hunt",
            category: "Math",
            location: "LH-48",
            icon: MapPin,
            description: "Find The Fixed Points - Exploration based event.",
            coordinator: "Saathvika"
        },
        {
            time: "Deadline: 19th Feb 6:00 PM",
            title: "Through the Lens",
            category: "Non Technical",
            location: "Online",
            icon: Camera,
            description: "Online photography submission.",
            coordinator: "Event Coordinator (TBA)"
        },
        {
            time: "11:00 AM – 12:30 PM",
            title: "Code Mathrix",
            category: "Technical",
            location: "Mathematics Dept Lab",
            icon: Terminal,
            description: "Collaborative coding marathon.",
            coordinator: "Kishore"
        },
        {
            time: "11:00 AM – 1:00 PM",
            title: "IPL Auction",
            category: "Non Technical",
            location: "LH-5",
            icon: Trophy,
            description: "The Ultimate Bidding War.",
            coordinator: "Siva Sudharsan S, Sankara Shivani C A"
        },
        {
            time: "11:20 AM – 1:00 PM",
            title: "Paper Presentation",
            category: "General",
            location: "Ramanujan Hall",
            icon: Code,
            description: "Research and innovation showcase.",
            coordinator: "Kesavarthini J, Jeysri G S"
        },
        {
            time: "11:30 AM – 1:00 PM",
            title: "Mathkinator",
            category: "Non Technical",
            location: "LH-2",
            icon: Lightbulb,
            description: "Interactive guessing game.",
            coordinator: "Madhan M"
        },
        {
            time: "11:45 AM – 12:40 PM",
            title: "Math Quiz (Session 1)",
            category: "Math (MCQ)",
            location: "Drawing Hall",
            icon: Brain,
            description: "Prelims: Written MCQ test.",
            coordinator: "Safrin S"
        },
        {
            time: "12:00 PM – 1:00 PM",
            title: "Chess",
            category: "Non Technical",
            location: "Online + Drawing Hall-13",
            icon: Star,
            description: "GoofyChess: Racing Kings & Crazyhouse.",
            coordinator: "Bathmasree R, Nandha kishore R R"
        },
        {
            time: "12:00 PM – 1:00 PM",
            title: "Query Quest (Session 2)",
            category: "Technical",
            location: "RCC Lab",
            icon: Database,
            description: "Round 2: SQL Execution on real datasets.",
            coordinator: "RM Menaka, Madhumitha V"
        },
        {
            time: "12:00 PM – 1:00 PM",
            title: "MagicMatix (Session 2)",
            category: "General",
            location: "LH-1",
            icon: Sparkles,
            description: "Round 2: Acronym Crossword.",
            coordinator: "Sundhar Balamoorthy, Adithya B"
        },
        {
            time: "2:00 PM – 3:00 PM",
            title: "Math Quiz (Session 2)",
            category: "Math",
            location: "Vivek Audi",
            icon: Brain,
            description: "Mains: Finals and Buzzer rounds.",
            coordinator: "Safrin S"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                        Event Timeline
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        A curated journey through knowledge, innovation, and fun.
                    </p>
                </motion.div>

                {/* --- Section 1: Main Event --- */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-12"
                    >
                        <div className="h-12 w-2 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">The Main Event</h2>
                            <p className="text-purple-400">February 20, 2026</p>
                        </div>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Timeline Spine */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-pink-500/20 to-transparent"></div>

                        {eventSchedule.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex items-center gap-8 mb-12 md:mb-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse text-right'}`}
                                >
                                    {/* Time Card (Desktop only - alternates) */}
                                    <div className={`hidden md:flex w-1/2 flex-col justify-center ${isEven ? 'text-right items-end pr-12' : 'text-left items-start pl-12'}`}>
                                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20">
                                            {event.time.split(' – ')[0]}
                                        </div>
                                        <div className={`text-sm tracking-widest uppercase font-bold text-purple-400`}>
                                            {event.time.split(' – ')[1]}
                                        </div>
                                    </div>

                                    {/* Center Node */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.6)] border-4 border-[#0a0a1a] z-10 flex-shrink-0"></div>

                                    {/* Event Card */}
                                    <div className="flex-1 ml-12 md:ml-0 md:w-1/2">
                                        <div className={`glass-card p-6 border-l-4 ${isEven ? 'border-l-purple-500' : 'md:border-l-0 md:border-r-4 md:border-r-pink-500 border-l-purple-500'} hover:bg-white/5 transition-all group`}>
                                            <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                                {/* Mobile Time */}
                                                <span className="md:hidden text-purple-400 font-bold mb-2 block">{event.time}</span>

                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{event.title}</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                                    {event.description}
                                                </p>
                                                <div className={`flex flex-col gap-2 text-xs font-mono text-gray-500 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                                                        <span className={`px-2 py-0.5 rounded ${event.category === 'Break' ? 'bg-orange-500/10 text-orange-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                                            {event.category}
                                                        </span>
                                                    </div>
                                                    {event.coordinator && (
                                                        <span className="text-gray-600 flex items-center gap-1">
                                                            <Users size={12} /> {event.coordinator}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
