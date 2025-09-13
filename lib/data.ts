

export interface Comment {
  id: number;
  userHandle: string;
  text: string;
  time: string;
}

export interface Post {
  id: number;
  userHandle: string;
  time: string;
  content: string;
  title?: string;
  imageUrl: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  livePreviewUrl?: string;
  githubUrl?: string;
  commentData: Comment[];
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export type PostFormData = Omit<Post, 'id' | 'userHandle' | 'time' | 'likes' | 'comments' | 'shares' | 'isLiked' | 'commentData' | 'status' | 'rejectionReason' | 'hashtags'> & { hashtags: string };

export type PostInteractionType = { type: 'like' } | { type: 'share' } | { type: 'addComment', text: string };

export interface User {
  handle: string;
  name: string;
  avatarUrl: string;
  bio: string;
  year?: string;
  department: string;
  role: 'student' | 'mentor';
  stats: {
    posts?: number;
    mentees?: number;
    rating?: string;
  };
  email?: string;
  password?: string;
}

export interface ProjectLeaderboardItem {
  rank: number;
  title: string;
  handle: string;
  score: string;
}

export interface MentorLeaderboardItem {
  rank: number;
  handle: string;
  score: string;
}

export interface BranchLeaderboardItem {
  rank: number;
  name: string;
  score: string;
}

export interface TopCreatorLeaderboardItem {
    rank: number;
    handle: string;
    score: string;
}