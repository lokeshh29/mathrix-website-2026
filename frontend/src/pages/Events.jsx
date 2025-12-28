import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, Info, Users, Trophy, FileText, CheckCircle, Terminal, Brain, Database, Palette, Compass, Projector } from 'lucide-react';

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

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
                    {[
                        {
                            id: 1,
                            title: 'Paper Presentation',
                            description: 'A platform to present your innovative technical papers and research ideas. Showcase your knowledge, communication, and problem-solving skills.',
                            details: {
                                description: 'The Paper Presentation event is a platform for students to showcase their research ideas and technical knowledge. Participants present their papers on various technical topics to a panel of judges.',
                                rounds: [
                                    { title: 'Abstract Submission', desc: 'Submit your abstract for review.' },
                                    { title: 'Final Presentation', desc: 'Present your paper in front of judges (10 mins + 2 mins Q&A).' }
                                ],
                                rules: [
                                    'Team Size: 2-3 members.',
                                    'Paper Limit: 6 pages double column.',
                                    'Presentation Time: 10 minutes.',
                                    'Q&A Session: 2 minutes.'
                                ],
                                teamSize: '2-3 Members',
                                judging: 'Novelty, Clarity, Presentation Skills, Technical Content.',
                                prize: '1st: ₹3000, 2nd: ₹2000',
                                coordinator: 'Arun Kumar (9876543210)'
                            },
                            date: 'February 21, 2026',
                            time: '10:00 AM',
                            location: 'Auditorium',
                            category: 'Technical',
                            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop'
                        },
                        {
                            id: 2,
                            title: 'Algo Maze',
                            description: 'A logic-intensive competitive event consisting of twisted logic problems. Focuses on mathematical reasoning and algorithmic thinking.',
                            details: {
                                description: 'Algo Maze tests your logical reasoning and algorithmic thinking skills. Solve complex puzzles and mazes using code and logic.',
                                rounds: [
                                    { title: 'Round 1: Logic Puzzle', desc: 'Solve logic puzzles to qualify.' },
                                    { title: 'Round 2: The Maze', desc: 'Navigate the algorithmic maze to win.' }
                                ],
                                rules: [
                                    'Individual participation.',
                                    'No electronic gadgets allowed.',
                                    'Time limit: 60 minutes.'
                                ],
                                teamSize: 'Individual',
                                judging: 'Speed, Accuracy, Logic.',
                                prize: '1st: ₹2000, 2nd: ₹1000',
                                coordinator: 'Priya S (9876543211)'
                            },
                            date: 'February 21, 2026',
                            time: '11:00 AM',
                            location: 'Lab 1',
                            category: 'Technical',
                            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1470&auto=format&fit=crop'
                        },
                        {
                            id: 3,
                            title: 'SQL – Query Quest',
                            description: 'Assess you knowledge in Structured Query Language (SQL), focusing on logical thinking and real-time problem-solving with rapid-fire rounds.',
                            details: {
                                description: 'Query Quest challenges your SQL skills. Write efficient queries to solve data problems under time pressure.',
                                rounds: [
                                    { title: 'Round 1: Schema Design', desc: 'Design a schema for a given problem.' },
                                    { title: 'Round 2: Query Optimization', desc: 'Optimize complex queries for performance.' }
                                ],
                                rules: [
                                    'Team Size: 2 members.',
                                    'Standard SQL syntax.',
                                    'Internet access allowed for documentation only.'
                                ],
                                teamSize: '2 Members',
                                judging: 'Efficiency, Correctness, Speed.',
                                prize: '1st: ₹2500, 2nd: ₹1500',
                                coordinator: 'Rahul M (9876543212)'
                            },
                            date: 'February 21, 2026',
                            time: '02:00 PM',
                            location: 'Lab 2',
                            category: 'Technical',
                            image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1470&auto=format&fit=crop'
                        },
                        {
                            id: 4,
                            title: 'Design Event',
                            description: 'Unleash your creativity in this non-technical design challenge. Perfect for those with an eye for aesthetics and user experience.',
                            details: {
                                description: 'Showcase your creative design skills. Create stunning visuals, posters, or UI designs based on a theme.',
                                rounds: [
                                    { title: 'Round 1: Poster Design', desc: 'Design a poster for a given topic.' },
                                    { title: 'Round 2: UI/UX Challenge', desc: 'Design a landing page for a product.' }
                                ],
                                rules: [
                                    'Individual participation.',
                                    'Software: Photoshop/Figma/Illustrator.',
                                    'Assets must be original or royalty-free.'
                                ],
                                teamSize: 'Individual',
                                judging: 'Creativity, Aesthetics, Relevance.',
                                prize: '1st: ₹2000, 2nd: ₹1000',
                                coordinator: 'Sneha R (9876543213)'
                            },
                            date: 'February 21, 2026',
                            time: '10:00 AM',
                            location: 'Design Studio',
                            category: 'Non Technical',
                            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1400&auto=format&fit=crop'
                        },
                        {
                            id: 5,
                            title: 'Code Mathrix',
                            description: 'Decode. Divide. Conquer. A collaborative coding challenge where two teammates solve split problems with strict turn-based coding rules.',
                            details: {
                                description: 'A unique coding relay where teammates swap roles. One codes while the other guides, switching periodically.',
                                rounds: [
                                    { title: 'Round 1: Relay Coding', desc: 'Switch roles every 10 minutes.' },
                                    { title: 'Round 2: Blind Coding', desc: 'Code without seeing the screen.' }
                                ],
                                rules: [
                                    'Team Size: 2 members.',
                                    'Languages: C/C++/Python/Java.',
                                    'Strict adherence to switch timings.'
                                ],
                                teamSize: '2 Members',
                                judging: 'Code Quality, Output, Teamwork.',
                                prize: '1st: ₹3000, 2nd: ₹2000',
                                coordinator: 'Vikram S (9876543214)'
                            },
                            date: 'February 21, 2026',
                            time: '11:00 AM',
                            location: 'Lab 3',
                            category: 'Technical',
                            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1470&auto=format&fit=crop'
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
                            time: '02:00 PM',
                            location: 'Campus Wide',
                            category: 'Non Technical',
                            image: 'https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?q=80&w=1287&auto=format&fit=crop'
                        }
                    ].map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedEvent(event)}
                            className="glass-card overflow-hidden group hover:border-purple-500/50 cursor-pointer w-full md:w-[45%] lg:w-[30%]"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent z-10" />
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <span className="absolute top-4 right-4 z-20 bg-purple-600 text-white border-0 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-[0_0_10px_rgba(147,51,234,0.5)]">
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
