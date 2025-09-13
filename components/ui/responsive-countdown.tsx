import React, { useState, useEffect } from 'react';

const ResponsiveCountdown = () => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        const difference = endOfMonth.getTime() - now.getTime();

        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formatTime = (time: number) => String(time).padStart(2, '0');

    const timerComponents: { value: number; label: string }[] = [];

    Object.entries(timeLeft).forEach(([interval, value]) => {
      timerComponents.push({value, label: interval[0].toUpperCase()});
    });

    if (!timerComponents.length) return null;

    return (
        <div className="lg:hidden w-full flex justify-center py-3 bg-black/50 backdrop-blur-sm relative z-10 border-b border-white/10">
          <div className="flex items-center gap-4">
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-widest">Season Ends In:</h4>
            <div className="flex items-baseline gap-1.5 font-mono text-lg">
                {timerComponents.map(({value, label}, index) => (
                    <React.Fragment key={label}>
                        <div className="flex items-baseline">
                            <span className="font-bold text-white [text-shadow:0_0_8px_rgba(255,255,255,0.7)]">{formatTime(value)}</span>
                            <span className="text-[10px] text-white/50 ml-0.5">{label}</span>
                        </div>
                        {index < timerComponents.length - 1 && <span className="text-white/50 text-sm -mx-0.5">:</span>}
                    </React.Fragment>
                ))}
            </div>
          </div>
        </div>
    );
};

export default ResponsiveCountdown;