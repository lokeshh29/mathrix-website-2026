import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        try {
            const difference = +new Date("2026-02-20T00:00:00") - +new Date();
            let timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return timeLeft;
        } catch (error) {
            console.error("Timer calculation error:", error);
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimerBox = ({ label, value }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="glass-card w-16 h-16 md:w-24 md:h-24 flex items-center justify-center mb-2 bg-white/5 border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.15)] backdrop-blur-md rounded-xl">
                <span className="text-xl md:text-3xl font-bold text-white font-tech">
                    {String(value).padStart(2, '0')}
                </span>
            </div>
            <span className="text-[10px] md:text-sm uppercase tracking-widest text-pink-300 font-medium">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex justify-center flex-wrap mt-8 mb-4 animate-in fade-in zoom-in duration-1000">
            <TimerBox label="Days" value={timeLeft.days} />
            <TimerBox label="Hours" value={timeLeft.hours} />
            <TimerBox label="Minutes" value={timeLeft.minutes} />
            <TimerBox label="Seconds" value={timeLeft.seconds} />
        </div>
    );
};

export default CountdownTimer;
