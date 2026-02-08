import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, Info, Users, Trophy, FileText, CheckCircle, Terminal, Brain, Database, Palette, Compass, Projector, Sparkles, Sigma, Lightbulb } from 'lucide-react';

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfFWGiBte8C2_82HUeNClMEGVRhpaucNZqvm5UHv_o2aRxvMw/viewform?usp=publish-editor";

    const eventList = [
        {
            id: 1,
            title: 'Query Quest (Session 1)',
            description: 'SQL / query based challenge (Session 1).',
            details: {
                description: 'Query Quest tests SQL knowledge across two rounds: a short MCQ round followed by an execution round using a sample dataset. Qualified participants will get a dataset and problem statements to execute SQL queries.',
                rounds: [
                    { title: 'Round 1 — MCQ (15 mins)', desc: 'Multiple choice questions covering SQL concepts, syntax and fundamentals.' },
                    { title: 'Round 2 — Execution (45 mins)', desc: 'Hands-on SQL tasks using the provided dataset (grouping, joins, aggregation, subqueries).' }
                ],
                rules: [
                    'Individual participation',
                    'No external internet resources during Round 2 (offline dataset)',
                    'Use provided dataset.sql for execution round',
                    'Time limits must be respected'
                ],
                teamSize: 'Individual',
                prize: 'Certificates & Prizes',
                coordinator: 'RM Menaka (+91 8608605321)',
            },
            materials: [
                { label: 'Round 1 — MCQs', href: '/docs/Query_Quest/Round1_MCQs.md' },
                { label: 'Round 2 — Tasks', href: '/docs/Query_Quest/Round2_Tasks.md' },
                { label: 'Dataset (SQL)', href: '/docs/Query_Quest/dataset.sql' },
                { label: 'Schedule & Logistics', href: '/docs/Query_Quest/schedule.md' },
                { label: 'Organizer Contacts', href: '/docs/Query_Quest/organizer_contacts.md' }
            ],
            date: 'February 20, 2026',
            time: '10:30 AM – 11:00 AM',
            location: 'LH-6',
            category: 'Technical',
            icon: Terminal,
            color: 'text-cyan-400'
        },
        {
            id: 2,
            title: 'MagicMatix (Session 1)',
            description: 'MagicMatix crossword challenge (Session 1).',
            details: {
                description: 'MagicMatix blends math and CS wordplay. Round 1 is MCQ/crossword style; Round 2 is an advanced crossword combining numeric and dual-meaning clues.',
                rounds: [
                    { title: 'Round 1 — MCQ / Grid (30 mins)', desc: 'Solve short crossword-style MCQs; top teams advance.' },
                    { title: 'Round 2 — Final Grid (40 mins)', desc: 'Advanced puzzles; fastest top-scoring teams win.' }
                ],
                rules: [
                    'Team of 2 participants',
                    'Answer sheets must be submitted within the time limit',
                    'Tie-breakers: least time, then rapid-fire if needed'
                ],
                teamSize: 'Team of 2',
                prize: 'Certificates & Prizes',
                coordinator: 'Sundhar Balamoorthy (+91 8248629145)'
            },
            materials: [
                { label: 'Round 1 — MCQs', href: '/docs/MagicMatix/Round1_MCQs.md' },
                { label: 'Round 2 — Tasks', href: '/docs/MagicMatix/Round2_Tasks.md' },
                { label: 'Schedule & Logistics', href: '/docs/MagicMatix/schedule.md' },
                { label: 'Organizers', href: '/docs/MagicMatix/organizer_contacts.md' }
            ],
            date: 'February 20, 2026',
            time: '10:30 AM – 11:15 AM',
            location: 'LH-1',
            category: 'General',
            icon: Sparkles,
            color: 'text-pink-400'
        },
        {
            id: 3,
            title: 'Find The Fixed Points (Session 1)',
            description: 'Exploration-based treasure hunt (Prelims + Finals).',
            details: {
                description: 'Find The Fixed Points is a teamwork treasure hunt combining riddles, observation and checkpoints. Preliminary MCQ shortlists teams for the final hunt.',
                rounds: [
                    { title: 'Round 1 — Prelims (MCQ)', desc: 'Aptitude & logical questions to shortlist top teams.' },
                    { title: 'Round 2 — Treasure Hunt (Finals)', desc: 'Checkpoint-based riddles; least time with correct answers wins.' }
                ],
                rules: [
                    'Teams of 2–3 members',
                    'Follow checkpoint rules and verify answers with volunteers',
                    'Top 6 teams from prelims advance to finals'
                ],
                teamSize: '2-3 Members',
                prize: 'Top 3 prizes & certificates',
                coordinator: 'Saathvika (+91 9342271942)'
            },
            materials: [
                { label: 'Round 1 — MCQs', href: '/docs/Find_The_Fixed_Points/Round1_MCQs.md' },
                { label: 'Round 2 — Tasks', href: '/docs/Find_The_Fixed_Points/Round2_Tasks.md' },
                { label: 'Schedule & Logistics', href: '/docs/Find_The_Fixed_Points/schedule_and_logistics.md' },
                { label: 'Organizer Contacts', href: '/docs/Find_The_Fixed_Points/organizer_contacts.md' }
            ],
            date: 'February 20, 2026',
            time: '10:30 AM – 11:15 AM',
            location: 'LH-48',
            category: 'Math',
            icon: Sigma,
            color: 'text-indigo-400'
        },
        {
            id: 4,
            title: 'Through the Lens',
            description: 'Photography / visual contest.',
            details: { description: '', rounds: [], rules: [], teamSize: 'Individual', prize: '', coordinator: '' },
            date: 'February 20, 2026',
            time: 'Up to 1:00 PM',
            location: 'Online',
            category: 'Non Technical',
            icon: Projector,
            color: 'text-orange-400'
        },
        {
            id: 5,
            title: 'Code Mathrix',
            description: 'Collaborative coding challenge with turn-based coding and isolation rules.',
            details: {
                description: 'Teams of 2 solve two interconnected coding problems in turn-based rounds. Isolation rules apply when one member codes.',
                rounds: [
                    { title: 'Round 1 — Prelims (30 mins)', desc: 'MCQs and dry-run problems.' },
                    { title: 'Round 2 — Live (40 mins)', desc: 'Turn-based coding with strict isolation.' }
                ],
                rules: [
                    'Teams of 2 only',
                    'Turn-based: Player1 10m, Player2 10m, repeat',
                    'No communication when one member codes (isolation rule)'
                ],
                teamSize: '2 Members',
                prize: 'Certificates & Prizes',
                coordinator: 'Kishore (+91 8072651532)'
            },
            materials: [
                { label: 'Event Brief', href: '/docs/Code_Mathrix/README.md' }
            ],
            date: 'February 20, 2026',
            time: '11:00 AM – 12:30 PM',
            location: 'Mathematics Dept Lab',
            category: 'Technical',
            icon: Terminal,
            color: 'text-cyan-400'
        },
        {
            id: 6,
            title: 'IPL Auction',
            description: 'High-pressure auction simulation — build a balanced squad within 100cr budget.',
            details: {
                description: 'Teams act as franchise owners to bid for players across 4 sets (WK, BAT, AR, BOWL). Maintain squad composition and budget constraints.',
                rounds: [
                    { title: 'Round 1 — Prelims (30 mins)', desc: 'MCQ qualifier for top 8 franchises.' },
                    { title: 'Round 2 — Live Auction (90 mins)', desc: 'Open-outcry bidding across 4 sets.' }
                ],
                rules: [
                    'Franchise size: exactly 4 members',
                    'Final squad must have 11 players with required composition',
                    'Budget: 100cr total (hard limit)'
                ],
                teamSize: '4 Members (Franchise)',
                prize: 'Prizes for winning franchises',
                coordinator: 'Siva Sudharsan (+91 6369882523)'
            },
            materials: [
                { label: 'Event Brief', href: '/docs/IPL_Auction/README.md' }
            ],
            date: 'February 20, 2026',
            time: '11:00 AM – 1:00 PM',
            location: 'LH-5',
            category: 'Non Technical',
            icon: Sparkles,
            color: 'text-orange-400'
        },
        {
            id: 7,
            title: 'Paper Presentation',
            description: 'Research paper presentations judged on content, delivery and Q&A.',
            details: {
                description: 'Present research or project work; each team gets 7 minutes presentation + 3 minutes Q/A.',
                rounds: [
                    { title: 'Presentation + Q/A', desc: '7 mins presentation, 3 mins Q/A.' }
                ],
                rules: [
                    'Total time per team: 10 minutes',
                    'Follow presentation guidelines and time limits'
                ],
                teamSize: 'Individual or Team',
                prize: 'Certificates & Prizes',
                coordinator: 'Kesavarthini J (+91 9361733387)'
            },
            materials: [
                { label: 'Event Brief', href: '/docs/Paper_Presentation/README.md' }
            ],
            date: 'February 20, 2026',
            time: '11:20 AM – 1:00 PM',
            location: 'Ramanujan Hall',
            category: 'General',
            icon: Projector,
            color: 'text-pink-400'
        },
        {
            id: 8,
            title: 'Find The Fixed Points (Session 2)',
            description: 'Exploration-based treasure hunt (Prelims + Finals).',
            details: {
                description: 'Find The Fixed Points is a teamwork treasure hunt combining riddles, observation and checkpoints. Preliminary MCQ shortlists teams for the final hunt.',
                rounds: [
                    { title: 'Round 1 — Prelims (MCQ)', desc: 'Aptitude & logical questions to shortlist top teams.' },
                    { title: 'Round 2 — Treasure Hunt (Finals)', desc: 'Checkpoint-based riddles; least time with correct answers wins.' }
                ],
                rules: [
                    'Teams of 2–3 members',
                    'Follow checkpoint rules and verify answers with volunteers',
                    'Top 6 teams from prelims advance to finals'
                ],
                teamSize: '2-3 Members',
                prize: 'Top 3 prizes & certificates',
                coordinator: 'Saathvika (+91 9342271942)'
            },
            materials: [
                { label: 'Round 1 — MCQs', href: '/docs/Find_The_Fixed_Points/Round1_MCQs.md' },
                { label: 'Round 2 — Tasks', href: '/docs/Find_The_Fixed_Points/Round2_Tasks.md' },
                { label: 'Schedule & Logistics', href: '/docs/Find_The_Fixed_Points/schedule_and_logistics.md' },
                { label: 'Organizer Contacts', href: '/docs/Find_The_Fixed_Points/organizer_contacts.md' }
            ],
            date: 'February 20, 2026',
            time: '11:20 AM – 12:20 PM',
            location: 'LH-48',
            category: 'Math',
            icon: Sigma,
            color: 'text-indigo-400'
        },
        {
            id: 9,
            title: 'Mathkinator',
            description: 'Identify mathematicians or concepts using yes/no/maybe questioning.',
            details: {
                description: 'Teams frame strategic questions to guess mathematical concepts or personalities under a question limit.',
                rounds: [
                    { title: 'Round 1 — Concept Guessing', desc: 'Yes/No/Maybe format for concepts.' },
                    { title: 'Round 2 — Personality Guessing', desc: 'Identify famous mathematicians.' }
                ],
                rules: [
                    'Team size: 4–5 members',
                    'Limited questions per item (2 questions before final guess)'
                ],
                teamSize: '4-5 Members',
                prize: 'Certificates & Prizes',
                coordinator: 'Madhan M (+91 9047937541)'
            },
            materials: [
                { label: 'Event Brief', href: '/docs/Mathkinator/README.md' }
            ],
            date: 'February 20, 2026',
            time: '11:30 AM – 1:00 PM',
            location: 'LH-2',
            category: 'Non Technical',
            icon: Lightbulb,
            color: 'text-yellow-500'
        },
        {
            id: 10,
            title: 'Math Quiz (Session 1)',
            description: 'Competitive math quiz testing aptitude and speed. Teams of 3.',
            details: {
                description: 'Preliminary written round followed by main quiz formats; judged on accuracy and speed.',
                rounds: [
                    { title: 'Round 1 — Prelims (20 mins)', desc: 'Written prelims.' },
                    { title: 'Round 2 — Main (1 hr 45 mins)', desc: 'Main quiz rounds and formats.' }
                ],
                rules: [
                    'Team size: 3',
                    'Follow quiz rules and time limits'
                ],
                teamSize: '3 Members',
                prize: 'Certificates & Prizes',
                coordinator: 'Safrin S (+91 8667004235)'
            },
            materials: [
                { label: 'Event Brief', href: '/docs/Math_Quiz/README.md' }
            ],
            date: 'February 20, 2026',
            time: '11:45 AM – 12:40 PM',
            location: 'Drawing Hall',
            category: 'Math',
            icon: Sigma,
            color: 'text-indigo-400'
        },
        {
            id: 11,
            title: 'GoofyChess',
            description: 'Chess event combining online variants and a final offline classical round.',
            details: {
                description: 'Progresses from Racing Kings and Crazyhouse online variants to a final offline Standard Chess showdown for top players.',
                rounds: [
                    { title: 'Round 1 — Racing Kings (Online)', desc: '30 mins' },
                    { title: 'Round 2 — Crazyhouse (Online)', desc: '30 mins' },
                    { title: 'Final — Standard Chess (Offline)', desc: '1 hour' }
                ],
                rules: [
                    'Follow variant-specific rules for online rounds',
                    'Top players advance through each round'
                ],
                teamSize: 'Individual',
                prize: 'Certificates & Prizes',
                coordinator: 'Bathmasree R (+91 8608349376)'
            },
            materials: [
                { label: 'Event Brief', href: '/docs/GoofyChess/README.md' }
            ],
            date: 'February 20, 2026',
            time: '12:00 PM – 1:00 PM',
            location: 'Online + Drawing Hall-13',
            category: 'Non Technical',
            icon: Users,
            color: 'text-orange-400'
        },
        {
            id: 12,
            title: 'Query Quest (Session 2)',
            description: 'SQL / query based challenge (Session 2).',
            details: {
                description: 'Query Quest tests SQL knowledge across two rounds: a short MCQ round followed by an execution round using a sample dataset. Qualified participants will get a dataset and problem statements to execute SQL queries.',
                rounds: [
                    { title: 'Round 1 — MCQ (15 mins)', desc: 'Multiple choice questions covering SQL concepts, syntax and fundamentals.' },
                    { title: 'Round 2 — Execution (45 mins)', desc: 'Hands-on SQL tasks using the provided dataset (grouping, joins, aggregation, subqueries).' }
                ],
                rules: [
                    'Individual participation',
                    'No external internet resources during Round 2 (offline dataset)',
                    'Use provided dataset.sql for execution round',
                    'Time limits must be respected'
                ],
                teamSize: 'Individual',
                prize: 'Certificates & Prizes',
                coordinator: 'RM Menaka (+91 8608605321)',
            },
            materials: [
                { label: 'Round 1 — MCQs', href: '/docs/Query_Quest/Round1_MCQs.md' },
                { label: 'Round 2 — Tasks', href: '/docs/Query_Quest/Round2_Tasks.md' },
                { label: 'Dataset (SQL)', href: '/docs/Query_Quest/dataset.sql' },
                { label: 'Schedule & Logistics', href: '/docs/Query_Quest/schedule.md' },
                { label: 'Organizer Contacts', href: '/docs/Query_Quest/organizer_contacts.md' }
            ],
            date: 'February 20, 2026',
            time: '12:00 PM – 1:00 PM',
            location: 'RCC Lab',
            category: 'Technical',
            icon: Terminal,
            color: 'text-cyan-400'
        },
        {
            id: 13,
            title: 'MagicMatix (Session 2)',
            description: 'MagicMatix crossword challenge (Session 2).',
            details: {
                description: 'MagicMatix blends math and CS wordplay. Round 1 is MCQ/crossword style; Round 2 is an advanced crossword combining numeric and dual-meaning clues.',
                rounds: [
                    { title: 'Round 1 — MCQ / Grid (30 mins)', desc: 'Solve short crossword-style MCQs; top teams advance.' },
                    { title: 'Round 2 — Final Grid (40 mins)', desc: 'Advanced puzzles; fastest top-scoring teams win.' }
                ],
                rules: [
                    'Team of 2 participants',
                    'Answer sheets must be submitted within the time limit',
                    'Tie-breakers: least time, then rapid-fire if needed'
                ],
                teamSize: 'Team of 2',
                prize: 'Certificates & Prizes',
                coordinator: 'Sundhar Balamoorthy (+91 8248629145)'
            },
            materials: [
                { label: 'Round 1 — MCQs', href: '/docs/MagicMatix/Round1_MCQs.md' },
                { label: 'Round 2 — Tasks', href: '/docs/MagicMatix/Round2_Tasks.md' },
                { label: 'Schedule & Logistics', href: '/docs/MagicMatix/schedule.md' },
                { label: 'Organizers', href: '/docs/MagicMatix/organizer_contacts.md' }
            ],
            date: 'February 20, 2026',
            time: '12:00 PM – 1:00 PM',
            location: 'LH-1',
            category: 'General',
            icon: Sparkles,
            color: 'text-pink-400'
        },
        {
            id: 14,
            title: 'Math Quiz (Session 2)',
            description: 'Math Quiz Session 2.',
            details: { description: '', rounds: [], rules: [], teamSize: '3 Members', prize: '', coordinator: '' },
            date: 'February 20, 2026',
            time: '2:30 PM – 3:00 PM',
            location: 'Vivek Audi',
            category: 'Math',
            icon: Sigma,
            color: 'text-indigo-400'
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

                                                {selectedEvent.materials && selectedEvent.materials.length > 0 && (
                                                    <section>
                                                        <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                                                            <FileText size={20} /> Materials
                                                        </h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            {selectedEvent.materials.map((m, i) => (
                                                                <button
                                                                    key={i}
                                                                    onClick={() => window.open(m.href, '_blank')}
                                                                    className="text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-sm font-medium"
                                                                >
                                                                    {m.label}
                                                                </button>
                                                            ))}
                                                        </div>
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
