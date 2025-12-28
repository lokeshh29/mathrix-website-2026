import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, Info, Users, Trophy, FileText, CheckCircle } from 'lucide-react';

const eventsData = [
    {
        id: 1,
        title: 'Paper Presentation',
        description: 'A platform to present your innovative technical papers and research ideas. Showcase your knowledge, communication, and problem-solving skills.',
        details: {
            description: 'A platform to present your innovative technical papers and research ideas. Showcase your knowledge, communication, and problem-solving skills in front of experts and peers.',
            rounds: [
                { title: 'Single Round', desc: 'Oral Presentation using PowerPoint (max 10 slides). Duration: 8 minutes presentation + 2 minutes Q&A.' }
            ],
            rules: [
                'Topic is chosen by the judging company (e.g., AI, IoT, Robotics, Cybersecurity).',
                'Presentation should be original and not copied.',
                'Each team must bring a soft copy (PPT/PDF).',
                'Plagiarism will lead to disqualification.',
                'Participants must report 30 minutes before the event.'
            ],
            teamSize: 'Individual or Team of 2',
            judging: 'Originality, Relevance, Clarity, Technical Depth, Q&A.',
            prize: 'Certificates for all participants.',
            coordinator: 'Kesavarthini J (9361733387)'
        },
        date: 'February 21, 2026',
        time: 'TBA',
        location: 'TBA',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1470&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Algo Maze',
        description: 'A logic-intensive competitive event focusing on mathematical reasoning, algorithmic thinking, and decision-making skills.',
        details: {
            description: 'Algo Maze is a logic-intensive competitive event that challenges participants to think beyond formulas and code. It focuses on mathematical reasoning, algorithmic thinking, and decision-making skills through twisted logic problems.',
            rounds: [
                { title: 'Round 1 (30 mins)', desc: 'MCQs covering twisted logic, mathematics, and algorithms.' },
                { title: 'Round 2 (40 mins)', desc: 'Scenario-based questions and algorithm/math decision-making challenges.' }
            ],
            rules: [
                'Winner selected based on highest score with correct reasoning.',
                'Emphasis on optimal and logical decisions.'
            ],
            teamSize: 'Individual Participation',
            judging: 'Accuracy, Logical reasoning, Performance in decision-making.',
            prize: 'Cash Prize + Certificates.',
            coordinator: 'Barath V (8489573989)'
        },
        date: 'February 21, 2026',
        time: 'TBA',
        location: 'Offline',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1470&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'SQL – Query Quest',
        description: 'Assess your knowledge in Structured Query Language (SQL), focusing on logical thinking and real-time problem-solving.',
        details: {
            description: 'SQL – Query Quest is a technical event designed to assess participants’ knowledge and practical skills in SQL, focusing on logical thinking and real-time problem-solving.',
            rounds: [
                { title: 'Round 1: Prelims (15-20 mins)', desc: '15 MCQs on SQL basics, DDL/DML, Aggregates, Joins. Selection based on score/time.' },
                { title: 'Round 2: Finals (30 mins)', desc: 'Execution of 8-10 SQL queries on a provided dataset. Evaluated on correctness and logic.' },
                { title: 'Tie-Breaker: Rapid Fire (5 mins)', desc: 'Verbal prediction of query outputs.' }
            ],
            rules: [
                'Individual participation only.',
                'College ID card is mandatory.',
                'Malpractice leads to disqualification.'
            ],
            teamSize: 'Individual',
            judging: 'Correctness, Time Efficiency, Logic.',
            prize: '1st, 2nd, 3rd Prizes + Certificates.',
            coordinator: 'Menaka RM (8608605321)'
        },
        date: 'February 21, 2026',
        time: 'TBA',
        location: 'Lab',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Design Event',
        description: 'Unleash your creativity in this non-technical design challenge. Perfect for those with an eye for aesthetics.',
        details: {
            description: 'Unleash your creativity in this non-technical design challenge. Perfect for those with an eye for aesthetics and user experience. (Company details TBA).',
            rounds: [],
            rules: [
                'Company yet to decide.'
            ],
            teamSize: 'Individual or Team of 2',
            judging: 'Decided by the Company.',
            prize: 'Certificates for all participants.',
            coordinator: 'Pooja Nandhini C (8610061231)'
        },
        date: 'February 21, 2026',
        time: 'TBA',
        location: 'TBA',
        category: 'Non Technical',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1400&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'Code Mathrix',
        description: 'Decode. Divide. Conquer. A collaborative coding challenge with strict turn-based coding and isolation rules.',
        details: {
            description: 'Code Mathrix is a collaborative coding challenge that tests logical thinking, coordination, and problem-solving under pressure. Teams work on split problem statements with strict turn-based coding.',
            rounds: [
                { title: 'Round 1 (30 mins)', desc: 'Logic-based MCQs + dry-run coding questions.' },
                { title: 'Round 2 (40 mins)', desc: 'Live Coding Challenge with Turn-based rule (10 mins swap) and Isolation rule.' }
            ],
            rules: [
                'Teams of 2 members.',
                'Problem split into two parts.',
                'Turn-based: Player 1 codes 10 mins, then Player 2.',
                'Isolation: Non-coding player cannot view screen or assist.'
            ],
            teamSize: '2 Members per Team',
            judging: 'Logic, Execution, Time, Continuity.',
            prize: 'Certificates.',
            coordinator: 'Kishore S (8072651532)'
        },
        date: 'February 21, 2026',
        time: 'TBA',
        location: 'Lab',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop'
    },
    {
        id: 6,
        title: 'Treasure Hunt',
        description: 'An exploration-based team event blending logic, observation, and teamwork. Follow clues, solve riddles, and uncover the final treasure.',
        details: {
            description: 'The Treasure Hunt is an exploration-based team event that blends logic, observation, teamwork, and quick decision-making. Participants follow clues, solve riddles, and navigate through checkpoints to uncover the final treasure.',
            rounds: [
                { title: 'Round 1: Prelims (20 mins)', desc: 'Aptitude questions. Top 5 teams chosen.' },
                { title: 'Round 2: The Final Trail (1 hour)', desc: 'Logical puzzles and location-based challenges. Piece together clues to reach the final treasure.' }
            ],
            rules: [
                'Team Size: 2-3 members per team.',
                'Mobile phones strictly prohibited unless specified.',
                'Teams must stay within the designated hunt area.',
                'Clues must not be shared with other teams.',
                'Do not tamper with or remove clues from checkpoints.'
            ],
            teamSize: '2-3 Members per Team',
            judging: 'Speed, Strategy, Accuracy, Coordination.',
            prize: '1st, 2nd, 3rd Prizes.',
            coordinator: 'Subramanian N (9840623264)'
        },
        date: 'February 21, 2026',
        time: 'TBA',
        location: 'Offline',
        category: 'Non Technical',
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1470&auto=format&fit=crop'
    }
];

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <div className="container mx-auto px-4 py-32">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-32 text-center relative z-10"
            >
                Upcoming Events
            </motion.h1>

            {/* Events Grid */}
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-wrap justify-center gap-8">
                    {eventsData.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedEvent(event)}
                            className="glass-card overflow-hidden group hover:border-purple-500/50 cursor-pointer w-full md:w-[45%] lg:w-[30%]"
                        >
                            <div className="h-48 overflow-hidden relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent z-10" />
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <span className="absolute top-4 right-4 z-20 bg-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                                    {event.category}
                                </span>
                            </div>

                            <div className="p-6 relative z-20 -mt-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{event.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{event.description}</p>

                                <div className="flex flex-col gap-2 text-sm text-gray-300 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-purple-400" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-green-400" />
                                        <span>{event.details.coordinator.split('-')[0]}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedEvent(event)}
                                    className="w-full mt-6 btn btn-outline group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white transition-all flex items-center justify-center gap-2"
                                >
                                    <Info size={18} />
                                    View Details & Register
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Event Details Modal */}
                <AnimatePresence>
                    {selectedEvent && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 mt-10 md:mt-20">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedEvent(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative bg-[#0f0518] border border-purple-500/30 w-full max-w-5xl max-h-[75vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto"
                            >
                                {/* Fixed Close Button - High Z-Index & Contrast */}
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="absolute top-4 right-4 z-[9999] p-2 bg-white text-black hover:bg-gray-200 rounded-full transition-colors shadow-xl border-2 border-purple-500"
                                >
                                    <X size={24} strokeWidth={3} />
                                </button>

                                {/* Scrollable Content */}
                                <div className="overflow-y-auto flex-1 scrollbar-hide">
                                    {/* Modal Header Image */}
                                    <div className="h-64 relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] to-transparent z-10" />
                                        <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />

                                        <div className="absolute bottom-6 left-6 z-20">
                                            <span className="bg-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg mb-2 inline-block">
                                                {selectedEvent.category}
                                            </span>
                                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                                        </div>
                                    </div>

                                    {/* Modal Content Body */}
                                    <div className="p-8 space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="col-span-2 space-y-6">
                                                <section>
                                                    <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                                                        <FileText size={20} /> Description
                                                    </h3>
                                                    <p className="text-gray-300 leading-relaxed text-lg">{selectedEvent.details.description}</p>
                                                </section>

                                                {selectedEvent.details.rounds.length > 0 && (
                                                    <section>
                                                        <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                                                            <CheckCircle size={20} /> Rounds
                                                        </h3>
                                                        <div className="space-y-4">
                                                            {selectedEvent.details.rounds.map((round, idx) => (
                                                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                                    <h4 className="font-bold text-white mb-1">{round.title}</h4>
                                                                    <p className="text-gray-400 text-sm">{round.desc}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {selectedEvent.details.rules.length > 0 && (
                                                    <section>
                                                        <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                                                            <Info size={20} /> Rules & Guidelines
                                                        </h3>
                                                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                                                            {selectedEvent.details.rules.map((rule, idx) => (
                                                                <li key={idx} className="marker:text-purple-500">{rule}</li>
                                                            ))}
                                                        </ul>
                                                    </section>
                                                )}
                                            </div>

                                            {/* Sidebar Info */}
                                            <div className="space-y-6">
                                                <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
                                                    <div className="flex items-start gap-4">
                                                        <Users className="text-pink-400 mt-1" size={20} />
                                                        <div>
                                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Team Size</h4>
                                                            <p className="text-white font-medium">{selectedEvent.details.teamSize}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4">
                                                        <Trophy className="text-yellow-400 mt-1" size={20} />
                                                        <div>
                                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Prize Pool</h4>
                                                            <p className="text-white font-medium">{selectedEvent.details.prize}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4">
                                                        <Users className="text-green-400 mt-1" size={20} />
                                                        <div>
                                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Coordinator</h4>
                                                            <p className="text-white font-medium">{selectedEvent.details.coordinator}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button className="w-full py-4 btn btn-primary text-xl font-bold shadow-lg shadow-purple-500/20">
                                                    Register Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Events;
