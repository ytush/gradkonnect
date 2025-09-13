import React from 'react';
import { Typewriter } from '../ui/typewriter';
import { cn } from '../../lib/utils';
import { User, ProjectLeaderboardItem, MentorLeaderboardItem, BranchLeaderboardItem } from '../../lib/data';

interface LeaderboardPageProps {
    users: { [key: string]: User };
    projectsLeaderboardData: ProjectLeaderboardItem[];
    mentorsLeaderboardData: MentorLeaderboardItem[];
    branchesLeaderboardData: BranchLeaderboardItem[];
}

const getRankStyling = (rank: number) => {
    switch (rank) {
        case 1:
            return 'text-yellow-300 [text-shadow:0_0_6px_#facc15,0_0_12px_#facc15]';
        case 2:
            return 'text-slate-300 [text-shadow:0_0_6px_#d1d5db,0_0_12px_#d1d5db]';
        case 3:
            return 'text-amber-500 [text-shadow:0_0_6px_#f59e0b,0_0_12px_#f59e0b]';
        default:
            return 'text-white/50';
    }
};

const LeaderboardCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="w-full h-full p-px rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent shadow-2xl shadow-black/50">
        <div className="w-full h-full bg-black/80 backdrop-blur-2xl rounded-[23px] p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
                {title}
            </h2>
            {children}
        </div>
    </div>
);


const LeaderboardPage = ({ users, projectsLeaderboardData, mentorsLeaderboardData, branchesLeaderboardData }: LeaderboardPageProps) => {
    const navigate = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        window.location.hash = path;
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
            <div className="min-h-20 flex items-center justify-center text-center mb-10 px-4 py-2">
                <Typewriter
                    text={["Top Projects ⚡", "Leading Mentors !", "Department Leader ⭐"]}
                    speed={60}
                    deleteSpeed={40}
                    waitTime={2500}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500"
                    cursorClassName="text-neutral-400 text-4xl md:text-5xl"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Projects Leaderboard */}
                <LeaderboardCard title="Top Projects">
                    <div className="space-y-2">
                        <div className="grid grid-cols-[30px_minmax(0,1fr)_60px] sm:grid-cols-[40px_minmax(0,1fr)_80px] gap-x-2 sm:gap-x-4 px-2 sm:px-3 pb-3 text-xs uppercase tracking-widest text-white/40">
                            <span className="text-left">#</span>
                            <span>Project / Student</span>
                            <span className="text-right">Score</span>
                        </div>
                        <ul className="space-y-1">
                            {projectsLeaderboardData.map((item) => {
                                const user = users[item.handle];
                                if (!user) return null;
                                return (
                                <li key={item.rank} className="grid grid-cols-[30px_minmax(0,1fr)_60px] sm:grid-cols-[40px_minmax(0,1fr)_80px] gap-x-2 sm:gap-x-4 items-center p-2 sm:p-3 rounded-lg transition-all duration-300 hover:bg-white/5">
                                    <span className={cn("font-black text-lg sm:text-xl text-center", getRankStyling(item.rank))}>{item.rank}</span>
                                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                                        <a href={`#profile/${user.handle}`} onClick={(e) => navigate(e, `#profile/${user.handle}`)}>
                                            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/10 flex-shrink-0" />
                                        </a>
                                        <div className="overflow-hidden">
                                            <p className="font-semibold text-sm sm:text-base text-white truncate">{item.title}</p>
                                            <a href={`#profile/${user.handle}`} onClick={(e) => navigate(e, `#profile/${user.handle}`)} className="text-xs text-white/60 hover:text-white transition-colors block truncate">{user.name} • {user.department}</a>
                                        </div>
                                    </div>
                                    <span className="text-right font-mono font-bold text-sm sm:text-md text-white">{item.score}</span>
                                </li>
                            )})}
                        </ul>
                    </div>
                </LeaderboardCard>

                {/* Mentors Leaderboard */}
                <LeaderboardCard title="Top Mentors">
                    <div className="space-y-2">
                         <div className="grid grid-cols-[30px_minmax(0,1fr)_60px] sm:grid-cols-[40px_minmax(0,1fr)_80px] gap-x-2 sm:gap-x-4 px-2 sm:px-3 pb-3 text-xs uppercase tracking-widest text-white/40">
                            <span className="text-left">#</span>
                            <span>Mentor</span>
                            <span className="text-right">Rating</span>
                        </div>
                        <ul className="space-y-1">
                            {mentorsLeaderboardData.map((item) => {
                                const user = users[item.handle];
                                if (!user) return null;
                                return (
                                <li key={item.rank} className="grid grid-cols-[30px_minmax(0,1fr)_60px] sm:grid-cols-[40px_minmax(0,1fr)_80px] gap-x-2 sm:gap-x-4 items-center p-2 sm:p-3 rounded-lg transition-all duration-300 hover:bg-white/5">
                                    <span className={cn("font-black text-lg sm:text-xl text-center", getRankStyling(item.rank))}>{item.rank}</span>
                                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                                        <a href={`#profile/${user.handle}`} onClick={(e) => navigate(e, `#profile/${user.handle}`)}>
                                            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/10 flex-shrink-0" />
                                        </a>
                                        <div className="overflow-hidden">
                                            <a href={`#profile/${user.handle}`} onClick={(e) => navigate(e, `#profile/${user.handle}`)} className="font-semibold text-sm sm:text-base text-white truncate hover:text-blue-400 transition-colors block">{user.name}</a>
                                            <p className="text-xs text-white/60 truncate">{user.department}</p>
                                        </div>
                                    </div>
                                    <span className="text-right font-mono font-bold text-sm sm:text-md text-white">{item.score}</span>
                                </li>
                            )})}
                        </ul>
                    </div>
                </LeaderboardCard>

                {/* Branches Leaderboard */}
                <LeaderboardCard title="Top Branches">
                    <div className="space-y-2">
                        <div className="grid grid-cols-[30px_minmax(0,1fr)_60px] sm:grid-cols-[40px_minmax(0,1fr)_80px] gap-x-2 sm:gap-x-4 px-2 sm:px-3 pb-3 text-xs uppercase tracking-widest text-white/40">
                            <span className="text-left">#</span>
                            <span>Branch</span>
                            <span className="text-right">Score</span>
                        </div>
                        <ul className="space-y-1">
                            {branchesLeaderboardData.map((item) => (
                                <li key={item.rank} className="grid grid-cols-[30px_minmax(0,1fr)_60px] sm:grid-cols-[40px_minmax(0,1fr)_80px] gap-x-2 sm:gap-x-4 items-center p-2 sm:p-3 rounded-lg transition-all duration-300 hover:bg-white/5">
                                    <span className={cn("font-black text-lg sm:text-xl text-center", getRankStyling(item.rank))}>{item.rank}</span>
                                    <div>
                                        <p className="font-semibold text-sm sm:text-base text-white">{item.name}</p>
                                    </div>
                                    <span className="text-right font-mono font-bold text-sm sm:text-md text-white">{item.score}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </LeaderboardCard>
            </div>
        </div>
    );
};

export default LeaderboardPage;