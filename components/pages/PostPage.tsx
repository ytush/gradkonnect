import React, { useState, ChangeEvent } from 'react';
import { UploadCloud } from 'lucide-react';
import { Label } from '../ui/label';
import { MatrixText } from '../ui/matrix-text';
import { ParticleButton } from '../ui/particle-button';
import { Post, PostFormData } from '../../lib/data';

interface PostPageProps {
  onPostSubmit: (data: PostFormData) => void;
}

const PostPage = ({ onPostSubmit }: PostPageProps) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    imageUrl: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=800',
    hashtags: '',
    livePreviewUrl: '',
    githubUrl: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPostSubmit(formData);
  };
  
  const handleSuccess = () => {
    alert('Your project has been submitted for review by a mentor!');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <MatrixText 
        text="Share Your Project"
        className="mb-8 font-bold text-4xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
      />

      <div className="w-full p-px rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-400/20 to-transparent shadow-2xl shadow-black/50">
        <div className="w-full bg-black/75 backdrop-blur-2xl rounded-[23px] p-6 md:p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white">New Post</h2>
                <p className="text-sm text-gray-400">Showcase your latest work to the community.</p>
            </div>
          
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-gray-300 font-medium">Title</Label>
                <input
                  id="title"
                  type="text"
                  placeholder="Give your project a catchy title"
                  className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="content" className="text-gray-300 font-medium">What are you sharing?</Label>
                <textarea
                  id="content"
                  placeholder="Describe your project, your process, and the tech you used..."
                  className="w-full h-36 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 resize-none"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="post-image" className="text-gray-300 font-medium">Add an image or video</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                      htmlFor="dropzone-file"
                      className="group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-blue-900/20 hover:border-blue-500 transition-all duration-300 relative overflow-hidden"
                  >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover"/>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="h-10 w-10 text-gray-500 mb-3 group-hover:text-blue-400 transition-colors" strokeWidth={1.5} />
                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-gray-300">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF or MP4 (MAX. 800x400px)</p>
                        </div>
                      )}
                      <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>
              </div>

               <div className="space-y-3">
                <Label htmlFor="hashtags" className="text-gray-300 font-medium">Hashtags</Label>
                <input
                  id="hashtags"
                  type="text"
                  placeholder="e.g. #AI, #React, #DataViz"
                  className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
                  value={formData.hashtags}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="livePreviewUrl" className="text-gray-300 font-medium">Live Preview Link</Label>
                <input
                  id="livePreviewUrl"
                  type="url"
                  placeholder="https://your-project-demo.com"
                  className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
                  value={formData.livePreviewUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="githubUrl" className="text-gray-300 font-medium">GitHub Link</Label>
                <input
                  id="githubUrl"
                  type="url"
                  placeholder="https://github.com/your-username/your-repo"
                  className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
                  value={formData.githubUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <ParticleButton
                  type="submit"
                  className="px-8 py-3 text-black bg-white font-bold rounded-xl hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                  onSuccess={handleSuccess}
                >
                  Submit for Review
                </ParticleButton>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default PostPage;