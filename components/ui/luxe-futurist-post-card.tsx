import React, { useState, useRef, useEffect } from 'react';
import { type User, type Post as PostType, type PostInteractionType } from '../../lib/data';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import CommentSection from './comment-section';


interface LuxeFuturistPostCardProps {
  post: PostType;
  user: User;
  users: { [key: string]: User };
  loggedInUserHandle: string;
  onInteraction: (postId: number, interaction: PostInteractionType) => void;
}

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
};


export default function LuxeFuturistPostCard({ post, user, users, loggedInUserHandle, onInteraction }: LuxeFuturistPostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const {
    id,
    title,
    content,
    imageUrl,
    hashtags,
    likes,
    comments,
    shares,
    livePreviewUrl,
    githubUrl,
    time,
    isLiked,
    commentData,
    status,
    rejectionReason,
  } = post;

  const { avatarUrl, name, handle, year, department } = user;
  
  const hasMentorComment = commentData.some(comment => {
    const commenter = users[comment.userHandle];
    return commenter && commenter.role === 'mentor';
  });

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.location.hash = path;
  };

  const handleAddComment = (commentText: string) => {
    onInteraction(id, { type: 'addComment', text: commentText });
  };

  const handleShareAction = (platform: 'whatsapp' | 'copy') => {
    const postUrl = `${window.location.origin}${window.location.pathname}#post/${id}`;
    const postTitle = content.substring(0, 80);

    if (platform === 'whatsapp') {
        const text = `Check out this project on GRAD KONNECT:\n"${postTitle}..."\n\n${postUrl}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    } else { // copy
        navigator.clipboard.writeText(postUrl);
        alert('Post link copied to clipboard!');
    }
    
    onInteraction(id, { type: 'share' });
    setShowShareOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={cn(
      "group relative w-full max-w-lg bg-black/60 backdrop-blur-xl border rounded-3xl p-6 shadow-md shadow-black/20 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.2)] transition-all duration-300 text-left",
      status === 'rejected'
        ? "border-red-500/30 hover:border-red-400/50 shadow-[0_0_30px_-10px_rgba(220,38,38,0.2)] bg-red-950/10"
        : status === 'pending'
        ? "border-yellow-500/30 hover:border-yellow-400/50 shadow-[0_0_30px_-10px_rgba(234,179,8,0.2)] bg-yellow-950/10"
        : hasMentorComment
        ? "border-purple-500/30 hover:border-purple-400/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)] bg-purple-950/10"
        : "border-white/10 hover:border-white/20"
    )}>
      
      <div className="absolute top-4 right-4">
        {status === 'rejected' ? (
            <div className="flex items-center gap-1.5 bg-red-950/60 border border-red-500/50 rounded-full px-3 py-1 text-xs text-red-300 backdrop-blur-sm shadow-lg shadow-red-900/50">
                <i className="ri-close-circle-line"></i>
                <span className="font-semibold">Rejected</span>
            </div>
        ) : status === 'pending' ? (
            <div className="flex items-center gap-1.5 bg-yellow-900/60 border border-yellow-500/50 rounded-full px-3 py-1 text-xs text-yellow-300 backdrop-blur-sm shadow-lg shadow-yellow-900/50">
                <i className="ri-time-line"></i>
                <span className="font-semibold">Pending Review</span>
            </div>
        ) : hasMentorComment && status === 'approved' ? (
            <div className="flex items-center gap-1.5 bg-purple-950/60 border border-purple-500/50 rounded-full px-3 py-1 text-xs text-purple-300 backdrop-blur-sm shadow-lg shadow-purple-900/50">
                <i className="ri-shield-star-fill"></i>
                <span className="font-semibold">Mentor Reviewed</span>
            </div>
        ) : null}
      </div>

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
      
      {/* Title */}
      <h2 className="text-xl font-bold text-white mt-4">{title}</h2>

      {/* Content */}
      <p className="text-gray-300 text-sm mt-2 leading-relaxed">
        {content}
      </p>

      {/* Image Section */}
      <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-white/10 group/image relative">
        <img
          src={imageUrl}
          alt="Post image"
          className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>
      
      {/* Hashtags */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-400 mt-4">
        {hashtags.map((tag, index) => (
          <span key={index} className="text-sm font-medium hover:text-white transition-colors cursor-pointer">{tag}</span>
        ))}
      </div>
      
      {/* Live Preview & GitHub Buttons */}
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

      {/* Rejection Reason */}
      {status === 'rejected' && rejectionReason && (
        <div className="mt-4 p-4 rounded-xl bg-red-950/40 border border-red-500/40">
            <h4 className="font-semibold text-red-300 flex items-center gap-2 text-base">
                <i className="ri-feedback-fill"></i>
                Feedback from Mentor
            </h4>
            <p className="text-red-200/90 text-sm mt-2 leading-relaxed">{rejectionReason}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-start items-center mt-3 -ml-2 text-gray-500">
        <button 
          className="flex items-center gap-1.5 group/action p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
          aria-label="Like post"
          onClick={() => onInteraction(id, { type: 'like' })}
          aria-pressed={isLiked}
          disabled={status !== 'approved'}
        >
          <div className="p-1.5 rounded-full group-hover/action:bg-pink-500/10 transition-colors duration-200">
            <i className={cn(
              "text-xl transition-all duration-200",
              isLiked 
                ? "ri-heart-3-fill text-pink-500" 
                : "ri-heart-3-line text-gray-400 group-hover/action:text-pink-500"
            )}></i>
          </div>
          <span className={cn(
              "group-hover/action:text-white transition-colors duration-200 text-sm",
              isLiked && "text-pink-500"
          )}>{formatNumber(likes)}</span>
        </button>
        <button 
          className="flex items-center gap-1.5 group/action p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
          aria-label="Comment on post" 
          onClick={() => status === 'approved' && setShowComments(prev => !prev)}
          disabled={status !== 'approved'}
        >
           <div className="p-1.5 rounded-full group-hover/action:bg-blue-500/10 transition-colors duration-200">
            <i className={cn(
                "ri-chat-3-line text-xl transition-colors duration-200",
                hasMentorComment && status === 'approved'
                  ? "text-purple-400 group-hover/action:text-purple-300"
                  : "text-gray-400 group-hover/action:text-blue-500"
              )}></i>
          </div>
          <span className={cn(
              "group-hover/action:text-white transition-colors duration-200 text-sm",
              hasMentorComment && status === 'approved' && "text-purple-400"
            )}>{formatNumber(comments)}</span>
        </button>
        
        <div className="relative" ref={shareMenuRef}>
          <button 
            className="flex items-center gap-1.5 group/action p-2 disabled:opacity-50 disabled:cursor-not-allowed" 
            aria-label="Share post" 
            onClick={() => setShowShareOptions(prev => !prev)}
            disabled={status !== 'approved'}
          >
            <div className="p-1.5 rounded-full group-hover/action:bg-green-500/10 transition-colors duration-200">
              <i className="ri-share-forward-line text-xl text-gray-400 group-hover/action:text-green-500 transition-colors duration-200"></i>
            </div>
            <span className="group-hover/action:text-white transition-colors duration-200 text-sm">{formatNumber(shares)}</span>
          </button>

          <AnimatePresence>
            {showShareOptions && (
              <motion.div
                  {...{
                    initial: { opacity: 0, y: 10, scale: 0.9 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    exit: { opacity: 0, y: 10, scale: 0.9 },
                    transition: { type: 'spring', stiffness: 500, damping: 30 },
                  }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 w-52 bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-lg shadow-black/30"
              >
                  <button 
                      onClick={() => handleShareAction('whatsapp')}
                      className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-gray-200 rounded-md hover:bg-white/10 transition-colors"
                  >
                      <i className="ri-whatsapp-line text-green-400 text-lg"></i>
                      <span>Share on WhatsApp</span>
                  </button>
                  <button 
                      onClick={() => handleShareAction('copy')}
                      className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-gray-200 rounded-md hover:bg-white/10 transition-colors"
                  >
                      <i className="ri-links-line text-blue-400 text-lg"></i>
                      <span>Copy Link</span>
                  </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Comment Section */}
      <AnimatePresence>
        {showComments && status === 'approved' && (
          <motion.div
            {...{
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: 'auto', marginTop: '16px' },
              exit: { opacity: 0, height: 0, marginTop: '0px' },
              transition: { duration: 0.3, ease: 'easeInOut' },
            }}
            className="overflow-hidden"
          >
            <CommentSection
              comments={commentData}
              users={users}
              loggedInUserHandle={loggedInUserHandle}
              onAddComment={handleAddComment}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}