
import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { User, BranchLeaderboardItem, TopCreatorLeaderboardItem } from '../../lib/data';

interface LeaderboardUser {
  rank: number;
  handle: string;
  avatarUrl: string;
  name: string;
  score: string;
}

interface LeaderboardSidebarProps {
  topCreators: (LeaderboardUser | TopCreatorLeaderboardItem)[];
  currentUser: LeaderboardUser | null;
  loggedInUser: User;
}

const getRankStyling = (rank: number) => {
    switch (rank) {
        case 1:
            return 'text-yellow-300 [text-shadow:0_0_5px_#fef08a,0_0_12px_#facc15]';
        case 2:
            return 'text-slate-200 [text-shadow:0_0_5px_#e2e8f0,0_0_12px_#d1d5db]';
        case 3:
            return 'text-amber-400 [text-shadow:0_0_5px_#fbbf24,0_0_12px_#f59e0b]';
        default:
            return 'text-white/50';
    }
};

const CountdownTimer = () => {
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
        <div className="text-center mb-4">
          <h4 className="text-xs font-semibold text-blue-300/80 uppercase tracking-widest mb-2">Season Ends In</h4>
          <div className="flex justify-center items-center gap-1.5 font-mono text-xl">
              {timerComponents.map(({value, label}, index) => (
                  <React.Fragment key={label}>
                      <div className="flex flex-col items-center w-10">
                          <span className="font-bold text-white [text-shadow:0_0_6px_#60a5fa,0_0_12px_#bfdbfe]">{formatTime(value)}</span>
                          <span className="text-[10px] text-blue-200/50">{label}</span>
                      </div>
                      {index < timerComponents.length - 1 && <span className="text-blue-400/70 -mt-2.5">:</span>}
                  </React.Fragment>
              ))}
          </div>
        </div>
    );
};


const LeaderboardSidebar: React.FC<LeaderboardSidebarProps> = ({ topCreators, currentUser, loggedInUser }) => {
  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.location.hash = path;
  };
  
  // A bit of a hack to satisfy TypeScript, as topCreators is enriched in the parent
  const enrichedTopCreators = topCreators as LeaderboardUser[];
  
  // This is a placeholder since we removed the static data. In a real app, this would also come from the API.
  const branchesLeaderboardData: BranchLeaderboardItem[] = [
    { rank: 1, name: 'CSE', score: '45.2k' },
    { rank: 2, name: 'IT', score: '32.1k' },
    { rank: 3, name: 'AIDS', score: '28.9k' },
    { rank: 4, name: 'ACSE', score: '25.6k' },
  ];

  return (
    <aside className="fixed top-28 right-6 w-64 z-30 hidden lg:block shadow-[0_0_45px_-10px_rgba(59,130,246,0.4),_0_0_20px_-10px_rgba(255,255,255,0.6)] rounded-2xl">
      <div className="w-full h-full p-px rounded-2xl bg-gradient-to-br from-blue-500/50 via-transparent to-transparent">
        <div className="w-full h-full bg-gradient-to-b from-blue-950/20 to-black/60 backdrop-blur-2xl rounded-2xl p-4 text-white">
          <CountdownTimer />
          
          <div className="w-full my-3 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

          <h3 className="text-lg font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-white tracking-wider">
            Top Creators
          </h3>
          
          <ul className="space-y-1">
            {enrichedTopCreators.map((user) => (
              <li key={user.rank}>
                <a 
                  href={`#profile/${user.handle}`} 
                  onClick={(e) => navigate(e, `#profile/${user.handle}`)}
                  className="flex items-center gap-3 group rounded-lg p-2 -m-2 hover:bg-blue-500/10 transition-colors duration-200"
                >
                  <span className={cn("font-black text-xl w-6 text-center", getRankStyling(user.rank))}>
                    {user.rank}
                  </span>
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-300/20 group-hover:border-blue-400 transition-all duration-300" 
                  />
                  <div className="flex-grow overflow-hidden">
                    <p className="font-semibold text-sm truncate text-white group-hover:text-blue-300 transition-colors">{user.name}</p>
                    <p className="text-xs text-white/60 font-mono">{user.score} pts</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          
          <div className="w-full my-4 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          
          {loggedInUser.role === 'mentor' ? (
              <div>
                <h4 className="text-xs font-semibold text-center mb-2 text-blue-300/80 uppercase tracking-widest">Department Ranks</h4>
                <ul className="space-y-1">
                    {branchesLeaderboardData.map((branch) => {
                        const isMentorDepartment = branch.name === loggedInUser.department;
                        return (
                            <li 
                                key={branch.name}
                                className={cn(
                                    "flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200",
                                    isMentorDepartment 
                                        ? "bg-blue-900/40 border border-blue-500/40"
                                        : "bg-transparent border border-transparent"
                                )}
                            >
                                <span className={cn("font-black text-xl w-6 text-center", getRankStyling(branch.rank))}>
                                    {branch.rank}
                                </span>
                                <div className="flex-grow overflow-hidden">
                                    <p className={cn(
                                        "font-semibold text-sm truncate",
                                        isMentorDepartment ? "text-blue-300" : "text-white"
                                    )}>{branch.name}</p>
                                </div>
                                <p className="text-xs text-white/60 font-mono">{branch.score}</p>
                            </li>
                        );
                    })}
                </ul>
              </div>
            ) : currentUser ? (
              <div>
                <h4 className="text-xs font-semibold text-center mb-2 text-blue-300/80 uppercase tracking-widest">Your Rank</h4>
                <a 
                    href={`#profile/${currentUser.handle}`} 
                    onClick={(e) => navigate(e, `#profile/${currentUser.handle}`)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-900/20 border border-blue-500/20 hover:bg-blue-800/20 hover:border-blue-500/30 transition-all duration-200"
                  >
                  <span className={cn("font-black text-xl w-6 text-center text-white", "[text-shadow:0_0_6px_#60a5fa,0_0_12px_#bfdbfe]")}>
                    {currentUser.rank}
                  </span>
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-300/30" 
                  />
                  <div className="flex-grow overflow-hidden">
                    <p className="font-semibold text-sm truncate text-white">{currentUser.name}</p>
                    <p className="text-xs text-white/60 font-mono">{currentUser.score} pts</p>
                  </div>
                </a>
              </div>
            ) : null}
        </div>
      </div>
    </aside>
  );
};

export default LeaderboardSidebar;
