
import React from 'react';
import CoverDemo from '../cover-demo';
import LuxeFuturistPostCard from '../ui/luxe-futurist-post-card';
import { User, Post, ProjectLeaderboardItem, TopCreatorLeaderboardItem, PostInteractionType } from '../../lib/data';
import { SearchBar } from '../ui/search-bar';
import LeaderboardSidebar from '../ui/leaderboard-sidebar';

interface LeaderboardUser {
  rank: number;
  handle: string;
  avatarUrl: string;
  name: string;
  score: string;
}

interface ExplorePageProps {
  users: { [key: string]: User };
  posts: Post[];
  onPostInteraction: (postId: number, interaction: PostInteractionType) => void;
  loggedInUser: User;
  topCreatorsLeaderboardData: TopCreatorLeaderboardItem[];
  projectsLeaderboardData: ProjectLeaderboardItem[];
}

const ExplorePage = ({ users, posts, onPostInteraction, loggedInUser, topCreatorsLeaderboardData, projectsLeaderboardData }: ExplorePageProps) => {
    const enrichedTopCreators = topCreatorsLeaderboardData.map(creator => {
      const user = users[creator.handle];
      return { ...creator, ...user };
    });

    let enrichedCurrentUser: LeaderboardUser | null = null;
    if (loggedInUser.role === 'student') {
        const studentData = projectsLeaderboardData.find(p => p.handle === loggedInUser.handle);
        enrichedCurrentUser = {
            rank: studentData?.rank || 0,
            handle: loggedInUser.handle,
            avatarUrl: loggedInUser.avatarUrl,
            name: loggedInUser.name,
            score: studentData?.score || '0'
        };
    }

    return (
        <div className="w-full">
            <main className="max-w-2xl mx-auto">
                <CoverDemo />
                <div className="flex justify-center my-8 relative z-10">
                    <SearchBar onSearch={(query) => console.log(query)} />
                </div>
                <div className="flex flex-col items-center gap-8 mt-8">
                    {posts.map(post => {
                      const user = users[post.userHandle];
                      if (!user) return null;
                      return <LuxeFuturistPostCard 
                                key={post.id} 
                                post={post} 
                                user={user} 
                                users={users}
                                loggedInUserHandle={loggedInUser.handle}
                                onInteraction={onPostInteraction} 
                              />;
                    })}
                </div>
            </main>

            <LeaderboardSidebar 
                topCreators={enrichedTopCreators} 
                currentUser={enrichedCurrentUser}
                loggedInUser={loggedInUser}
            />
        </div>
    );
};

export default ExplorePage;