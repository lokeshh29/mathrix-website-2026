import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        dept: '',
        year: '',
        events: [],
        workshops: [],
        transactionId: '',
        screenshotUrl: ''
    });

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, submitting, success, error
    const [message, setMessage] = useState('');

    const eventOptions = [
        "SQL – Query Quest", "MagicMatix", "Code Mathrix", "Through the Lens",
        "IPL Auction", "Paper Presentation", "GoofyChess", "Math Quiz",
        "Find The Fixed Points", "Mathkinator"
    ];

    const workshopOptions = []; // No workshops currently

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const list = prev[type];
            if (checked) {
                return { ...prev, [type]: [...list, value] };
            } else {
                return { ...prev, [type]: list.filter(item => item !== value) };
            }
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('uploading');
        setMessage('');

        try {
            if (!file) throw new Error("Please upload a payment screenshot");

            const submissionData = new FormData();
            submissionData.append('fullName', formData.fullName);
            submissionData.append('email', formData.email);
            submissionData.append('phone', formData.phone);
            submissionData.append('college', formData.college);
            submissionData.append('dept', formData.dept);
            submissionData.append('year', formData.year);
            submissionData.append('transactionId', formData.transactionId);
            submissionData.append('events', JSON.stringify(formData.events));
            submissionData.append('workshops', JSON.stringify(formData.workshops));
            submissionData.append('screenshot', file);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: 'POST',
                body: submissionData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Registration failed");
            }

            setStatus('success');
            setMessage('Registration successful! Check your email for confirmation.');

            // Optional: Reset form or redirect
            setTimeout(() => {
                // navigate('/'); 
                setStatus('idle');
                setFormData({
                    fullName: '', email: '', phone: '', college: '', dept: '', year: '',
                    events: [], workshops: [], transactionId: '', screenshotUrl: ''
                });
                setFile(null);
            }, 3000);

        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
            setMessage(error.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto glass-card p-8 md:p-12"
            >
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Event Registration</h1>

                {status === 'success' ? (
                    <div className="text-center py-20">
                        <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Registration Successful!</h2>
                        <p className="text-gray-300">Thank you for registering. We look forward to seeing you at Mathrix 2026.</p>
                        <button onClick={() => setStatus('idle')} className="mt-8 btn btn-primary">Register Another</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium ml-1">Full Name</label>
                                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium ml-1">Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium ml-1">Phone Number</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="+91 98765 43210" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium ml-1">Year of Study</label>
                                <select required name="year" value={formData.year} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all [&>option]:text-black">
                                    <option value="" disabled>Select Year</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                    <option value="5">5th Year</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium ml-1">Department</label>
                                <input required type="text" name="dept" value={formData.dept} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="Computer Science" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium ml-1">College Name</label>
                                <input required type="text" name="college" value={formData.college} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="Anna University" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-gray-300 text-sm font-medium ml-1">Select Events</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                {eventOptions.map(event => (
                                    <label key={event} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-colors">
                                        <input type="checkbox" value={event} checked={formData.events.includes(event)} onChange={(e) => handleCheckboxChange(e, 'events')} className="form-checkbox h-5 w-5 text-pink-500 rounded border-gray-600 bg-gray-700 focus:ring-0" />
                                        <span className="text-gray-300">{event}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                                Payment Details
                            </h3>
                            <div className="space-y-2">
                                <p className="text-gray-400 text-sm">UPI ID: <span className="text-white font-mono font-bold">mathrix.ceg@okaxis</span></p>
                                <div className="p-4 bg-white rounded-xl w-32 h-32 flex items-center justify-center mx-auto my-4">
                                    <span className="text-black font-bold">QR CODE</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium ml-1">Transaction ID</label>
                                    <input required type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="txn_1234567890" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium ml-1">Payment Screenshot</label>
                                    <div className="relative">
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
                                        <label htmlFor="file-upload" className={`w-full flex items-center justify-center gap-2 bg-white/5 border border-dashed ${file ? 'border-green-500 text-green-400' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-3 cursor-pointer hover:bg-white/10 transition-all`}>
                                            <Upload size={20} />
                                            {file ? file.name : "Upload Screenshot (Required)"}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl">
                                <AlertCircle size={20} />
                                <p>{message}</p>
                            </div>
                        )}

                        <button disabled={status === 'uploading' || status === 'submitting'} type="submit" className="w-full btn btn-primary py-4 text-lg font-bold shadow-lg shadow-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                            {status === 'uploading' || status === 'submitting' ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader className="animate-spin" /> Registering...
                                </span>
                            ) : "Complete Registration"}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Register;
