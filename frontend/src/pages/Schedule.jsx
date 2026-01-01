import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Star, Zap, Code, Terminal, Brain, Coffee, Trophy, Lightbulb } from 'lucide-react';

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
            time: "09:00 AM",
            title: "Inauguration Ceremony",
            category: "General",
            location: "Vivek Auditorium",
            icon: Star,
            description: "Opening remarks and lighting of the lamp."
        },
        {
            time: "10:00 AM",
            title: "Paper Presentation",
            category: "Technical",
            location: "Laboratory - Department of Mathematics",
            icon: Code,
            description: "Showcase your research and technical papers."
        },
        {
            time: "10:00 AM",
            title: "Design Event",
            category: "Non-technical",
            location: "Laboratory - Department of Mathematics",
            icon: Zap,
            description: "Unleash your creativity in this non-technical design challenge."
        },
        {
            time: "11:30 AM",
            title: "Code Mathrix",
            category: "Technical",
            location: "Laboratory - Department of Mathematics",
            icon: Terminal,
            description: "Competitive coding marathon."
        },
        {
            time: "01:00 PM",
            title: "Lunch Break",
            category: "Break",
            location: "Main Auditorium",
            icon: Coffee,
            description: "Refresh and recharge."
        },
        {
            time: "02:00 PM",
            title: "Treasure Hunt",
            category: "Non-Technical",
            location: "Campus Wide",
            icon: MapPin,
            description: "Solve riddles and find the hidden treasure."
        },
        {
            time: "02:00 PM",
            title: "Math Quiz",
            category: "Technical",
            location: "Classroom Block",
            icon: Brain,
            description: "Test your mathematical prowess."
        },
        {
            time: "03:00 PM",
            title: "Mathkinator",
            category: "Technical",
            location: "Classroom Block",
            icon: Lightbulb,
            description: "Interactive guessing game inspired by Akinator."
        },
        {
            time: "04:30 PM",
            title: "Valedictory & Prize Distribution",
            category: "General",
            location: "Main Auditorium",
            icon: Trophy,
            description: "Awarding the winners and closing ceremony."
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

                {/* --- Section 1: Workshops --- */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-12"
                    >
                        <div className="h-12 w-2 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-full"></div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Pre-Event Workshops</h2>
                            <p className="text-cyan-400">February 2nd Week</p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {workshopSchedule.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className={`glass-card p-8 rounded-2xl border ${item.border} ${item.bg} hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group`}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <item.icon size={100} />
                                </div>

                                <div className="relative z-10">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-4 ${item.color} ${item.border} bg-black/20`}>
                                        <Calendar size={12} /> {item.date}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                    <div className="space-y-2 text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className={item.color} />
                                            {item.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className={item.color} />
                                            {item.location}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- Section 2: Main Event --- */}
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
                                            {event.time.split(' ')[0]}
                                        </div>
                                        <div className={`text-sm tracking-widest uppercase font-bold text-purple-400`}>
                                            {event.time.split(' ')[1]}
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
                                                <div className={`flex items-center gap-4 text-xs font-mono text-gray-500 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                                                    <span className={`px-2 py-0.5 rounded ${event.category === 'Break' ? 'bg-orange-500/10 text-orange-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                                        {event.category}
                                                    </span>
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
