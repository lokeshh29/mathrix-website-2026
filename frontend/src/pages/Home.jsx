import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, Zap, Award } from 'lucide-react';
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
                        <h2 className="text-pink-300 font-semibold tracking-[0.2em] text-sm md:text-lg uppercase mb-6 flex items-center justify-center gap-4">
                            <span className="h-px w-8 bg-pink-500/50"></span>
                            Department of Mathematics Presents
                            <span className="h-px w-8 bg-pink-500/50"></span>
                        </h2>
                        <h1 className="text-7xl md:text-9xl font-extrabold mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-pink-200 drop-shadow-[0_0_25px_rgba(219,39,119,0.3)] leading-tight">
                            MATHRIX <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">2025</span>
                        </h1>

                        <CountdownTimer />

                        <p className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed text-balance mt-8">
                            Where Logic Meets Creativity. Join us for a symposium celebrating the beauty of mathematics through innovation and technology.
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
                        { icon: <Zap size={32} className="text-yellow-400" />, title: 'Tech Events', desc: 'Coding, hacking, and soldering logic circuits.' },
                        { icon: <Users size={32} className="text-pink-400" />, title: 'Workshops', desc: 'Hands-on sessions with industry experts.' },
                        { icon: <Award size={32} className="text-rose-400" />, title: 'Competitions', desc: 'Showcase your skills and win exciting prizes.' },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="glass-card p-6 md:p-8 text-center flex flex-col items-center hover:bg-white/5 transition-all border border-white/5 group"
                        >
                            <div className="mb-6 p-5 bg-gradient-to-br from-white/10 to-transparent rounded-2xl ring-1 ring-white/20 group-hover:ring-pink-500/40 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-all duration-500 transform group-hover:-translate-y-2">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-pink-200 transition-colors tracking-tight">{item.title}</h3>
                            <p className="text-gray-400 text-base leading-relaxed max-w-xs">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section className="container mx-auto px-4 py-10">
                <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-40 bg-pink-600/10 blur-[100px] rounded-full" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold mb-6">About The Symposium</h2>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Mathrix is the annual technical symposium organized by the Department of Mathematics.
                                It serves as a platform for students to explore the convergence of mathematics and technology.
                                This year, we are pushing boundaries with a focus on AI, Cryptography, and Computational Logic.
                            </p>
                            <div className="flex gap-8 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-rose-400">10+</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-wider">Events</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-pink-400">500+</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-wider">Participants</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-pink-400">₹50K</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-wider">Prize Pool</div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            {/* Abstract 3D shape or Image placeholder */}
                            <div className="w-64 h-64 md:w-80 md:h-80 relative">
                                <div className="absolute inset-0 border-2 border-pink-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-4 border-2 border-rose-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Calendar size={64} className="text-white/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto px-4 text-center py-20 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 to-transparent pointer-events-none" />
                <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">Ready to <span className="text-pink-400">Participate?</span></h2>
                <Link to="/contact" className="btn btn-primary text-xl px-12 py-5 shadow-[0_0_40px_rgba(219,39,119,0.4)]">
                    Register Now
                </Link>
            </section>
        </div>
    );
};

export default Home;
