import React, { useState } from 'react';
import { User, Comment as CommentType } from '../../lib/data';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface CommentSectionProps {
  comments: CommentType[];
  users: { [key: string]: User };
  loggedInUserHandle: string;
  onAddComment: (commentText: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, users, loggedInUserHandle, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const loggedInUser = users[loggedInUserHandle];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const navigateToProfile = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    window.location.hash = `#profile/${handle}`;
  };

  return (
    <div className="w-full border-t border-white/10 pt-4">
      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="flex items-start gap-3 mb-4">
        {loggedInUser && (
          <img
            src={loggedInUser.avatarUrl}
            alt="Your avatar"
            className="w-9 h-9 rounded-full object-cover mt-1"
          />
        )}
        <div className="flex-1">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-black/20 transition-all duration-300"
          />
        </div>
        <Button
          type="submit"
          disabled={!newComment.trim()}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
        {comments.map((comment) => {
          const user = users[comment.userHandle];
          if (!user) return null;
          const isMentor = user.role === 'mentor';

          return (
            <div key={comment.id} className="flex items-start gap-3 text-sm">
              <a href={`#profile/${user.handle}`} onClick={(e) => navigateToProfile(e, user.handle)}>
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
              </a>
              <div className={cn(
                  "flex-1 rounded-lg p-3 transition-all",
                  isMentor 
                    ? "bg-purple-950/20 border border-purple-500/30 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]" 
                    : "bg-white/5"
              )}>
                <div className="flex items-center gap-2">
                  <a href={`#profile/${user.handle}`} onClick={(e) => navigateToProfile(e, user.handle)} className={cn(
                      "font-semibold transition-colors",
                      isMentor
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                        : "text-white hover:text-blue-400"
                  )}>
                    {user.name}
                  </a>
                  {isMentor && (
                    <i className="ri-shield-star-fill text-purple-400 text-base" title="Mentor"></i>
                  )}
                  <span className="text-xs text-gray-500">• {comment.time}</span>
                </div>
                <p className="text-gray-300 mt-1">{comment.text}</p>
              </div>
            </div>
          );
        })}
        {comments.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-4">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;