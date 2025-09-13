
import React, { useState, useEffect } from 'react';
import LuxeFuturistPostCard from '../ui/luxe-futurist-post-card';
import { User, Post, ProjectLeaderboardItem, MentorLeaderboardItem, PostInteractionType } from '../../lib/data';
import { Button } from '../ui/button';
import EditProfileModal from '../ui/edit-profile-modal';

interface ProfilePageProps {
  handle: string;
  loggedInUserHandle: string;
  users: { [key: string]: User };
  posts: Post[];
  onPostInteraction: (postId: number, interaction: PostInteractionType) => void;
  onProfileUpdate: (handle: string, name: string, bio: string, avatarUrl: string) => void;
  projectsLeaderboardData: ProjectLeaderboardItem[];
  mentorsLeaderboardData: MentorLeaderboardItem[];
}

const ProfilePage = ({ handle, loggedInUserHandle, users, posts, onPostInteraction, onProfileUpdate, projectsLeaderboardData, mentorsLeaderboardData }: ProfilePageProps) => {
  const [user, setUser] = useState(users[handle]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    setUser(users[handle]);
  }, [users, handle]);

  if (!user) {
    return (
        <div className="w-full h-[60vh] flex items-center justify-center text-center text-white">
            <div>
                <h2 className="text-4xl font-bold">User Not Found</h2>
                <p className="text-gray-400 mt-2">Could not find a profile for @{handle}.</p>
            </div>
        </div>
    );
  }

  // Find the user's rank
  let rank: number | null = null;
  if (user.role === 'student') {
      const leaderboardEntry = projectsLeaderboardData.find(entry => entry.handle === user.handle);
      if (leaderboardEntry) {
        rank = leaderboardEntry.rank;
      }
  } else if (user.role === 'mentor') {
      const leaderboardEntry = mentorsLeaderboardData.find(entry => entry.handle === user.handle);
      if (leaderboardEntry) {
        rank = leaderboardEntry.rank;
      }
  }

  const isOwner = handle === loggedInUserHandle;
  
  const userPosts = posts
    .filter(p => {
        if (p.userHandle !== handle) {
            return false;
        }
        // If the person viewing is the owner, show all posts.
        if (isOwner) {
            return true;
        }
        // If it's a visitor, only show approved posts.
        return p.status === 'approved';
    })
    .sort((a, b) => {
        const statusOrder = { pending: 1, rejected: 2, approved: 3 };
        if (isOwner) {
            // Sort by status first for the owner's view
            if (statusOrder[a.status] < statusOrder[b.status]) return -1;
            if (statusOrder[a.status] > statusOrder[b.status]) return 1;
        }
        // Then sort by time (newest first)
        return new Date(b.time) > new Date(a.time) ? 1 : -1; // Fallback for time sorting, assuming time can be parsed
    });


  const handleSaveProfile = (newName: string, newBio: string, newAvatarUrl: string) => {
    // Update local state for instant UI feedback
    setUser(prevUser => ({...prevUser, name: newName, bio: newBio, avatarUrl: newAvatarUrl}));
    // Propagate changes up to the main state
    onProfileUpdate(handle, newName, newBio, newAvatarUrl);
    setIsModalOpen(false);
  };

  const StatItem = ({ value, label }: { value: string | number | undefined, label: string }) => {
    if (value === undefined) return null;
    return (
     <div className="text-center">
        <span className="font-bold text-lg">{value}</span> 
        <span className="text-gray-400 text-sm ml-1.5">{label}</span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-4 py-12">
        {/* Avatar */}
        <div className="relative mb-6 p-1 rounded-full bg-gradient-to-tr from-blue-600/50 via-purple-600/50 to-red-600/50 shadow-lg shadow-black/40">
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-black" 
          />
          <div className="absolute inset-0 rounded-full border-2 border-transparent ring-2 ring-white/10" />
        </div>

        {/* User Info */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">{user.name}</h2>
        <p className="text-gray-400 mt-1">@{user.handle}</p>
        <p className="text-gray-300 mt-4 max-w-md mx-auto leading-relaxed">{user.bio}</p>

        <div className="flex items-center gap-3 text-gray-400 text-sm mt-4">
          {user.year && <span>{user.year}</span>}
          {user.year && user.department && <span className="w-1 h-1 rounded-full bg-gray-600"></span>}
          {user.department && <span>{user.department}</span>}
        </div>

        {/* Stats Bar & Edit Button */}
        <div className="flex items-center gap-6 md:gap-8 mt-6 text-white bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-lg shadow-black/30">
          {user.role === 'student' ? (
            <>
              {rank !== null && (
                <>
                  <div className="flex flex-col items-center justify-center">
                      <span className="font-extrabold text-2xl text-white [text-shadow:0_0_15px_rgba(255,255,255,0.8),0_0_25px_rgba(255,255,255,0.5)] leading-none">{`#${rank}`}</span>
                      <span className="text-gray-400 text-xs mt-1">Rank</span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                </>
              )}
              <StatItem value={posts.filter(p => p.userHandle === handle).length} label="Posts" />
            </>
          ) : (
            <>
              {rank !== null && (
                <>
                  <div className="flex flex-col items-center justify-center">
                      <span className="font-extrabold text-2xl text-white [text-shadow:0_0_15px_rgba(255,255,255,0.8),0_0_25px_rgba(255,255,255,0.5)] leading-none">{`#${rank}`}</span>
                      <span className="text-gray-400 text-xs mt-1">Rank</span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                </>
              )}
              <StatItem value={user.stats.mentees} label="Mentees" />
              <div className="w-px h-6 bg-white/10"></div>
              <StatItem value={user.stats.rating} label="Rating" />
            </>
          )}
        </div>

        {isOwner && (
          <div className="mt-6">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 rounded-full font-semibold"
            >
              Edit Profile
            </Button>
          </div>
        )}
        
        {/* Divider */}
        <div className="w-full max-w-2xl my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Posts */}
        <div className="flex flex-col items-center gap-8 w-full">
            {userPosts.length > 0 ? (
                userPosts.map(post => {
                const postUser = users[post.userHandle];
                return postUser ? <LuxeFuturistPostCard 
                                    key={post.id} 
                                    post={post} 
                                    user={postUser} 
                                    users={users} 
                                    loggedInUserHandle={loggedInUserHandle} 
                                    onInteraction={onPostInteraction} 
                                    /> : null;
                })
            ) : (
                <p className="text-gray-400">No posts yet.</p>
            )}
        </div>
      </div>
      
      {isOwner && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProfile}
          user={user}
        />
      )}
    </>
  );
};

export default ProfilePage;