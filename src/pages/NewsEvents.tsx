import React, { useState, useEffect } from "react";
import { useAppStore, Post, PostCategory } from "../store/useStore";
import { format } from "date-fns";
import { Calendar, Newspaper, ExternalLink, Trash2, Pencil, X, Image as ImageIcon, Video, Play, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import { VideoPlayerModal } from "../components/VideoPlayerModal";
import { graduationVideos } from "../lib/videoUtils";

export function NewsEvents() {
  const posts = useAppStore(state => state.posts);
  const fetchPosts = useAppStore(state => state.fetchPosts);
  const deletePost = useAppStore(state => state.deletePost);
  const updatePost = useAppStore(state => state.updatePost);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);
  const [filter, setFilter] = useState<'all' | 'news' | 'event'>('all');

  // Video player modal state
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  // Edit modal state
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCat, setEditCat] = useState<PostCategory>("news");
  const [editImg, setEditImg] = useState("");
  const [editVid, setEditVid] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: string, imageUrl?: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id, imageUrl);
    }
  };

  const handleStartEdit = (post: Post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditDesc(post.description);
    setEditCat(post.category);
    setEditImg(post.imageUrl || "");
    setEditVid(post.videoUrl || "");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    await updatePost(editingPost.id, {
      title: editTitle,
      description: editDesc,
      category: editCat,
      imageUrl: editImg || undefined,
      videoUrl: editVid || undefined
    });
    setEditingPost(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImg(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const filteredPosts = posts.filter(post => filter === 'all' || post.category === filter);

  return (
    <div className="w-full min-h-screen bg-off-white">
      {/* Header */}
      <section className="bg-navy py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold border border-accent-gold/40 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Official 2026 Graduation Media & News
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">2026 Graduation Pictures & News Updates</h1>
          <p className="text-lg text-gray-300">
            Celebrate the achievements, photographs, valedictory speeches, awards, and memorable presentations of our graduating class.
          </p>
        </div>
      </section>

      {/* Featured Video Showcase Banner */}
      <section className="bg-navy-dark border-b border-white/10 py-10 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Play className="w-5 h-5 text-accent-gold fill-current" /> Official 2026 Graduation Ceremony Video Clips
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Click any clip to watch instantly in high definition</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {graduationVideos.map((vid) => (
              <div 
                key={vid.id}
                onClick={() => setSelectedVideo({ url: vid.videoUrl, title: vid.title })}
                className="bg-white/5 border border-white/10 hover:border-accent-gold/50 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl group"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-accent-red text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-black/80 text-accent-gold rounded">
                    {vid.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white group-hover:text-accent-gold line-clamp-1 mb-1">{vid.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{vid.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
          {['all', 'news', 'event'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-6 py-2.5 rounded-full font-semibold text-sm transition-all capitalize shadow-xs",
                filter === f 
                  ? "bg-accent-red text-white shadow-md" 
                  : "bg-white text-navy-dark border border-gray-200 hover:bg-gray-50"
              )}
            >
              {f === 'all' ? 'All Updates & Highlights' : f === 'news' ? 'News & Announcements' : 'Events & Graduation'}
            </button>
          ))}
        </div>

        {/* Content */}
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-gray-100">
            No updates found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col hover:shadow-lg transition-all group"
              >
                <div className="relative h-52 bg-gray-900 shrink-0 overflow-hidden">
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy/20">
                      <ImageIcon className="w-12 h-12 text-navy/40" />
                    </div>
                  )}

                  {/* Play video overlay if post has a video */}
                  {post.videoUrl && (
                    <div 
                      onClick={() => setSelectedVideo({ url: post.videoUrl!, title: post.title })}
                      className="absolute inset-0 bg-black/30 hover:bg-black/50 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-accent-red text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-4 left-4 flex items-center justify-between right-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md backdrop-blur-xs",
                      post.category === 'news' ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
                    )}>
                      {post.category === 'news' ? <Newspaper className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                      {post.category}
                    </span>
                    {isAuthenticated && (
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleStartEdit(post); }}
                          className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors"
                          title="Edit post (Admin)"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(post.id, post.imageUrl); }}
                          className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition-colors"
                          title="Delete post (Admin)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-medium text-gray-400 mb-2 block">
                      {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                    </span>
                    <h3 className="text-lg font-bold text-navy mb-2 line-clamp-2 group-hover:text-accent-red transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  
                  {post.videoUrl && (
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <button 
                        type="button"
                        onClick={() => setSelectedVideo({ url: post.videoUrl!, title: post.title })}
                        className="text-accent-red hover:text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Watch Video
                      </button>
                      <a 
                        href={post.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-700 text-xs flex items-center gap-1"
                      >
                        YouTube <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* EDIT POST MODAL */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setEditingPost(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg"
            >
              <X className="w-6 h-6"/>
            </button>
            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-blue-600"/> Edit Update
            </h2>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select 
                  value={editCat} 
                  onChange={(e) => setEditCat(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy outline-none bg-white"
                >
                  <option value="news">News</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  required 
                  value={editTitle} 
                  onChange={e => setEditTitle(e.target.value)} 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-navy" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required 
                  value={editDesc} 
                  onChange={e => setEditDesc(e.target.value)} 
                  rows={4} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-navy" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <ImageIcon className="w-4 h-4"/> Image URL or Upload New
                </label>
                <input 
                  value={editImg} 
                  onChange={e => setEditImg(e.target.value)} 
                  type="text" 
                  placeholder="Paste Image URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2" 
                />
                <input 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  type="file" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                />
                {editImg && (
                  <img src={editImg} alt="Preview" className="mt-2 h-24 w-auto rounded object-cover border border-gray-200" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Video className="w-4 h-4 text-red-600"/> Video URL (Optional)
                </label>
                <input 
                  value={editVid} 
                  onChange={e => setEditVid(e.target.value)} 
                  type="url" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                  placeholder="YouTube link" 
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-navy text-white font-bold rounded-lg hover:bg-navy-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          isOpen={true}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
