
import React, { useState } from 'react';
import { Post, User } from '../../lib/data';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { AnimatePresence, motion } from 'framer-motion';

interface ReviewPostCardProps {
  post: Post;
  user: User;
  onApprove: (postId: number) => void;
  onReject: (postId: number, reason: string) => void;
}

const ReviewPostCard: React.FC<ReviewPostCardProps> = ({ post, user, onApprove, onReject }) => {
  const [isRejectionActive, setIsRejectionActive] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const {
    id,
    title,
    content,
    imageUrl,
    hashtags,
    livePreviewUrl,
    githubUrl,
    time,
  } = post;

  const { avatarUrl, name, handle, year, department } = user;

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.location.hash = path;
  };

  const handleRejectClick = () => {
    setIsRejectionActive(true);
  };

  const handleConfirmRejection = () => {
    if (rejectionReason.trim()) {
      onReject(id, rejectionReason);
    } else {
      alert("Please provide a reason for rejection.");
    }
  };

  return (
    <div className={cn(
      "w-full max-w-2xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-md shadow-black/20 transition-all duration-300 text-left"
    )}>
      <div className="flex justify-between items-start">
        <a 
          href={`#profile/${handle}`} 
          onClick={(e) => navigate(e, `#profile/${handle}`)} 
          className="flex items-center gap-4 group/userheader"
        >
          <div className="relative">
            <img
              src={avatarUrl}
              alt={`${name}'s avatar`}
              className="w-12 h-12 rounded-full object-cover border-2 border-transparent ring-2 ring-white/10 group-hover/userheader:ring-white/50 transition-all duration-300"
            />
          </div>
          <div>
            <h3 className="text-white text-base font-semibold group-hover/userheader:text-blue-400 transition-colors">{name}</h3>
            <p className="text-gray-500 text-sm">@{handle} • {time}</p>
            <p className="text-gray-400 text-xs mt-1">{year && `${year} • `}{department}</p>
          </div>
        </a>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-900/40 border border-yellow-500/50 text-yellow-300">
          Pending
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mt-4">{title}</h2>
      <p className="text-gray-300 text-sm mt-2 leading-relaxed">
        {content}
      </p>

      <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-white/10 group/image relative">
        <img
          src={imageUrl}
          alt="Post image"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-400 mt-4">
        {hashtags.map((tag, index) => (
          <span key={index} className="text-sm font-medium hover:text-white transition-colors cursor-pointer">{tag}</span>
        ))}
      </div>
      
      {(livePreviewUrl || githubUrl) && (
        <div className="flex items-center gap-3 mt-4">
          {livePreviewUrl && (
            <a href={livePreviewUrl} target="_blank" rel="noopener noreferrer" className="group/button flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)]">
              <i className="ri-external-link-line text-base text-gray-500 group-hover/button:text-white transition-colors duration-300"></i>
              <span>Live Preview</span>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="group/button flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)]">
              <i className="ri-github-fill text-base text-gray-500 group-hover/button:text-white transition-colors duration-300"></i>
              <span>GitHub</span>
            </a>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <AnimatePresence mode="wait">
          {!isRejectionActive ? (
            <motion.div
              key="actions"
              {...{
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 20 },
                transition: { duration: 0.2 },
              }}
              className="flex items-center justify-end gap-4"
            >
              <Button onClick={handleRejectClick} className="font-semibold rounded-lg bg-red-800/80 border border-red-500/50 text-red-200 hover:bg-red-700/80 hover:border-red-500/80 hover:text-white transition-all duration-300">Reject</Button>
              <Button onClick={() => onApprove(id)} className="font-semibold rounded-lg bg-green-800/80 border border-green-500/50 text-green-200 hover:bg-green-700/80 hover:border-green-500/80 hover:text-white transition-all duration-300">Approve</Button>
            </motion.div>
          ) : (
            <motion.div
              key="rejection"
              {...{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.2 },
              }}
              className="space-y-3"
            >
              <h4 className="text-white font-semibold">Reason for Rejection</h4>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide constructive feedback for the student..."
                className="w-full h-24 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300 resize-none"
              />
              <div className="flex items-center justify-end gap-4">
                <Button onClick={() => setIsRejectionActive(false)} variant="ghost" className="text-gray-400 hover:text-white">Cancel</Button>
                <Button onClick={handleConfirmRejection} className="font-semibold rounded-lg bg-red-800/80 border border-red-500/50 text-red-200 hover:bg-red-700/80 hover:border-red-500/80 hover:text-white transition-all duration-300">Confirm Rejection</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewPostCard;
