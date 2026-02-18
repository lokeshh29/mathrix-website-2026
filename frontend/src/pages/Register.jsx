import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, Loader, Download, Plus, Trash2, UserPlus, Users, FileText, Info, Zap } from 'lucide-react';
import qrCode from '../assets/qr_code.jpeg';

import rulebookPdf from '../assets/mathrix_rulebook.pdf';

const COLLEGE_LIST = [
    "SRI SAIRAM ENGINEERING COLLEGE",
    "St Peter's College Of Engineering And Technology",
];

const Register = () => {

    // --- CLOSING LOGIC ---
    // const REGISTRATION_DEADLINE = "2026-02-18T09:00:00+05:30";
    // const isRegistrationClosed = new Date() > new Date(REGISTRATION_DEADLINE);
    const isRegistrationClosed = true; // Force closed unconditionally

    if (isRegistrationClosed) {
        return (
            <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full glass-card p-8 md:p-12 text-center border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>

                    <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <AlertCircle size={40} className="text-pink-400" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-tech tracking-wide">
                        Registration Closed
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                        We have reached our maximum capacity for online registrations. <br />
                        Thank you for your incredible interest in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-bold">Mathrix 2026</span>!
                    </p>

                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">For Queries</p>
                            <a href="mailto:mathrix@annauniv.edu" className="text-white hover:text-pink-400 transition-colors font-mono">
                                mathrix.ceg@gmail.com
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // State for multiple attendees
    const [attendees, setAttendees] = useState([{
        id: 1,
        fullName: '',
        email: '',
        phone: '',
        college: '',
        course: '',
        specialization: '',
        year: '',
        events: [],
        workshops: []
    }]);

    // Common details
    const [transactionId, setTransactionId] = useState('');
    const [file, setFile] = useState(null);

    // UI State
    const [collegeType, setCollegeType] = useState('other'); // 'ceg' or 'other'
    const [status, setStatus] = useState('idle');
    const [rulesAccepted, setRulesAccepted] = useState(false);
    const [message, setMessage] = useState('');
    const [responseIds, setResponseIds] = useState([]);
    const [closedEvents, setClosedEvents] = useState([]); // List of full events from DB
    const [showGoofyModal, setShowGoofyModal] = useState(false);
    const [collegeSuggestions, setCollegeSuggestions] = useState({});

    const eventOptions = [
        "SQL – Query Quest", "MagicMatix", "Code Matrix",
        "IPL Auction", "Paper Presentation", "Math Wizz",
        "Mathkinator", "Treasure Hunt"
    ];

    const deadlines = {
        // Uniform Deadline: Feb 20, 10:30 AM
        "Code Matrix": "2026-02-20T10:30:00+05:30",
        "IPL Auction": "2026-02-20T10:30:00+05:30",
        "Math Wizz": "2026-02-20T10:30:00+05:30",
        "SQL – Query Quest": "2026-02-20T10:30:00+05:30",

        // Closing Soon (Deadline: Feb 18, 00:25 AM)
        "Paper Presentation": "2026-02-18T00:25:00+05:30",
        "MagicMatix": "2026-02-18T00:25:00+05:30",
        "Treasure Hunt": "2026-02-18T00:25:00+05:30",
        "Mathkinator": "2026-02-18T00:25:00+05:30"
    };

    // Check time-based deadline
    const isEventDeadlinePassed = (eventName) => {
        const deadline = deadlines[eventName];
        if (!deadline) return false;
        return new Date() > new Date(deadline);
    };

    // Fetch availability from backend
    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/events/availability?college=${collegeType}`);
                if (response.ok) {
                    const data = await response.json();
                    const fullEvents = Object.keys(data).filter(evt => data[evt].isFull);
                    setClosedEvents(fullEvents);
                }
            } catch (error) {
                console.error("Failed to fetch availability", error);
            }
        };

        fetchAvailability();
        // Poll every 30 seconds for updates
        const interval = setInterval(fetchAvailability, 30000);
        return () => clearInterval(interval);
    }, [collegeType]);

    // Effect to update college for all attendees when type changes
    useEffect(() => {
        setAttendees(prev => prev.map(a => ({
            ...a,
            college: collegeType === 'ceg' ? 'CEG, Anna University' : ''
        })));
    }, [collegeType]);

    // Add new attendee
    const addAttendee = () => {
        // Dynamic limit based on selected events
        const hasIPLAuction = attendees.some(a => a.events.includes("IPL Auction"));
        const maxLimit = hasIPLAuction ? 4 : 3;

        if (attendees.length >= maxLimit) {
            alert(`Team registrations are limited to ${maxLimit} members${hasIPLAuction ? ' for IPL Auction' : ''}.`);
            return;
        }

        setAttendees(prev => [...prev, {
            id: Date.now(),
            fullName: '',
            email: '',
            phone: '',
            college: collegeType === 'ceg' ? 'CEG, Anna University' : '',
            course: '',
            specialization: '',
            year: '',
            events: [],
            workshops: []
        }]);
    };

    // Remove attendee
    const removeAttendee = (id) => {
        if (attendees.length > 1) {
            setAttendees(prev => prev.filter(a => a.id !== id));
        }
    };

    // Handle input change for specific attendee
    const handleAttendeeChange = (id, field, value) => {
        setAttendees(prev => prev.map(a =>
            a.id === id ? { ...a, [field]: value } : a
        ));
    };

    // Autocomplete Logic
    const handleCollegeInput = (id, value) => {
        handleAttendeeChange(id, 'college', value);

        if (!value) {
            setCollegeSuggestions(prev => ({ ...prev, [id]: [] }));
            return;
        }

        const lowerVal = value.toLowerCase();
        // Trigger suggestions only for specific keywords as requested
        const triggerKeywords = ["sai", "sri", "shri", "st", "peter"];
        const shouldTrigger = triggerKeywords.some(keyword => lowerVal.includes(keyword));

        if (shouldTrigger) {
            const suggestions = COLLEGE_LIST.filter(college =>
                college.toLowerCase().includes(lowerVal)
            );
            setCollegeSuggestions(prev => ({ ...prev, [id]: suggestions }));
        } else {
            setCollegeSuggestions(prev => ({ ...prev, [id]: [] }));
        }
    };

    const selectCollege = (id, collegeName) => {
        handleAttendeeChange(id, 'college', collegeName);
        setCollegeSuggestions(prev => ({ ...prev, [id]: [] }));
    };

    // Handle event selection for specific attendee
    const handleEventChange = (id, event, checked) => {
        // Event constraints (Max limits for selection feedback)
        const eventConstraints = {
            "Math Wizz": 3,
            "IPL Auction": 4,
            "SQL – Query Quest": 1,
            "Paper Presentation": 2,
            "MagicMatix": 2,
            "Code Matrix": 2,
            "Mathkinator": 2,
            "Treasure Hunt": 3
        };

        setAttendees(prev => {
            // Calculate current count for this event (excluding current attendee if unchecking)
            const currentCount = prev.filter(a => a.events.includes(event) && a.id !== id).length;

            return prev.map(a => {
                if (a.id !== id) return a;

                const currentEvents = a.events;
                if (checked) {
                    // Check deadline
                    if (isEventDeadlinePassed(event)) {
                        alert("Registration for this event is closed (Deadline passed).");
                        return a;
                    }

                    // Check database limit
                    if (closedEvents.includes(event)) {
                        alert("Registration for this event is full.");
                        return a;
                    }
                    if (currentEvents.length >= 3) {
                        alert("Maximum 3 events per person allowed.");
                        return a;
                    }

                    // Check event participant limit
                    const limit = eventConstraints[event];
                    if (limit && (currentCount + 1) > limit) {
                        alert(`"${event}" allows a maximum of ${limit} participants per team. You already have ${currentCount} selected.`);
                        return a;
                    }

                    // Check Restricted College (Sairam & St.Peter's - Math Wizz)
                    const lowerCollege = (a.college || "").toLowerCase();
                    if (event === "Math Wizz" && (
                        lowerCollege.includes("sairam") ||
                        lowerCollege.includes("sai ram") ||
                        lowerCollege.includes("st.peter") ||
                        lowerCollege.includes("st peter")
                    )) {
                        alert(`Registration for "Math Wizz" is closed for ${a.college || "your college"} as 2 teams have already registered.`);
                        return a; // Prevent selection
                    }

                    return { ...a, events: [...currentEvents, event] };
                } else {
                    return { ...a, events: currentEvents.filter(e => e !== event) };
                }
            });
        });
    };

    // Calculate total fee
    // Rate: 0 per person for CEG, 100 per person for Other
    const calculateFee = () => {
        const rate = collegeType === 'ceg' ? 0 : 100;
        return attendees.length * rate;
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
            // fee validation only for non-CEG
            if (collegeType !== 'ceg') {
                if (!file) throw new Error("Please upload a payment screenshot");
                if (!transactionId) throw new Error("Please enter a transaction ID");
            }
            if (!rulesAccepted) throw new Error("Please accept the rules");

            // --- Validation: Check Event Selection ---
            attendees.forEach((attendee, index) => {
                if (attendee.events.length === 0) {
                    throw new Error(`Attendee #${index + 1} (${attendee.fullName || 'Unnamed'}) must select at least one event.`);
                }

                // Check Restricted College (Sairam & St.Peter's - Math Wizz)
                const lowerCollege = (attendee.college || "").toLowerCase();
                if (attendee.events.includes("Math Wizz") && (
                    lowerCollege.includes("sairam") ||
                    lowerCollege.includes("sai ram") ||
                    lowerCollege.includes("st.peter") ||
                    lowerCollege.includes("st peter")
                )) {
                    throw new Error(`Attendee #${index + 1}: Registration for "Math Wizz" is closed for ${attendee.college} as 2 teams have already registered.`);
                }
            });

            // --- Validation: Check Minimum/Exact Team Constraints ---
            const eventCounts = {};
            attendees.forEach(a => {
                a.events.forEach(ev => {
                    eventCounts[ev] = (eventCounts[ev] || 0) + 1;
                });
            });

            // Constraints: [Min, Max] (Max is already checked during selection, but checking here implies consistency)
            const teamRules = {
                "IPL Auction": { min: 4, max: 4, label: "exactly 4" },
                "Math Wizz": { min: 2, max: 3, label: "2-3" },
                "Treasure Hunt": { min: 2, max: 3, label: "2-3" },
                "MagicMatix": { min: 2, max: 2, label: "exactly 2" },
                "Code Matrix": { min: 2, max: 2, label: "exactly 2" },
                "Mathkinator": { min: 2, max: 2, label: "exactly 2" },
                "SQL – Query Quest": { min: 1, max: 1, label: "exactly 1" },
                "Paper Presentation": { min: 1, max: 2, label: "1-2" }
            };

            for (const [event, count] of Object.entries(eventCounts)) {
                const rule = teamRules[event];
                if (rule) {
                    if (count < rule.min) {
                        throw new Error(`"${event}" requires ${rule.label} participants. You have selected it for ${count} attendee(s).`);
                    }
                    // Max check is technically redundant due to handleEventChange but good for safety
                    if (count > rule.max) {
                        throw new Error(`"${event}" allows max ${rule.max} participants.`);
                    }
                }
            }
            // ---------------------------------------------------------

            const submissionData = new FormData();

            // Clean data before sending
            const cleanAttendees = attendees.map(({ id, ...rest }) => ({
                ...rest,
                transactionId: collegeType === 'ceg' ? '' : transactionId // Attach unique transaction ID to each
            }));

            submissionData.append('registrations', JSON.stringify(cleanAttendees));

            if (collegeType !== 'ceg' && file) {
                submissionData.append('screenshot', file);
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/register/bulk`, {
                method: 'POST',
                body: submissionData
            });

            const jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse.detail || "Registration failed");
            }

            setStatus('success');
            setResponseIds(jsonResponse.ids);
            setMessage(`Successfully registered ${jsonResponse.ids.length} attendees!`);

        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
            setMessage(error.message || "An error occurred. Please try again.");
        }
    };

    // Helper to get rule message
    const getEventRuleMessage = (event) => {
        switch (event) {
            case "IPL Auction": return "IPL Auction requires exactly 4 members.";
            case "Math Wizz": return "Teams must consist of 2–3 members.";
            case "Treasure Hunt": return "Treasure Hunt requires 2-3 members.";
            case "MagicMatix": return "MagicMatix requires exactly 2 members.";
            case "Code Matrix": return "Code Matrix requires exactly 2 members.";
            case "Mathkinator": return "Mathkinator requires exactly 2 members.";
            case "SQL – Query Quest": return "Individual Event (1 participant).";
            case "Paper Presentation": return "Individual or Team of 2.";
            default: return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto glass-card p-6 md:p-8"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 font-tech uppercase tracking-wide">
                        Event Registration
                    </h1>
                    <p className="text-gray-400">Register individually or as a group. One payment for all.</p>
                </div>

                {status === 'success' ? (
                    <div className="text-center py-12">
                        <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Registration Successful!</h2>

                        <div className="space-y-4 mb-8">
                            <p className="text-gray-300">Your Mathrix IDs & Tickets:</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {responseIds.map(id => (
                                    <div key={id} className="flex flex-col items-center gap-2">
                                        <span className="bg-white/10 px-4 py-2 rounded-lg font-mono text-pink-400 font-bold border border-white/10">
                                            {id}
                                        </span>
                                        <a
                                            href={`${import.meta.env.VITE_API_URL}/ticket/${id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <FileText size={12} /> Download Ticket
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => window.location.reload()} className="btn bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-bold transition-all">
                            Register More
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* GoofyChess Special Notice */}
                        {/* GoofyChess Special Notice */}
                        <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 relative z-20">
                            <div>
                                <h3 className="text-xl font-bold text-purple-200">GoofyChess Registration</h3>
                                <p className="text-gray-400 text-sm">Reviewing chess strategies? GoofyChess requires a separate registration.</p>
                            </div>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowGoofyModal(!showGoofyModal)}
                                    className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2"
                                >
                                    Register for GoofyChess
                                    <span className={`transition-transform duration-200 ${showGoofyModal ? 'rotate-180' : ''}`}>▼</span>
                                </button>

                                {/* GoofyChess Dropdown */}
                                <AnimatePresence>
                                    {showGoofyModal && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-purple-500/30 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col"
                                        >
                                            <a
                                                href="https://docs.google.com/forms/d/e/1FAIpQLSc9wm2KH6XahNNPJDH9FvxmeyhZpUc6InLuQ0etp-MCiwIkMQ/viewform"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-3 hover:bg-purple-500/20 text-gray-200 hover:text-white transition-colors text-sm font-bold border-b border-white/5"
                                                onClick={() => setShowGoofyModal(false)}
                                            >
                                                CEG Student
                                            </a>
                                            <a
                                                href="https://docs.google.com/forms/d/e/1FAIpQLSdV8tGhhyyg1GVBlFpGOsaJyGK1j9SZLRJW7xaH4sxfVBHQvA/viewform"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-3 hover:bg-purple-500/20 text-gray-200 hover:text-white transition-colors text-sm font-bold"
                                                onClick={() => setShowGoofyModal(false)}
                                            >
                                                Other College
                                            </a>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* 1. College Type Selection (Applies to all) */}
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Users className="text-pink-400" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Step 1: College Category
                                </span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className={`p-4 rounded-xl border cursor-pointer transition-all ${collegeType === 'ceg' ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                    <input type="radio" name="collegeType" value="ceg" checked={collegeType === 'ceg'} onChange={() => setCollegeType('ceg')} className="hidden" />
                                    <div className="text-center font-bold text-lg">CEG Student</div>
                                    <div className="text-center text-sm opacity-70 mt-1">Free</div>
                                </label>
                                <label className={`p-4 rounded-xl border cursor-pointer transition-all ${collegeType === 'other' ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                                    <input type="radio" name="collegeType" value="other" checked={collegeType === 'other'} onChange={() => setCollegeType('other')} className="hidden" />
                                    <div className="text-center font-bold text-lg">Other College</div>
                                    <div className="text-center text-sm opacity-70 mt-1">₹100 / Person</div>
                                    <div className="text-center text-xs text-green-300 mt-1 font-medium">(Lunch Provided both Veg and Non-Veg)</div>
                                </label>
                            </div>
                        </div>

                        {/* 2. Instructions */}
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl space-y-4">
                            <h4 className="font-bold text-yellow-200 flex items-center gap-2 text-lg uppercase tracking-wide">
                                <AlertCircle size={20} /> Important Instructions
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-1 leading-relaxed">
                                <li>Participants are permitted to register for a maximum of three events.</li>
                                <li>The winning team in Math Wizz will be awarded the overall shield.</li>
                                <li>It is the responsibility of the participants to verify that the scheduled events do not overlap in schedule.</li>
                                <li>Participation certificates will be distributed during the Valedictory Function.</li>
                                <li>Kindly refer the schedule before submission.</li>
                                <li>Registration fee is non-refundable.</li>
                                {collegeType === 'ceg' && <li className="text-pink-400 font-bold">Registration is free for CEG students. ID card verification required at the venue.</li>}
                            </ul>

                            <a
                                href={rulebookPdf}
                                download="Mathrix_Rulebook_2026.pdf"
                                className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200 underline underline-offset-4 text-sm font-medium transition-colors mb-4 ml-1"
                            >
                                <Download size={16} /> Download Official Rulebook (PDF)
                            </a>
                            <label className="flex items-center gap-3 p-4 bg-black/20 rounded-xl cursor-pointer hover:bg-black/30 transition-colors border border-white/5 select-none text-white group">
                                <input
                                    type="checkbox"
                                    checked={rulesAccepted}
                                    onChange={(e) => setRulesAccepted(e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-pink-500 rounded border-gray-600 bg-gray-700 focus:ring-0 cursor-pointer group-hover:border-pink-500 transition-colors"
                                />
                                <span className="font-medium">I have read the instructions and agree to follow the guidelines.</span>
                            </label>
                        </div>

                        {/* 3. Attendees List */}
                        <div className={`space-y-6 ${!rulesAccepted ? 'opacity-50 pointer-events-none grayscale' : ''} transition-all duration-300`}>
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <UserPlus className="text-purple-400" />
                                    Step 2: Attendee Details
                                </h3>
                                {attendees.length < (attendees.some(a => a.events.includes("IPL Auction")) ? 4 : 3) && (
                                    <button
                                        type="button"
                                        onClick={addAttendee}
                                        className="btn btn-outline text-sm px-4 py-2 flex items-center gap-2 hover:bg-white/10"
                                    >
                                        <Plus size={16} /> Add Another Person
                                    </button>
                                )}
                            </div>

                            <AnimatePresence>
                                {attendees.map((attendee, index) => (
                                    <motion.div
                                        key={attendee.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-600" />

                                        <div className="flex justify-between items-start mb-6">
                                            <h4 className="text-lg font-bold text-gray-200">Attendee #{index + 1}</h4>
                                            {attendees.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeAttendee(attendee.id)}
                                                    className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Full Name</label>
                                                <input required type="text" value={attendee.fullName} onChange={(e) => handleAttendeeChange(attendee.id, 'fullName', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Email</label>
                                                <input required type="email" value={attendee.email} onChange={(e) => handleAttendeeChange(attendee.id, 'email', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="john@example.com" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Phone</label>
                                                <input required type="tel" value={attendee.phone} onChange={(e) => handleAttendeeChange(attendee.id, 'phone', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="+91 98765 43210" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Year</label>
                                                <select required value={attendee.year} onChange={(e) => handleAttendeeChange(attendee.id, 'year', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all [&>option]:text-black">
                                                    <option value="" disabled>Select Year</option>
                                                    <option value="1">1st Year</option>
                                                    <option value="2">2nd Year</option>
                                                    <option value="3">3rd Year</option>
                                                    <option value="4">4th Year</option>
                                                    <option value="5">5th Year</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Course</label>
                                                <input required type="text" value={attendee.course} onChange={(e) => handleAttendeeChange(attendee.id, 'course', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="B.E. / B.Tech" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">Specialization</label>
                                                <input required type="text" value={attendee.specialization} onChange={(e) => handleAttendeeChange(attendee.id, 'specialization', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all" placeholder="CSE" />
                                            </div>
                                            {collegeType === 'other' && (
                                                <div className="space-y-1 md:col-span-2 relative">
                                                    <label className="text-xs text-gray-400 uppercase font-bold tracking-wider ml-1">College Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={attendee.college}
                                                        onChange={(e) => handleCollegeInput(attendee.id, e.target.value)}
                                                        onFocus={() => handleCollegeInput(attendee.id, attendee.college)}
                                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500/50 transition-all"
                                                        placeholder="College Name"
                                                    />
                                                    {collegeSuggestions[attendee.id] && collegeSuggestions[attendee.id].length > 0 && (
                                                        <div className="absolute z-50 w-full mt-1 bg-gray-900 border border-white/10 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                                                            {collegeSuggestions[attendee.id].map((college, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                                                                    onClick={() => selectCollege(attendee.id, college)}
                                                                >
                                                                    {college}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-gray-300 text-sm font-medium">Select Events (Max 3)</label>

                                            {attendee.events.map(event => {
                                                const msg = getEventRuleMessage(event);
                                                if (!msg) return null;
                                                return (
                                                    <div key={event} className="mb-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs text-yellow-200 flex items-center gap-2">
                                                        <Info size={14} className="shrink-0" />
                                                        <span>{msg}</span>
                                                    </div>
                                                );
                                            })}

                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                                {eventOptions.map(event => {
                                                    const isSelected = attendee.events.includes(event);
                                                    const deadlinePassed = isEventDeadlinePassed(event);
                                                    const isFull = closedEvents.includes(event);
                                                    const isEventClosed = deadlinePassed || isFull;

                                                    const isMaxReached = attendee.events.length >= 3;
                                                    const isDisabled = (isMaxReached && !isSelected) || isEventClosed;

                                                    return (
                                                        <label key={event} className={`flex items-center space-x-2 p-2 rounded-lg border text-sm cursor-pointer transition-all ${isSelected ? 'bg-pink-500/20 border-pink-500/50 text-white' : 'border-white/5 text-gray-400 hover:bg-white/5'} ${isDisabled ? 'opacity-50 cursor-not-allowed bg-black/20' : ''}`}>
                                                            <input
                                                                type="checkbox"
                                                                value={event}
                                                                checked={isSelected}
                                                                onChange={(e) => handleEventChange(attendee.id, event, e.target.checked)}
                                                                disabled={isDisabled}
                                                                className="hidden"
                                                            />
                                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-pink-500 border-pink-500' : 'border-gray-500'} ${isEventClosed ? 'border-gray-700 bg-gray-800' : ''}`}>
                                                                {isSelected && <CheckCircle size={12} className="text-white" />}
                                                            </div>
                                                            <span className={isEventClosed ? "line-through text-gray-600" : ""}>
                                                                {event}
                                                                {deadlinePassed && <span className="text-red-500/80 text-xs ml-1 no-underline decoration-0 font-bold">(Closed)</span>}
                                                                {isFull && <span className="text-orange-500/80 text-xs ml-1 no-underline decoration-0 font-bold">(Full)</span>}
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* 4. Payment Section - Only for Non-CEG */}
                        {collegeType !== 'ceg' && (
                            <div className={`bg-white/5 p-8 rounded-2xl border border-white/10 space-y-8 ${!rulesAccepted ? 'opacity-50 pointer-events-none grayscale' : ''} transition-all duration-300`}>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                                    Step 3: Payment
                                </h3>

                                <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-black/20 p-6 rounded-xl">
                                    <div className="text-center md:text-left">
                                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Registration Fee</p>
                                        <p className="text-5xl font-mono font-bold text-white">₹{calculateFee()}</p>
                                        <p className="text-sm text-gray-500 mt-2">{attendees.length} Attendee{attendees.length > 1 ? 's' : ''} • ₹100 / Person</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="bg-white p-2 rounded-xl w-40 h-40 mb-2">
                                            <img src={qrCode} alt="QR" className="w-full h-full object-contain" />
                                        </div>
                                        <p className="text-white font-mono font-bold text-sm bg-white/10 px-3 py-1 rounded-lg mb-4">mathrix.ceg@okaxis</p>

                                        {/* Bank Details */}
                                        <div className="text-left text-xs text-gray-400 bg-white/5 p-3 rounded-lg border border-white/10 w-full max-w-xs">
                                            <p className="font-bold text-gray-300 mb-1 border-b border-white/10 pb-1">Alternative: Bank Transfer</p>
                                            <p><span className="text-gray-500">Acc No:</span> <span className="text-white font-mono">10496975761</span></p>
                                            <p><span className="text-gray-500">Name:</span> <span className="text-white">Mathematics Colloquim</span></p>
                                            <p><span className="text-gray-500">Branch:</span> <span className="text-white">Anna University, Chennai</span></p>
                                            <p><span className="text-gray-500">IFSC:</span> <span className="text-white font-mono">SBIN0006463</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-gray-300 text-sm font-medium ml-1">Transaction ID</label>
                                        <input required type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-all font-mono" placeholder="txn_1234567890" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-300 text-sm font-medium ml-1">Payment Screenshot</label>
                                        <div className="relative">
                                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
                                            <label htmlFor="file-upload" className={`w-full flex items-center justify-center gap-2 bg-white/5 border border-dashed ${file ? 'border-green-500 text-green-400' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-3 cursor-pointer hover:bg-white/10 transition-all h-[50px]`}>
                                                <Upload size={20} />
                                                <span className="truncate max-w-[200px]">{file ? file.name : "Upload Screenshot (Required)"}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                <AlertCircle size={20} />
                                <p>{message}</p>
                            </div>
                        )}

                        <button
                            disabled={status === 'uploading' || status === 'submitting' || !rulesAccepted}
                            type="submit"
                            className="w-full btn btn-primary py-4 text-xl font-bold shadow-[0_0_30px_rgba(236,72,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            {status === 'uploading' ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader className="animate-spin" /> Processing Payment...
                                </span>
                            ) : (
                                collegeType === 'ceg' ? 'Register for Free' : `Pay ₹${calculateFee()} & Register`
                            )}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Register;
