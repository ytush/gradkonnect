import React from 'react';
import { MatrixText } from '../ui/matrix-text';
import { Post, User, ProjectLeaderboardItem } from '../../lib/data';
import ReviewPostCard from '../ui/review-post-card';

interface ReviewPageProps {
  posts: Post[];
  users: { [key: string]: User };
  onApprove: (postId: number) => void;
  onReject: (postId: number, reason: string) => void;
  loggedInUser: User;
  projectsLeaderboardData: ProjectLeaderboardItem[];
}

const parseScore = (score: string): number => {
    const value = parseFloat(score);
    if (score.toLowerCase().includes('k')) return value * 1000;
    if (score.toLowerCase().includes('m')) return value * 1000000;
    return value;
};

const ReviewPage: React.FC<ReviewPageProps> = ({ posts, users, onApprove, onReject, loggedInUser, projectsLeaderboardData }) => {
  const mentees = Object.values(users)
    .filter(
      (user) => user.role === 'student' && user.department === loggedInUser.department
    )
    .map(user => {
        const leaderboardEntry = projectsLeaderboardData.find(entry => entry.handle === user.handle);
        const score = leaderboardEntry ? parseScore(leaderboardEntry.score) : 0;
        const scoreString = leaderboardEntry ? leaderboardEntry.score : '0';
        return { ...user, score, scoreString };
    })
    .sort((a, b) => b.score - a.score);

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.location.hash = path;
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 py-8">
      <MatrixText 
        text="Mentor Dashboard"
        className="mb-12 font-bold text-4xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full items-start">
        {/* Review Submissions Section */}
        <div className="lg:col-span-2">
            <div className="max-w-2xl mx-auto space-y-6">
                <h3 className="text-2xl font-bold text-left text-white/80">Pending Submissions ({posts.length})</h3>
                {posts.length > 0 ? (
                <div className="w-full flex flex-col items-center gap-8">
                    {posts.map(post => {
                    const user = users[post.userHandle];
                    return user ? (
                        <ReviewPostCard 
                        key={post.id}
                        post={post}
                        user={user}
                        onApprove={onApprove}
                        onReject={onReject}
                        />
                    ) : null;
                    })}
                </div>
                ) : (
                <div className="w-full p-px rounded-3xl bg-gradient-to-br from-purple-500/30 via-cyan-400/20 to-transparent shadow-2xl shadow-black/50">
                    <div className="w-full bg-black/75 backdrop-blur-2xl rounded-[23px] p-6 md:p-8 min-h-[40vh] flex items-center justify-center">
                    <p className="text-gray-400 text-lg">No new project submissions to review.</p>
                    </div>
                </div>
                )}
            </div>
        </div>

        {/* Mentees List Section */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28">
          <h3 className="text-2xl font-bold text-left text-white/80">
            Students <span className="text-base font-normal text-white/50">({loggedInUser.department})</span>
          </h3>
          <div className="w-full p-px rounded-3xl bg-gradient-to-br from-green-500/30 via-cyan-400/20 to-transparent">
            <div className="w-full bg-black/75 backdrop-blur-2xl rounded-[23px] p-4 space-y-3 max-h-[60vh] overflow-y-auto">
              {mentees.length > 0 ? (
                mentees.map(mentee => (
                  <a 
                    key={mentee.handle} 
                    href={`#profile/${mentee.handle}`} 
                    onClick={(e) => navigate(e, `#profile/${mentee.handle}`)}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/10 transition-colors duration-200 w-full text-left group"
                  >
                    <img 
                      src={mentee.avatarUrl} 
                      alt={mentee.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-green-400/50 transition-colors flex-shrink-0"
                    />
                    <div className="flex-grow flex items-center justify-between overflow-hidden">
                      <div className="overflow-hidden">
                        <p className="font-semibold text-white truncate">{mentee.name}</p>
                        <p className="text-sm text-gray-400 truncate">@{mentee.handle}</p>
                        {mentee.year && <p className="text-xs text-gray-500 mt-1">{mentee.year}</p>}
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-mono font-bold text-lg text-green-400">{mentee.scoreString}</p>
                        <p className="text-xs text-gray-500 -mt-1">pts</p>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">No students found in your department.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;