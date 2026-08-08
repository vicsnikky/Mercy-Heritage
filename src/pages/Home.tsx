import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Users, Trophy, Calendar, Newspaper, ExternalLink, Trash2, Pencil, X, Image as ImageIcon, Video, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore, Post, PostCategory } from "../store/useStore";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { graduationVideos } from "../lib/videoUtils";
import { VideoPlayerModal } from "../components/VideoPlayerModal";

export function Home() {
  const posts = useAppStore(state => state.posts);
  const fetchPosts = useAppStore(state => state.fetchPosts);
  const deletePost = useAppStore(state => state.deletePost);
  const updatePost = useAppStore(state => state.updatePost);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  // Video modal preview state
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  // Edit Modal State for Home page admin actions
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
    if (window.confirm("Are you sure you want to delete this update?")) {
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

  const recentPosts = posts.slice(0, 9);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-navy overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577896849786-738ed6c78bd3?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-accent-red/20 text-white font-medium text-sm mb-6 border border-accent-red/50">
              Welcome to Mercy Heritage
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Study with us in Mercy Heritage and Build Your Future
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
              Providing quality, inclusive education that promotes equity and nurtures every child towards excellence in character and learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="px-8 py-4 bg-accent-red text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
                Visit Us Today <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/news-events" className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
                <Play className="w-4 h-4 text-accent-gold fill-current" /> 2026 Graduation Highlights
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2026 Graduation Video Showcase */}
      <section className="py-16 bg-gradient-to-b from-navy to-navy-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-accent-gold font-bold uppercase tracking-wider text-xs sm:text-sm">
                <Sparkles className="w-4 h-4" /> Official 2026 Video Highlights
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                2026 Graduation Ceremony Videos
              </h2>
              <div className="w-20 h-1 bg-accent-gold mt-3" />
            </div>
            <p className="text-sm text-gray-300 max-w-md">
              Watch memorable moments, valedictory speeches, cultural performances, and milestone certificate presentations from the 2026 ceremony.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {graduationVideos.map((vid, idx) => (
              <motion.div
                key={vid.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent-gold/50 transition-all group flex flex-col justify-between shadow-xl"
              >
                <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setSelectedVideo({ url: vid.videoUrl, title: vid.title })}>
                  <img 
                    src={vid.thumbnailUrl} 
                    alt={vid.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-accent-red text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/70 text-accent-gold backdrop-blur-xs border border-white/10">
                    {vid.tag}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-accent-gold transition-colors line-clamp-2 mb-2">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-4">
                      {vid.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedVideo({ url: vid.videoUrl, title: vid.title })}
                      className="text-xs font-bold text-accent-gold hover:text-yellow-300 flex items-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Watch Video
                    </button>
                    <a
                      href={vid.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why Choose Mercy Heritage?</h2>
            <div className="w-24 h-1 bg-accent-red mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-accent-red" />,
                title: "Academic Excellence",
                desc: "Rigorous curriculum designed to challenge and inspire students towards their highest potential."
              },
              {
                icon: <Users className="w-8 h-8 text-accent-red" />,
                title: "Dedicated Staff",
                desc: "Experienced educators committed to nurturing every child's unique talents and abilities."
              },
              {
                icon: <Trophy className="w-8 h-8 text-accent-red" />,
                title: "Holistic Development",
                desc: "Focus on character building, extracurricular activities, and service to society."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shaping Extraordinary Minds Section */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://i.ibb.co/kpC97JK/file-0000000081a071f481bb137e78e0a75a.png" 
                  alt="Mercy Heritage Excellence" 
                  className="rounded-2xl shadow-2xl w-full border-4 border-white/10"
                />
              </motion.div>
            </div>
            <div className="lg:w-1/2 text-white">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Shaping Extraordinary Minds for a Brighter Future</h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  At Mercy Heritage, we believe that education is the most powerful tool to change the world. Our dedicated approach focuses on identifying and nurturing the unique potential within every child, fostering a culture of innovation, critical thinking, and moral integrity.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex-1 min-w-[200px]">
                    <h4 className="font-bold text-accent-red mb-1">Our Vision</h4>
                    <p className="text-sm text-gray-400">To be a leading educational institution that produces global citizens equipped with expertise and character.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex-1 min-w-[200px]">
                    <h4 className="font-bold text-accent-red mb-1">Our Mission</h4>
                    <p className="text-sm text-gray-400">To provide high-quality, inclusive, and equitable education that fosters total transformation.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message Section */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src="https://i.ibb.co/JjbsPDjV/file-00000000c9e471f4aa67597cd355f272.png" 
                  alt="Akinsola Micheal" 
                  className="rounded-2xl shadow-xl w-full border-4 border-white"
                />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent-red rounded-xl -z-10" />
              </motion.div>
            </div>
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-navy">Message from the Founder</h2>
                <div className="w-20 h-1 bg-accent-red mb-6" />
                <p className="text-xl text-gray-600 italic font-medium leading-relaxed">
                  "Our goal is to create an environment where learning is coupled with character development. Every child at Mercy Heritage is seen as a unique heritage with a bright future ahead."
                </p>
                <div>
                  <h4 className="text-2xl font-bold text-navy">Akinsola Micheal</h4>
                  <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mt-1">Founder & President, Mercy Heritage School</p>
                </div>
                <Link to="/about" className="inline-flex items-center gap-2 text-accent-red font-bold hover:gap-3 transition-all">
                  Read His Bio <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Events Section */}
      <section className="py-20 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-accent-red font-bold uppercase tracking-wider text-sm">Official Gallery & Updates</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-1">2026 Graduation Pictures & Highlights</h2>
              <div className="w-20 h-1 bg-accent-red mt-3" />
            </div>
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy-dark transition-colors self-start md:self-auto shadow-md"
            >
              View All 2026 Graduation Pictures <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-off-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col hover:shadow-lg transition-all group"
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
                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
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
        </div>
      </section>

      {/* EDIT POST MODAL */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent outline-none bg-white"
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
                  <Video className="w-4 h-4"/> Video URL (Optional)
                </label>
                <input 
                  value={editVid} 
                  onChange={e => setEditVid(e.target.value)} 
                  type="url" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                  placeholder="YouTube or Google Drive link" 
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

      {/* Quick Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop" 
                alt="Students studying" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Featured Programs</h2>
              <p className="text-lg text-gray-600 mb-8">
                From early childhood education to rigorous tutorials for external examinations, we provide a structured learning environment for every stage of development.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Creche, Nursery & Primary Education",
                  "High/Secondary School Programs",
                  "Tutorials for External Examinations (WAEC, NECO, JAMB)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      ✓
                    </div>
                    <span className="text-navy-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/programs" className="text-accent-red font-semibold hover:text-rose-700 flex items-center gap-2">
                Explore All Programs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
