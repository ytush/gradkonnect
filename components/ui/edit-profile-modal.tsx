
import React, { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User } from '../../lib/data';
import { UploadCloud, X } from 'lucide-react';
import { Button } from './button';
import { ParticleButton } from './particle-button';

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, bio: string, avatarUrl: string) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, onSave, user }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(user.name);
      setBio(user.bio);
      setAvatarPreview(user.avatarUrl);
    }
  }, [isOpen, user]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(name, bio, avatarPreview);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
          onClick={onClose}
        >
          <motion.div
            {...{
              initial: { y: 50, opacity: 0, scale: 0.95 },
              animate: { y: 0, opacity: 1, scale: 1 },
              exit: { y: 50, opacity: 0, scale: 0.95 },
              transition: { type: 'spring', stiffness: 300, damping: 30 },
            }}
            className="w-full max-w-md m-4"
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <div className="w-full p-px rounded-3xl bg-gradient-to-br from-blue-500/50 via-purple-400/30 to-transparent shadow-2xl shadow-black/50">
                <div className="w-full bg-black/80 backdrop-blur-2xl rounded-[23px] p-6 md:p-8 relative">
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                    <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

                    <div className="space-y-6">
                        {/* Avatar Upload */}
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <img src={avatarPreview} alt="Avatar preview" className="w-24 h-24 rounded-full object-cover border-2 border-white/20" />
                                <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                    <UploadCloud className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Profile Picture</h3>
                                <p className="text-sm text-gray-400 mb-2">PNG or JPG. 1:1 aspect ratio recommended.</p>
                                <Button onClick={() => fileInputRef.current?.click()} className="bg-white/10 text-white hover:bg-white/20 text-sm font-semibold rounded-lg px-4 py-2">
                                    Upload
                                </Button>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" className="hidden" />
                            </div>
                        </div>
                        
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
                            />
                        </div>

                        {/* Bio Textarea */}
                        <div>
                            <label htmlFor="bio" className="block text-gray-300 font-medium mb-2">Bio</label>
                            <textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell everyone a little about yourself..."
                                className="w-full h-32 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 resize-none"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                        <ParticleButton
                            onClick={handleSave}
                            className="px-8 py-3 text-black bg-white font-bold rounded-xl hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                        >
                            Save Changes
                        </ParticleButton>
                    </div>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
