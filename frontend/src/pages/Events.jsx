import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, Info, Users, Trophy, FileText, CheckCircle, Terminal, Brain, Database, Palette, Compass, Projector, Sparkles, Sigma, Lightbulb } from 'lucide-react';

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/1qBAEEEM24j9_MJxfSXcaylG4ttRAobLJwMItSqMNaXA/edit?usp=forms_home&ouid=114183402363803052568&ths=true";

    const eventList = [
        {
            id: 1,
            title: 'PAPER PRESENTATION',
            description: 'A platform to present your innovative technical papers and research ideas. Showcase your knowledge, communication, and problem-solving skills.',
            details: {
                description: 'A platform to present your innovative technical papers and research ideas. Showcase your knowledge, communication, and problem-solving skills in front of experts and peers.',
                rounds: [
                    { title: 'Single Round', desc: 'Oral Presentation using PowerPoint (max 10 slides). Duration: 8 minutes presentation + 2 minutes Q&A.' }
                ],
                rules: [
                    'Topic is chosen by the judging company (e.g., AI, IoT, Robotics, Cybersecurity).',
                    'Presentation should be original and not copied from published work.',
                    'Each team must bring a soft copy of the presentation (PPT/PDF).',
                    'Plagiarism will lead to disqualification.',
                    'Participants must report 30 minutes before the event starts.'
                ],
                teamSize: 'Individual or Team of 2',
                judging: 'Originality & innovation, Relevance to domain, Presentation clarity & structure, Technical depth, Q&A handling.',
                prize: '1st Prize, 2nd Prize, Certificates for all participants.',
                coordinator: 'Kesavarthini J (9361733387)'
            },
            date: 'February 20, 2026',
            time: '10:00 AM',
            location: 'Auditorium',
            category: 'Technical',
            icon: Projector,
            color: 'text-blue-400'
        },
        {
            id: 2,
            title: 'ALGO MAZE',
            description: 'A logic-intensive competitive event focusing on mathematical reasoning, algorithmic thinking, and decision-making skills.',
            details: {
                description: 'Algo Maze is a logic-intensive competitive event that challenges participants to think beyond formulas and code. It focuses on mathematical reasoning, algorithmic thinking, and decision-making skills through twisted logic problems and real-world algorithm scenarios. Speed alone does not guarantee success, clarity of thought and correctness determine the winners.',
                rounds: [
                    { title: 'Round 1: Prelims (30 mins)', desc: 'MCQs covering twisted logic, mathematics, and algorithms.' },
                    { title: 'Round 2: Finals (40 mins)', desc: 'Scenario-based questions and algorithm/math decision-making challenges.' }
                ],
                rules: [
                    'Winner selected based on highest score with correct reasoning.',
                    'Emphasis on optimal and logical decisions.'
                ],
                teamSize: 'Individual Participation',
                judging: 'Accuracy, Logical reasoning, Performance in decision-making.',
                prize: '1st Prize, 2nd Prize + Certificates.',
                coordinator: 'Barath V (8489573989)'
            },
            date: 'February 20, 2026',
            time: '11:00 AM',
            location: 'Offline',
            category: 'Technical',
            icon: Brain,
            color: 'text-yellow-400'
        },
        {
            id: 3,
            title: 'SQL – Query Quest',
            description: 'Assess you knowledge in Structured Query Language (SQL), focusing on logical thinking and real-time problem-solving.',
            details: {
                description: 'SQL – Query Quest is a technical event designed to assess participants’ knowledge and practical skills in Structured Query Language (SQL), focusing on logical thinking and real-time problem-solving.',
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
            date: 'February 20, 2026',
            time: '02:00 PM',
            location: 'Lab 2',
            category: 'Technical',
            icon: Database,
            color: 'text-emerald-400'
        },
        {
            id: 4,
            title: 'DESIGN EVENT',
            description: 'Unleash your creativity in this non-technical design challenge. Perfect for those with an eye for aesthetics.',
            details: {
                description: 'COMPANY YET TO DECIDE.',
                rounds: [],
                rules: [
                    'COMPANY YET TO DECIDE.'
                ],
                teamSize: 'Individual or Team of 2',
                judging: 'Decided by the Company.',
                prize: '1st Prize, 2nd Prize, Certificates for all participants.',
                coordinator: 'Pooja Nandhini C (+91 86100 61231)'
            },
            date: 'February 20, 2026',
            time: '10:00 AM',
            location: 'TBA',
            category: 'Non Technical',
            icon: Palette,
            color: 'text-pink-400'
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
            date: 'February 20, 2026',
            time: '11:00 AM',
            location: 'Lab 3',
            category: 'Technical',
            icon: Terminal,
            color: 'text-cyan-400'
        },
        {
            id: 6,
            title: 'TREASURE HUNT',
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
            date: 'February 20, 2026',
            time: '02:00 PM',
            location: 'Campus Wide',
            category: 'Non Technical',
            icon: Compass,
            color: 'text-orange-400'
        },
        {
            id: 7,
            title: 'MagicMatix',
            description: 'Where logic meets mathematics. A unique crossword challenge bridging numerical precision and Computer Science concepts.',
            details: {
                description: 'MagicMatix is a dynamic event where logic meets mathematics in an exhilarating new way. It invites teams to showcase their reasoning and problem-solving skills through a series of unique crossword challenges. By bridging the gap between numerical precision and the dual-meanings of Computer Science, this event fosters collaboration and sharp thinking.',
                rounds: [
                    { title: 'Round 1: Number Crossword (30 mins)', desc: 'Solve a 25-question crossword using ONLY numbers. Clues are in English. Ignore decimals/symbols (e.g., Pi = 314).' },
                    { title: 'Round 2: Acronym Crossword', desc: 'Fill with English text. Answers are acronyms blending Math and CS (e.g., PDF = Probability Density Function / Portable Document Format).' }
                ],
                rules: [
                    'Round 1: Fill with numbers only. Remove special characters.',
                    'Round 2: Answers must be acronyms.',
                    'Team Size: Strictly 2 members.',
                    'Tie-Breaker: Least time taken, then Rapid Fire (5 questions).',
                    'Malpractice leads to immediate disqualification.'
                ],
                teamSize: 'Team of 2',
                judging: 'Score based (Top 10 for R2, Top 3 for Prizes). Tie-breaker by Time.',
                prize: '1st, 2nd, 3rd Prizes + Certificates.',
                coordinator: 'Sundhar Balamoorthy (8248629145)'
            },
            date: 'February 20, 2026',
            time: 'TBA',
            location: 'Classroom Block',
            category: 'Non Technical',
            icon: Sparkles,
            color: 'text-purple-400'
        },
        {
            id: 8,
            title: 'Math Quiz',
            description: 'Test your aptitude, mathematical knowledge, and speed. A competitive event featuring written prelims and a dynamic main quiz round.',
            details: {
                description: 'Math Quiz is a competitive and engaging technical event designed to test participants’ aptitude, mathematical knowledge, speed, and logical reasoning. The event consists of a preliminary written round followed by a main quiz round featuring various quiz formats.',
                rounds: [
                    { title: 'Round 1: Prelims (Written Test - 20 mins)', desc: 'Objective type (MCQ) covering Quantitative Aptitude, Core Mathematics, and General Math. Top teams qualify.' },
                    { title: 'Round 2: Mains (Quiz Round)', desc: 'Various formats: Identify Mathematician, Find the Error in Theorem, Rapid Fire (10 questions in 60s), and Buzzer-based Competitive Exam questions.' }
                ],
                rules: [
                    'Team Size: 3 members per team.',
                    'Prelims: Written MCQ test.',
                    'Mains: Includes visual rounds, rapid fire, and buzzer rounds.',
                    'Malpractice leads to disqualification.'
                ],
                teamSize: '3 Members per Team',
                judging: 'Accuracy, Speed, Logical Reasoning, Teamwork, Time Management.',
                prize: '1st, 2nd, 3rd Prizes.',
                coordinator: 'Safrin S (8667004235)'
            },
            date: 'February 20, 2026',
            time: 'TBA',
            location: 'Classroom Block',
            category: 'Technical',
            icon: Sigma,
            color: 'text-indigo-400'
        },
        {
            id: 9,
            title: 'Mathkinator',
            description: 'Mathkinator – The Guessing Genius! An interactive and brain-teasing event inspired by Akinator.',
            details: {
                description: 'Mathkinator is an interactive and brain-teasing event inspired by Akinator, where participants identify famous mathematicians or mathematical concepts using logical thinking and strategic questioning. The event encourages teamwork, reasoning, and problem-solving in a fun and competitive way.',
                rounds: [
                    { title: 'Round 1: Prelims (Concept Guessing - 20-25 mins)', desc: 'Yes/No/Maybe questioning. Identify 5 concepts (e.g., Infinity, Pi). Max 2 questions per item. Lowest scores eliminated.' },
                    { title: 'Round 2: Finals (Personality Guessing - 20 mins)', desc: 'Yes/No/Maybe questioning. Identify 5 famous mathematicians (e.g., Gauss, Ramanujan). Max 2 questions per personality.' }
                ],
                rules: [
                    'Format: Yes/No/Maybe questioning.',
                    'Round 1: Identify 5 mathematical concepts.',
                    'Round 2: Identify 5 famous mathematicians.',
                    'Limit: Only 2 questions allowed per item/personality before guessing.'
                ],
                teamSize: '4-5 Members per Team',
                judging: 'Accuracy, logic in questioning, teamwork, and time taken. Bonus for speed.',
                prize: '1st, 2nd, 3rd Prizes.',
                coordinator: 'Madhan.M (9047937541)'
            },
            date: 'February 20, 2026',
            time: 'TBA',
            location: 'Classroom Block',
            category: 'Technical',
            icon: Lightbulb,
            color: 'text-yellow-500'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-32 flex flex-col gap-24">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-0 text-center relative z-10"
            >
                Upcoming Events
            </motion.h1>

            {/* Events Grid */}
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-wrap justify-center gap-8">
                    {eventList.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedEvent(event)}
                            className="glass-card overflow-hidden group hover:border-purple-500/50 cursor-pointer w-full md:w-[45%] lg:w-[30%]"
                        >
                            <div className="h-48 relative flex-shrink-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center group-hover:bg-gray-900/80 transition-colors">
                                <div className={`absolute inset-0 opacity-20 ${event.color} blur-3xl`} />
                                <event.icon className={`w-16 h-16 ${event.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transform group-hover:scale-110 transition-transform duration-500`} />
                                <span className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                                    {event.category}
                                </span>
                            </div>

                            <div className="p-6 relative z-20 flex flex-col flex-grow">
                                <h3 className={`text-2xl font-bold mb-2 group-hover:${event.color} transition-colors`}>{event.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{event.description}</p>

                                <div className="flex flex-col gap-2 text-sm text-gray-300 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-purple-400" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-green-400" />
                                        <span>{event.details.coordinator.split('(')[0].trim()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedEvent(event)}
                                    className={`w-full mt-6 btn btn-outline group-hover:bg-white/10 group-hover:text-white transition-all flex items-center justify-center gap-2 border-white/10`}
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
                                    {/* Modal Header Icon */}
                                    <div className="h-64 relative flex-shrink-0 bg-gradient-to-b from-gray-900 to-[#0f0518] flex items-center justify-center">
                                        <div className={`absolute inset-0 opacity-10 ${selectedEvent.color} blur-[100px]`} />
                                        <selectedEvent.icon className={`w-32 h-32 ${selectedEvent.color} drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]`} />

                                        <div className="absolute bottom-6 left-6 z-20">
                                            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg mb-2 inline-block">
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

                                                <button
                                                    onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                                                    className="w-full py-4 btn btn-primary text-xl font-bold shadow-lg shadow-purple-500/20"
                                                >
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
