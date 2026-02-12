import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, Info, Users, Trophy, FileText, CheckCircle, Terminal, Brain, Database, Palette, Compass, Projector, Sparkles, Sigma, Lightbulb, Crown, Camera } from 'lucide-react';

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    const eventList = [
        {
            id: 1,
            title: 'SQL – Query Quest',
            description: 'A technical event designed to test participants understanding of DBMS and SQL through competitive rounds.',
            details: {
                description: 'SQL – Query Quest is a technical event designed to test participants understanding of Database Management Systems and Structured Query Language (SQL). The event evaluates conceptual knowledge, logical thinking, and practical query execution skills through competitive rounds.',
                rounds: [
                    { title: 'Round 1: MCQ (15 mins)', desc: 'MCQs on SQL basics.' },
                    { title: 'Round 2: Execution (45 mins)', desc: 'Execute SQL queries on real datasets.' },
                    { title: 'Tie-Breaker (5-10 mins)', desc: 'Quick-fire verbal prediction of query outputs.' }
                ],
                rules: [
                    'Accuracy of answers is critical.',
                    'Correctness of SQL queries and output.',
                    'Logical approach and time efficiency.'
                ],
                teamSize: 'Individual',
                judging: 'Accuracy, Correctness of SQL queries, Logical approach, Time efficiency.',
                prize: '1st, 2nd, 3rd Prizes + Certificates.',
                coordinator: 'RM Menaka (8608605321), Madhumitha V (9597925317), Janakiram (9042279123)',
                volunteers: 'Divya (9159676133), Bhavana (8056679807), Uma Maheswari (9159935736), Roshini (7904199432)'
            },
            date: 'February 20, 2026',
            time: '10:30 AM & 12:00 PM',
            location: 'LH-6 / RCC Lab',
            category: 'Technical',
            icon: Database,
            color: 'text-emerald-400'
        },
        {
            id: 2,
            title: 'MagicMatix',
            description: 'Where logic meets mathematics in unique crossword challenges bridging Math and Computer Science.',
            details: {
                description: 'MagicMatix is a dynamic event where logic meets mathematics in an exhilarating new way. It invites teams to showcase their reasoning and problem-solving skills through a series of unique crossword challenges. By bridging the gap between numerical precision and the dual-meanings of Computer Science, this event fosters collaboration and sharp thinking in a truly stunning manner.',
                rounds: [
                    { title: 'Round 1: Number Crossword (30 mins)', desc: 'Solve crossword using ONLY numbers. Top 10 teams advance.' },
                    { title: 'Round 2: Acronym Crossword (40 mins)', desc: 'Fill with acronyms blending Math & CS. Top 3 win.' }
                ],
                rules: [
                    'Round 1: Fill with numbers only. Ignore decimals, powers, special symbols.',
                    'Round 2: Answers must be acronyms with dual meanings.',
                    'Team Size: Strictly 2 members.',
                    'Tie-Breaker: Least time taken, then 5-question rapid fire.',
                    'Malpractice leads to immediate disqualification.'
                ],
                teamSize: 'Team of 2',
                judging: 'Score based. Top 10 for R2, Top 3 for Prizes. Tie-breaker by time.',
                prize: '1st, 2nd, 3rd Prizes + Certificates.',
                coordinator: 'Sundhar Balamoorthy (82486 29145), Adithya B (63817 86659), Kiruthiga (73051 57283)',
                volunteers: 'Boobeswaran (99622 16367)'
            },
            date: 'February 20, 2026',
            time: '10:30 AM & 12:00 PM',
            location: 'LH-1',
            category: 'General',
            icon: Sparkles,
            color: 'text-purple-400'
        },
        {
            id: 3,
            title: 'Code Mathrix',
            description: 'Decode. Divide. Conquer. A collaborative coding challenge testing logic, coordination, and problem-solving.',
            details: {
                description: 'Code Mathrix is a collaborative coding challenge that tests logic, coordination, and problem-solving. Teams solve two interconnected problems by completing partial code in turns under strict isolation rules. Success depends on clear thinking, teamwork, and seamless code continuity under time pressure.',
                rounds: [
                    { title: 'Round 1: Prelims (30 mins)', desc: 'Logic-based MCQs and dry-run coding problems. Scored on accuracy and completion time.' },
                    { title: 'Round 2: Live Coding (40 mins)', desc: '2 DSA problems with turn-based coding (10 min swaps). Evaluated on logic, execution, and submission time.' }
                ],
                rules: [
                    'Teams must consist of 2 members only.',
                    'Problem statement split into two parts - each member gets different part.',
                    'Turn-Based: Player 1 codes 10 mins, then Player 2. Cycle repeats.',
                    'Isolation Rule: When one codes, other must stay away - no viewing, no communication.',
                    'Higher accuracy wins. If tied, least completion time wins.'
                ],
                teamSize: '2 Members per Team',
                judging: 'Logic, Execution, Time, Code Continuity.',
                prize: 'Certificates + Prizes for Top 3.',
                coordinator: 'Kishore (8072651532)',
                volunteers: '5 Volunteers'
            },
            date: 'February 20, 2026',
            time: '11:00 AM – 12:30 PM',
            location: 'Mathematics Dept Lab',
            category: 'Technical',
            icon: Terminal,
            color: 'text-cyan-400'
        },
        {
            id: 4,
            title: 'Through the Lens',
            description: 'An online photography event celebrating creativity, perspective, and visual storytelling.',
            details: {
                description: 'Through the Lens is an online photography event that celebrates creativity, perspective, and visual storytelling. Participants submit their best photographs based on given themes, showcasing their ability to capture moments that tell compelling stories through imagery.',
                rounds: [
                    { title: 'Online Submission', desc: 'Submit photographs based on the announced theme before deadline (19th Feb 6:00 PM).' }
                ],
                rules: [
                    'Photographs must be original work.',
                    'Basic editing allowed, heavy manipulation prohibited.',
                    'Submit high-resolution images.',
                    'Theme will be announced before submission window.',
                    'Each participant can submit up to 3 photographs.'
                ],
                teamSize: 'Individual',
                judging: 'Creativity, Composition, Theme relevance, Technical quality.',
                prize: '1st, 2nd, 3rd Prizes + Certificates.',
                coordinator: 'Event Coordinator (TBA)'
            },
            date: 'February 20, 2026',
            time: 'Online - Deadline: 19th Feb 6:00 PM',
            location: 'Online',
            category: 'Non Technical',
            icon: Camera,
            color: 'text-rose-400'
        },
        {
            id: 5,
            title: 'IPL Auction',
            description: 'The Ultimate Bidding War - A high-pressure competitive simulation testing analytical speed, financial management, and strategic decision-making.',
            details: {
                description: 'IPL Auction: The Ultimate Bidding War! A high-pressure two-stage competitive simulation designed to test analytical speed, financial management, and strategic decision-making. Participants act as franchise owners, navigating a preliminary qualification round followed by a live auction to build a balanced 8-player squad within 85cr budget.',
                rounds: [
                    { title: 'Round 1: Prelims [The Qualifier]', desc: 'MCQ-based assessment testing cricket statistics and player data. Top franchises advance to Main Auction.' },
                    { title: 'Round 2: The Main Auction', desc: 'Live open-outcry bidding simulation across 4 sets. Players without bids are immediately removed.' }
                ],
                rules: [
                    'Franchise must have exactly 4 members (all must be present).',
                    'Total Purse: 85cr (non-negotiable).',
                    'Squad: Exactly 8 players - 3 Batsmen, 3 Bowlers, 1 All-Rounder, 1 WK.',
                    'Minimum 1 uncapped player, Maximum 3 overseas players.',
                    'Players without bids are immediately removed from the auction.'
                ],
                disqualification: [
                    'Budget Overflow: Exceeding the 85cr purse limit at any point.',
                    'Roster Failure: Failing to reach exactly 8 players by the end of Set 4.',
                    'Category Overflow: Attempting to buy more players than allowed in a specific category.',
                    'Diversity Breach: Exceeding 3 overseas players or failing to secure an uncapped player.',
                    'Team Integrity: Having fewer or more than 4 members in the management team.'
                ],
                teamSize: '4 Members per Franchise',
                judging: 'Highest Cumulative Player Credits wins. Tie-breaker: Higher remaining purse. Event In-charges decision is final.',
                prize: '1st, 2nd, 3rd Prizes.',
                coordinators: ['Siva Sudharsan S (6369882523)', 'Sankara Shivani C A (8056112999)'],
                volunteers: 'Nandakishore (8248227885), Soorya V (9080798813), Kishore B (6379869605), Ashvan P (9361248774), Harish B (9585890339), Santhosh J (6385422344), Arul Prasanth (8015636015), Madhavan M (8610824066)'
            },
            date: 'February 20, 2026',
            time: '11:00 AM – 1:00 PM',
            location: 'LH-5',
            category: 'Non Technical',
            icon: Crown,
            color: 'text-yellow-400'
        },
        {
            id: 6,
            title: 'Paper Presentation',
            description: 'A platform for students to showcase their research and innovative ideas in technology and related fields.',
            details: {
                description: 'Paper presentation is a platform for students to showcase their research and innovative ideas in technology and related fields. Participants will present their papers on given themes, promoting knowledge sharing and discussion.',
                rounds: [
                    { title: 'Single Round (10 mins per team)', desc: '7 minutes for paper presenting + 3 minutes for Q&A.' }
                ],
                rules: [
                    'Topic selected from given themes.',
                    'Presentation should be original.',
                    'Bring soft copy of presentation (PPT/PDF).',
                    'Plagiarism leads to disqualification.',
                    'Report 30 minutes before event starts.'
                ],
                topics: [
                    {
                        category: "General / Technical",
                        themes: [
                            "1. AI Transforming the IT Sector: Innovation and Implementation Challenges.",
                            "2. Smart Security: How AI Detects and Prevents Cyber Threats."
                        ]
                    },
                    {
                        category: "Mathematics",
                        themes: [
                            "1. The influence of Mathematics in building smart and sustainable systems",
                            "2. The impact of Mathematics on digital innovation and transformation"
                        ]
                    }
                ],
                note: "Send your PPT/PDF to mathrix.paperpresentation@gmail.com on or before 19th February.",
                teamSize: 'Individual or Team of 2',
                judging: 'Content (40%): Originality, technical depth, relevance. Presentation (30%): Clarity, organization. Q&A (30%): Understanding, response quality.',
                prize: '1st, 2nd, 3rd Prizes + Certificates.',
                coordinator: 'Kesavarthini J (9361733387), Jeysri G S (8438153565), Sri Aishwarya M (8825775704)'
            },
            date: 'February 20, 2026',
            time: '11:20 AM – 1:00 PM',
            location: 'Ramanujan Hall',
            category: 'General',
            icon: Projector,
            color: 'text-blue-400'
        },
        {
            id: 7,
            title: 'GoofyChess',
            description: 'An engaging chess-based strategy event testing tactical thinking, adaptability, and decision-making skills.',
            details: {
                description: 'GoofyChess is an engaging chess-based strategy event designed to test players\u2019 tactical thinking, adaptability, and decision-making skills. The event features Classic Chess played across both online and offline formats, offering participants a balanced challenge that emphasizes strategic depth, concentration, and sportsmanship.',
                rounds: [
                    { title: 'Round 1: Classic Chess (Online, 1 hr)', desc: 'Round 1 will be conducted in the standard Classic Chess format in online mode. All matches will be played according to standard chess rules. Players are expected to maintain fair play and sportsmanship throughout the games.' },
                    { title: 'Round 2: Classic Chess (Offline, 1 hr)', desc: 'Round 2 will be conducted offline in the standard Classic Chess format. Matches will be played according to standard chess rules, and the decisions of the organizers shall be final.' }
                ],
                rules: [
                    'Any use of bots or external assistance will result in immediate disqualification.',
                    'All decisions taken by the organizers are final and binding.',
                    'Participants may approach the organizers for clarification in case of any doubts.'
                ],
                teamSize: 'Individual',
                judging: 'Match results, standard chess scoring.',
                prize: '1st, 2nd, 3rd Prize + Certificate.',
                coordinator: 'Bathmasree R (8608349376), Nandha kishore R R (8248227885), Ezhil Jeevana S (6369642347), Jeevika (9789384379)',
                volunteers: 'Sundhar Balamoorthy (82486 29145), Ecilaise S (7200229041), Sahana Ramanathan (9962911497), Mohammad Nihal (6383366723)'
            },
            date: 'February 20, 2026',
            time: '12:00 PM – 1:00 PM',
            location: 'Online + Drawing Hall-13',
            category: 'Non Technical',
            icon: Brain,
            color: 'text-orange-400'
        },
        {
            id: 8,
            title: 'Math Quiz',
            description: 'Test your aptitude, mathematical knowledge, and speed in this competitive quiz event.',
            details: {
                description: 'Math Quiz is a competitive and engaging technical event designed to test participants aptitude, mathematical knowledge, speed, and logical reasoning. The event consists of a preliminary written round followed by a main quiz round featuring various quiz formats.',
                rounds: [
                    { title: 'Round 1: Prelims (20 mins)', desc: 'Written MCQ test covering Quantitative Aptitude, Core Mathematics, General Math.' },
                    { title: 'Round 2: Mains (1hr 45mins)', desc: 'Various formats: Identify Mathematician, Find Error in Theorem, Rapid Fire (10 Qs in 60s), Buzzer rounds.' }
                ],
                rules: [
                    'Team Size: 3 members per team.',
                    'Prelims: Written MCQ test.',
                    'Mains: Visual rounds, rapid fire, buzzer rounds.',
                    'Malpractice leads to disqualification.'
                ],
                teamSize: '3 Members per Team',
                judging: 'Accuracy, Speed, Logical Reasoning, Teamwork, Time Management.',
                prize: '1st, 2nd, 3rd Prizes.',
                coordinator: 'Safrin S (8667004235)',
                volunteers: '5 Volunteers'
            },
            date: 'February 20, 2026',
            time: '11:45 AM & 2:30 PM',
            location: 'Drawing Hall / Vivek Audi',
            category: 'Math',
            icon: Sigma,
            color: 'text-indigo-400'
        },
        {
            id: 9,
            title: 'Find The Fixed Points (Treasure Hunt)',
            description: 'An exploration-based team event blending logic, observation, teamwork, and quick decision-making.',
            details: {
                description: 'The Find The Fixed Points is an exploration-based team event that blends logic, observation, teamwork, and quick decision-making. Participants follow clues, solve riddles, and navigate through checkpoints to uncover the final treasure. Speed matters—but strategy, accuracy, and coordination decide the champions.',
                rounds: [
                    { title: 'Round 1: Prelims', desc: 'MCQ Aptitude Questions. 6 teams with maximum marks selected for next round.' },
                    { title: 'Round 2: Final Trail', desc: 'Follow clues, solve riddles at checkpoints. First team to reach final treasure with all clues solved wins.' }
                ],
                rules: [
                    'Team Size: 2-3 members per team.',
                    'Mobile phones prohibited unless specified.',
                    'Stay within designated hunt area.',
                    'Do not share clues with other teams.',
                    'Do not tamper with or remove clues from checkpoints.'
                ],
                teamSize: '2-3 Members per Team',
                judging: 'Speed, Strategy, Accuracy, Coordination. Top 3 places awarded.',
                prize: '1st, 2nd, 3rd Prizes.',
                coordinator: 'Saathvika (93422 71942)',
                volunteers: '8 Volunteers'
            },
            date: 'February 20, 2026',
            time: '10:30 AM & 11:20 AM',
            location: 'LH-48',
            category: 'Math',
            icon: Compass,
            color: 'text-green-400'
        },
        {
            id: 10,
            title: 'Mathkinator',
            description: 'An interactive brain-teasing event inspired by Akinator. Identify mathematicians and concepts using strategic questioning.',
            details: {
                description: 'Mathkinator is an interactive and brain-teasing event inspired by Akinator, where participants identify famous mathematicians or mathematical concepts using logical thinking and strategic questioning. The event encourages teamwork, reasoning, and problem-solving in a fun and competitive way.',
                rounds: [
                    { title: 'Round 1: Prelims - Concept Guessing (20-25 mins)', desc: 'Yes/No/Maybe questioning. Identify 5 concepts (Infinity, Prime Numbers, Pi, Calculus, etc.). Only 5 questions per item.' },
                    { title: 'Round 2: Finals - Personality Guessing (20 mins)', desc: 'Identify 5 famous mathematicians (Euclid, Gauss, Newton, Ramanujan, Ada Lovelace). Only 5 questions per personality.' }
                ],
                rules: [
                    'Format: Yes/No/Maybe questioning only.',
                    'Only 5 questions allowed per item before final guess.',
                    'Lowest scores eliminated after Round 1.',
                    'Bonus points for faster correct responses.'
                ],
                teamSize: '4-5 Members per Team',
                judging: 'Accuracy, logic in questioning, teamwork, time taken.',
                prize: '1st, 2nd, 3rd Prizes.',
                coordinator: 'Madhan M (9047937541)',
                volunteers: '5 Volunteers'
            },
            date: 'February 20, 2026',
            time: '11:30 AM – 1:00 PM',
            location: 'LH-2',
            category: 'Non Technical',
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
                                        <span>
                                            {(event.details.coordinators ? event.details.coordinators[0] : event.details.coordinator).split('(')[0].trim()}
                                            {event.details.coordinators && event.details.coordinators.length > 1 && ' +'}
                                        </span>
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

                                                {selectedEvent.details.topics && selectedEvent.details.topics.length > 0 && (
                                                    <section>
                                                        <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
                                                            <Lightbulb size={20} /> Presentation Themes
                                                        </h3>
                                                        <div className="space-y-4">
                                                            {selectedEvent.details.topics.map((topicGroup, idx) => (
                                                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                                    <h4 className="font-bold text-white mb-2 underline decoration-blue-500/50 underline-offset-4">{topicGroup.category}</h4>
                                                                    <ul className="list-none space-y-2 text-gray-300">
                                                                        {topicGroup.themes.map((theme, tIdx) => (
                                                                            <li key={tIdx} className="text-sm pl-2 border-l-2 border-gray-700">{theme}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                )}

                                                {selectedEvent.details.note && (
                                                    <section className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                                                        <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                                                            <Info size={18} /> Note
                                                        </h3>
                                                        <p className="text-gray-300 text-sm">
                                                            {selectedEvent.details.note}
                                                        </p>
                                                    </section>
                                                )}

                                                {selectedEvent.details.disqualification && selectedEvent.details.disqualification.length > 0 && (
                                                    <section>
                                                        <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                                                            <X size={20} /> Disqualification Clauses
                                                        </h3>
                                                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                                                            {selectedEvent.details.disqualification.map((item, idx) => (
                                                                <li key={idx} className="marker:text-red-500">{item}</li>
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
                                                            {selectedEvent.details.coordinators ? (
                                                                <ul className="text-white font-medium list-disc list-inside">
                                                                    {selectedEvent.details.coordinators.map((coord, idx) => (
                                                                        <li key={idx}>{coord}</li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p className="text-white font-medium">{selectedEvent.details.coordinator}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => navigate('/register')}
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
