import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const BASE_URL = (import.meta.env.DEV ? "http://127.0.0.1:8000" : (import.meta.env.VITE_API_URL || "http://localhost:8080")).replace(/\/$/, "");
            const API_URL = `${BASE_URL}/send-email`;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Email error:", error);
            setStatus("error");
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Get In Touch</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Have questions or want to collaborate? Reach out to us.
                </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:w-1/2 space-y-8"
                >
                    <div className="glass-card p-8 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                                <p className="text-gray-400">
                                    Department of Mathematics,<br />
                                    College of Engineering Guindy,<br />
                                    Anna University, Chennai - 600 025.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 rounded-xl overflow-hidden shadow-lg border border-white/10 h-48 w-full">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://maps.google.com/maps?q=Department%20of%20Mathematics,%20Anna%20University,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                title="Location Map"
                                className="grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                            >
                            </iframe>
                        </div>
                    </div>

                    <div className="glass-card p-8 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-rose-500/20 rounded-lg text-rose-400">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                                <p className="text-gray-400">mathrix.ceg@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-pink-400/20 rounded-lg text-pink-300">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                                <p className="text-gray-400">+91 63825 10480</p>
                                <p className="text-gray-400">+91 93612 69964</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:w-1/2"
                >
                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full btn btn-primary justify-center text-lg font-bold shadow-lg shadow-pink-500/20 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? "Sending..." : status === "success" ? "Message Sent! ✅" : status === "error" ? "Failed. Try Again ❌" : (
                                    <>Send Message <Send size={20} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
