import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, Zap, Award, MapPin, Clock, Terminal, Brain, Database, Palette, Compass, Projector } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';

const Home = () => {
    return (
        <div className="flex flex-col gap-20 pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-pink-300 font-semibold tracking-[0.2em] text-sm md:text-lg uppercase mb-6 flex items-center justify-center gap-4 font-tech">
                            <span className="h-px w-8 bg-pink-500/50"></span>
                            Department of Mathematics Presents
                            <span className="h-px w-8 bg-pink-500/50"></span>
                        </h2>
                        <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-400 drop-shadow-[0_5px_15px_rgba(255,255,255,0.1)] leading-tight font-tech uppercase">
                            MATHRIX
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-pink-500 tracking-widest font-tech mb-8">
                            2026
                        </h2>

                        <CountdownTimer />

                        <p className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed text-balance mt-8">
                            Where Logic Meets Creativity. Join us for a Mathrix celebrating the beauty of mathematics through innovation and technology.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
                            <Link to="/events" className="btn btn-primary group text-lg px-10 py-4 shadow-[0_0_30px_rgba(219,39,119,0.3)]">
                                Explore Events
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/schedule" className="btn btn-outline text-lg px-10 py-4">
                                View Schedule
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Highlights/Features */}
            <section className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {[
                        { icon: <Zap size={32} className="text-yellow-400" />, title: 'Tech Events', desc: 'Coding, hacking, and soldering logic circuits.', link: '/events' },
                        { icon: <Users size={32} className="text-pink-400" />, title: 'Workshops', desc: 'Hands-on sessions with industry experts.', link: '/workshops' },
                        { icon: <Award size={32} className="text-rose-400" />, title: 'Non-Tech Events', desc: 'Showcase your skills and win exciting prizes.', link: '/events' },
                    ].map((item, index) => (
                        <Link to={item.link} key={index} className="contents">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="glass-card p-6 md:p-8 text-center flex flex-col items-center hover:bg-white/5 transition-all border border-white/5 group cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                    <ArrowRight className="text-pink-400" size={20} />
                                </div>
                                <div className="mb-6 p-5 bg-gradient-to-br from-white/10 to-transparent rounded-2xl ring-1 ring-white/20 group-hover:ring-pink-500/40 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-all duration-500 transform group-hover:-translate-y-2">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-pink-200 transition-colors tracking-tight">{item.title}</h3>
                                <p className="text-gray-400 text-base leading-relaxed max-w-xs">{item.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section className="container mx-auto px-4 py-10">
                <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-40 bg-pink-600/10 blur-[100px] rounded-full" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold mb-2">About Mathrix</h2>
                            <h3 className="text-xl font-medium text-pink-400 tracking-[0.3em] uppercase mb-6">Epsilon to Infinity</h3>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Mathrix is the annual intercollegiate Mathrix where mathematics meets technology! Hosted by the Department of Mathematics, College of Engineering Guindy, Anna University, Mathrix is a one-of-a-kind fest that brings together logic, innovation, and problem-solving under one roof. Organized by the brilliant minds of M.Sc. Computer Science (5 years), M.Sc. Information Technology (5 years), and M.Sc. Mathematics (2 years), Mathrix is more than just a Mathrix—it's a fusion of numbers, algorithms, and cutting-edge tech. With a perfect blend of mathematical and technical events, this fest is designed to challenge intellects, spark creativity, and push boundaries. From thrilling competitions that test your mathematical prowess to tech-driven challenges that fuel your coding skills, Mathrix is the ultimate arena for innovators, problem-solvers, and future disruptors.
                            </p>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center mt-8">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-colors">
                                    <div className="text-3xl font-bold text-rose-400 mb-1">10+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Tech Events</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-colors">
                                    <div className="text-3xl font-bold text-pink-400 mb-1">4+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Non-Tech Events</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-colors">
                                    <div className="text-3xl font-bold text-purple-400 mb-1">2+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Workshops</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-colors">
                                    <div className="text-3xl font-bold text-indigo-400 mb-1">500+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Participants</div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center relative">
                            {/* Coding Terminal Animation */}
                            <div className="relative w-full max-w-[280px] md:max-w-md aspect-video flex items-center justify-center">
                                {/* Glowing backdrop */}
                                <div className="absolute inset-0 bg-pink-500/20 blur-[60px] rounded-full animate-pulse" />

                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="relative z-10 w-full"
                                >
                                    <div className="glass-card p-4 rounded-xl border border-pink-500/30 bg-black/60 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
                                        {/* Terminal Header */}
                                        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                            <div className="text-xs text-gray-500 ml-2 font-mono">user@mathrix:~/events</div>
                                        </div>

                                        {/* Terminal Content */}
                                        <div className="font-mono text-sm space-y-2">
                                            <div className="flex items-center gap-2 text-green-400">
                                                <span>➜</span>
                                                <span className="text-pink-400">mathrix</span>
                                                <span className="text-white">init --force</span>
                                            </div>
                                            <div className="text-gray-300 pl-4">
                                                <div className="animate-[typing_3s_steps(20)_infinite]">Loading modules...</div>
                                                <div className="text-blue-400">Importing AI_Models...</div>
                                                <div className="text-purple-400">Compiling logic...</div>
                                                <div className="text-green-400 font-bold mt-2">Success! System Online.</div>
                                            </div>
                                            <div className="flex items-center gap-2 text-green-400 animate-pulse">
                                                <span>➜</span>
                                                <span className="w-2 h-4 bg-gray-400 block" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Background Geometric floaters */}
                                <div className="absolute -top-10 -right-10 text-pink-500/20 animate-bounce delay-700">
                                    <code className="text-6xl font-bold">{`{}`}</code>
                                </div>
                                <div className="absolute -bottom-5 -left-5 text-blue-500/20 animate-bounce">
                                    <code className="text-6xl font-bold">{`</>`}</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >

            {/* Featured Events Section */}
            <section className="container mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Scheduled Events</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Compete, learn, and win in our flagship technical and non-technical events.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {[
                        {
                            id: 1,
                            title: 'PAPER PRESENTATION',
                            description: 'A platform to present your innovative technical papers and research ideas. Showcase your knowledge, communication, and problem-solving skills.',
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
                            date: 'February 20, 2026',
                            time: '02:00 PM',
                            location: 'Campus Wide',
                            category: 'Non Technical',
                            icon: Compass,
                            color: 'text-orange-400'
                        }
                    ].map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card overflow-hidden group hover:border-purple-500/50 w-full md:w-[45%] lg:w-[30%]"
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
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>

                                <div className="flex flex-col gap-2 text-sm text-gray-300 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-purple-400" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-green-400" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-red-400" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <Link to="/events" className="w-full mt-auto btn btn-outline group-hover:bg-white/10 group-hover:text-white block text-center border-white/10">
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


        </div >
    );
};

export default Home;
