import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, Loader, Download } from 'lucide-react';
import qrCode from '../assets/qr_code.jpeg';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        course: '',
        specialization: '',
        year: '',
        events: [],
        workshops: [],
        transactionId: '',
        screenshotUrl: ''
    });

    // New States for Flow
    const [collegeType, setCollegeType] = useState('other'); // 'ceg' or 'other'
    const [regType, setRegType] = useState('individual'); // 'individual' or 'combo'
    const [selectedCombo, setSelectedCombo] = useState('');

    useEffect(() => {
        if (collegeType === 'ceg') {
            setFormData(prev => ({ ...prev, college: 'CEG, Anna University' }));
        } else {
            setFormData(prev => ({ ...prev, college: '' }));
        }
    }, [collegeType]);

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, submitting, success, error
    const [message, setMessage] = useState('');

    const eventOptions = [
        "SQL – Query Quest", "MagicMatix", "Code Mathrix", "Through the Lens",
        "IPL Auction", "Paper Presentation", "GoofyChess", "Math Quiz",
        "Find The Fixed Points", "Mathkinator", "Treasure Hunt"
    ];

    const comboPackages = {
        "Combo 1": ["SQL – Query Quest", "Code Mathrix", "Mathkinator"],
        "Combo 2": ["Treasure Hunt", "Math Quiz", "GoofyChess"],
        "Combo 3 (Non-Tech)": ["Through the Lens", "IPL Auction", "Mathkinator"]
    };

    const currentFee = collegeType === 'ceg' ? 60 : 120;

    const workshopOptions = []; // No workshops currently

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;
        if (checked && type === 'events' && regType === 'individual' && formData.events.length >= 3) {
            alert("You can select a maximum of 3 events for Individual Registration.");
            return;
        }

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
            submissionData.append('course', formData.course);
            submissionData.append('specialization', formData.specialization);
            submissionData.append('year', formData.year);
            submissionData.append('transactionId', formData.transactionId);
            submissionData.append('events', JSON.stringify(formData.events));
            submissionData.append('workshops', JSON.stringify(formData.workshops));
            submissionData.append('screenshot', file);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: 'POST',
                body: submissionData
            });

            const jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse.detail || "Registration failed");
            }

            setStatus('success');
            setMessage(`Registration successful! ID: ${jsonResponse.mathrixId}`);

            // Auto-open PDF ticket
            const ticketUrl = `${import.meta.env.VITE_API_URL}/ticket/${formData.transactionId}`;
            window.open(ticketUrl, '_blank');

            // Optional: Reset form or redirect
            // setTimeout(() => { ... }, 3000); // Removed timeout to let them see the ticket
            // setTimeout(() => {
            //     // navigate('/'); 
            //     setStatus('idle');
            //     setFormData({
            //         fullName: '', email: '', phone: '', college: '', dept: '', year: '',
            //         events: [], workshops: [], transactionId: '', screenshotUrl: ''
            //     });
            //     setFile(null);
            // }, 3000);

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
                className="max-w-3xl mx-auto glass-card p-6 md:p-12"
            >
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent break-words tracking-tight">Event Registration</h1>

                {status === 'success' ? (
                    <div className="text-center py-12">
                        <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-2">Registration Successful!</h2>
                        <div className="bg-white/10 p-4 rounded-xl inline-block mb-6 border border-white/20">
                            <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">Your Mathrix ID</p>
                            <p className="text-4xl font-mono font-bold text-pink-500 tracking-widest">{message.split("ID: ")[1] || "PENDING"}</p>
                        </div>
                        <p className="text-gray-300 max-w-md mx-auto mb-8">
                            Thank you for registering. Please download your ticket below and present it at the registration desk.
                        </p>

                        <div className="flex justify-center gap-4">
                            <a
                                href={`${import.meta.env.VITE_API_URL}/ticket/${formData.transactionId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all"
                            >
                                <Download size={20} /> Download Ticket
                            </a>
                            <button onClick={() => setStatus('idle')} className="btn bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all">
                                Register Another
                            </button>
                        </div>
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
                                <label className="text-gray-300 text-sm font-medium ml-1">Course / Degree</label>
                                <input required type="text" name="course" value={formData.course} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="B.E. / B.Tech" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium ml-1">Specialization / Branch</label>
                                <input required type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="CSE / IT / EEE" />
                            </div>
                            {collegeType === 'other' && (
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium ml-1">College Name</label>
                                    <input required={collegeType === 'other'} type="text" name="college" value={formData.college} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="Anna University" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                                Registration Details
                            </h3>

                            {/* 1. College Type */}
                            <div className="space-y-3">
                                <label className="text-gray-300 text-sm font-medium">Are you studying in CEG?</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className={`p-4 rounded-xl border cursor-pointer transition-all ${collegeType === 'ceg' ? 'bg-pink-500/20 border-pink-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                        <input type="radio" name="collegeType" value="ceg" checked={collegeType === 'ceg'} onChange={() => setCollegeType('ceg')} className="hidden" />
                                        <div className="text-center font-bold">Yes, CEG Student</div>
                                        <div className="text-center text-xs opacity-70 mt-1">Fee: ₹60</div>
                                    </label>
                                    <label className={`p-4 rounded-xl border cursor-pointer transition-all ${collegeType === 'other' ? 'bg-pink-500/20 border-pink-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                        <input type="radio" name="collegeType" value="other" checked={collegeType === 'other'} onChange={() => setCollegeType('other')} className="hidden" />
                                        <div className="text-center font-bold">Other College</div>
                                        <div className="text-center text-xs opacity-70 mt-1">Fee: ₹120</div>
                                    </label>
                                </div>
                            </div>

                            {/* 2. Registration Type */}
                            <div className="space-y-3">
                                <label className="text-gray-300 text-sm font-medium">Registration Type</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className={`p-4 rounded-xl border cursor-pointer transition-all ${regType === 'combo' ? 'bg-purple-500/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                        <input type="radio" name="regType" value="combo" checked={regType === 'combo'} onChange={() => { setRegType('combo'); setFormData(p => ({ ...p, events: [] })); setSelectedCombo(''); }} className="hidden" />
                                        <div className="text-center font-bold">Combo Package</div>
                                        <div className="text-center text-xs opacity-70 mt-1">Best Value</div>
                                    </label>
                                    <label className={`p-4 rounded-xl border cursor-pointer transition-all ${regType === 'individual' ? 'bg-purple-500/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                        <input type="radio" name="regType" value="individual" checked={regType === 'individual'} onChange={() => { setRegType('individual'); setFormData(p => ({ ...p, events: [] })); setSelectedCombo(''); }} className="hidden" />
                                        <div className="text-center font-bold">Individual Events</div>
                                        <div className="text-center text-xs opacity-70 mt-1">Select Custom</div>
                                    </label>
                                </div>
                            </div>

                            {/* 3. Event Selection */}
                            {regType === 'combo' ? (
                                <div className="space-y-3">
                                    <label className="text-gray-300 text-sm font-medium">Select Combo Package</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {Object.entries(comboPackages).map(([name, events]) => (
                                            <label key={name} className={`relative p-4 rounded-xl border cursor-pointer transition-all h-full ${selectedCombo === name ? 'bg-pink-500/20 border-pink-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                                <input
                                                    type="radio"
                                                    name="combo"
                                                    value={name}
                                                    checked={selectedCombo === name}
                                                    onChange={() => {
                                                        setSelectedCombo(name);
                                                        setFormData(prev => ({ ...prev, events: events }));
                                                    }}
                                                    className="hidden"
                                                />
                                                <div className="font-bold text-white mb-2">{name}</div>
                                                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                                                    {events.map((ev, i) => <li key={i}>{ev}</li>)}
                                                </ul>
                                                {selectedCombo === name && (
                                                    <div className="absolute top-2 right-2 text-pink-500"><CheckCircle size={16} /></div>
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="text-right text-sm text-pink-400 font-bold mt-2">
                                        Selected Fee: ₹{currentFee}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <label className="text-gray-300 text-sm font-medium ml-1">Select Events</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                        {eventOptions.map(event => {
                                            const isMaxSelected = regType === 'individual' && formData.events.length >= 3;
                                            const isDisabled = isMaxSelected && !formData.events.includes(event);

                                            return (
                                                <label key={event} className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5 cursor-pointer'}`}>
                                                    <input
                                                        type="checkbox"
                                                        value={event}
                                                        checked={formData.events.includes(event)}
                                                        onChange={(e) => handleCheckboxChange(e, 'events')}
                                                        disabled={isDisabled}
                                                        className="form-checkbox h-5 w-5 text-pink-500 rounded border-gray-600 bg-gray-700 focus:ring-0 disabled:opacity-50"
                                                    />
                                                    <span className="text-gray-300">{event}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <div className="text-right text-sm text-pink-400 font-bold mt-2">
                                        Registration Fee: ₹{currentFee}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                                Payment Details
                            </h3>
                            <div className="space-y-2">
                                <p className="text-gray-400 text-sm">UPI ID: <span className="text-white font-mono font-bold">mathrix.ceg@okaxis</span></p>
                                <div className="p-2 bg-white rounded-xl w-48 h-48 flex items-center justify-center mx-auto my-4 overflow-hidden">
                                    <img src={qrCode} alt="Payment QR Code" className="w-full h-full object-contain" />
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
