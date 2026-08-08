import React, { useState, useEffect } from "react";
import { useAppStore, PostCategory, Post } from "../../store/useStore";
import { Trash2, AlertCircle, CheckCircle2, Image as ImageIcon, Video, Plus, KeyRound, Pencil, X, Play, ExternalLink, Sparkles, Youtube } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { getYouTubeThumbnailUrl, isYouTubeUrl, graduationVideos } from "../../lib/videoUtils";
import { VideoPlayerModal } from "../../components/VideoPlayerModal";

export function AdminDashboard() {
  const { posts, gallery, addPost, updatePost, deletePost, addGalleryItem, deleteGalleryItem, updatePassword, fetchPosts, fetchGallery } = useAppStore();

  useEffect(() => {
    fetchPosts();
    fetchGallery();
  }, [fetchPosts, fetchGallery]);
  
  // Tabs
  const [activeTab, setActiveTab] = useState<'posts' | 'gallery' | 'settings'>('posts');

  // Video modal preview
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  // Notifications
  const [notification, setNotification] = useState<{type: 'success'|'error', msg: string} | null>(null);

  const showNotif = (type: 'success'|'error', msg: string) => {
    setNotification({type, msg});
    setTimeout(() => setNotification(null), 4000);
  };

  // Post Form State
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postCat, setPostCat] = useState<PostCategory>("event");
  const [postImg, setPostImg] = useState("");
  const [postVid, setPostVid] = useState("");

  // Live calculated thumbnail for post
  const effectivePostImg = postImg || (postVid && isYouTubeUrl(postVid) ? getYouTubeThumbnailUrl(postVid) : "") || "";

  // Edit Post Modal State
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCat, setEditCat] = useState<PostCategory>("event");
  const [editImg, setEditImg] = useState("");
  const [editVid, setEditVid] = useState("");

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
    if (!editTitle.trim() || !editDesc.trim()) return showNotif('error', 'Title and Description are required.');

    try {
      await updatePost(editingPost.id, {
        title: editTitle.trim(),
        description: editDesc.trim(),
        category: editCat,
        imageUrl: editImg.trim() || undefined,
        videoUrl: editVid.trim() || undefined,
      });
      setEditingPost(null);
      showNotif('success', 'Update edited and published successfully!');
    } catch (err) {
      showNotif('error', 'Failed to update post.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setter("");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      showNotif('error', 'Image size must not exceed 4MB');
      e.target.value = '';
      setter("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postDesc.trim()) return showNotif('error', 'Title and Description are required.');
    
    try {
      await addPost({
        title: postTitle.trim(),
        description: postDesc.trim(),
        category: postCat,
        imageUrl: postImg.trim() || undefined,
        videoUrl: postVid.trim() || undefined,
      });
      
      setPostTitle(""); 
      setPostDesc(""); 
      setPostImg(""); 
      setPostVid("");
      showNotif('success', '🎉 Post published successfully! It is now live on the website.');
    } catch (err) {
      showNotif('error', 'Failed to publish post. Please check details.');
    }
  };

  const handleDeletePost = async (id: string, imageUrl?: string) => {
    if (!window.confirm("Are you sure you want to delete this update?")) return;
    try {
      await deletePost(id, imageUrl);
      showNotif('success', 'Update deleted successfully');
    } catch (err) {
      showNotif('error', 'Failed to delete update');
    }
  };

  const handleDeleteGallery = async (id: string, imageUrl?: string) => {
    if (!window.confirm("Are you sure you want to delete this item from gallery?")) return;
    try {
      await deleteGalleryItem(id, imageUrl);
      showNotif('success', 'Gallery item deleted successfully');
    } catch (err) {
      showNotif('error', 'Failed to delete gallery item');
    }
  };

  const [galCap, setGalCap] = useState("");
  const [galImg, setGalImg] = useState("");
  const [galVid, setGalVid] = useState("");

  const effectiveGalImg = galImg || (galVid && isYouTubeUrl(galVid) ? getYouTubeThumbnailUrl(galVid) : "") || "";

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galCap.trim()) return showNotif('error', 'Caption is required.');
    if (!galImg.trim() && !galVid.trim()) return showNotif('error', 'Please provide an Image or a Video URL.');

    try {
      await addGalleryItem({
        caption: galCap.trim(),
        imageUrl: galImg.trim() || undefined,
        videoUrl: galVid.trim() || undefined,
      });

      setGalCap(""); 
      setGalImg(""); 
      setGalVid("");
      showNotif('success', '🎉 2026 Graduation picture / media published successfully! It is now live on the website.');
    } catch (err) {
      showNotif('error', 'Failed to add graduation picture.');
    }
  };

  // Quick helper to fill in graduation video preset
  const handleFillVideoPreset = (vid: typeof graduationVideos[0]) => {
    if (activeTab === 'posts') {
      setPostTitle(vid.title);
      setPostDesc(vid.description);
      setPostCat("event");
      setPostVid(vid.videoUrl);
      setPostImg(vid.thumbnailUrl);
      showNotif('success', `Loaded "${vid.title}". Click Publish to save!`);
    } else {
      setGalCap(vid.title);
      setGalVid(vid.videoUrl);
      setGalImg(vid.thumbnailUrl);
      showNotif('success', `Loaded "${vid.title}" into 2026 Graduation Pictures form. Click Publish to save!`);
    }
  };

  // Settings State
  const [newPass, setNewPass] = useState("");
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) return showNotif('error', 'Password must be at least 6 characters.');
    updatePassword(newPass);
    setNewPass("");
    showNotif('success', 'Password updated successfully');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Admin Publishing Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage 2026 graduation ceremonies, YouTube video highlights, announcements, and photo galleries with live publishing.
          </p>
        </div>
      </div>

      {notification && (
        <div className={cn(
          "p-4 rounded-xl flex items-center gap-3 shadow-sm border animate-in fade-in slide-in-from-top-4",
          notification.type === 'success' 
            ? "bg-emerald-50 text-emerald-900 border-emerald-200" 
            : "bg-red-50 text-red-900 border-red-200"
        )}>
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0"/> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0"/>}
          <span className="font-medium text-sm">{notification.msg}</span>
        </div>
      )}

      {/* Quick 2026 Graduation Videos Banner */}
      <div className="bg-gradient-to-r from-navy via-navy-dark to-slate-900 text-white rounded-2xl p-6 shadow-md border border-navy/20">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-bold">2026 Graduation Ceremony YouTube Videos</h2>
        </div>
        <p className="text-sm text-gray-300 mb-4">
          Click any video preset below to auto-fill the form and publish directly to the website:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {graduationVideos.map((vid, idx) => (
            <div key={vid.id} className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 flex flex-col justify-between transition-all">
              <div className="flex items-start gap-3 mb-2">
                <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-black/40">
                  <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-accent-gold bg-black/30 px-1.5 py-0.5 rounded">
                    {vid.tag}
                  </span>
                  <p className="text-xs font-semibold text-white truncate mt-1">{vid.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleFillVideoPreset(vid)}
                  className="flex-1 py-1.5 px-2 bg-accent-gold text-navy font-bold text-xs rounded-lg hover:bg-yellow-400 transition-colors text-center"
                >
                  Load into {activeTab === 'gallery' ? '2026 Graduation Pictures' : 'Posts'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVideo({ url: vid.videoUrl, title: vid.title })}
                  className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  title="Test Play Video"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'posts', label: `News & Events Updates (${posts.length})` },
          { id: 'gallery', label: `2026 Graduation Pictures (${gallery.length})` },
          { id: 'settings', label: 'Admin Security' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-6 py-3 font-semibold text-sm sm:text-base transition-colors border-b-2",
              activeTab === tab.id 
                ? "border-navy text-navy font-bold" 
                : "border-transparent text-gray-500 hover:text-navy hover:border-gray-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {/* POSTS TAB */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1 border border-gray-200 bg-white rounded-2xl shadow-sm p-6 self-start">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-accent-red"/> Publish News or Event
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Publishing here instantly updates the Home and News & Events pages on the live website.
              </p>
              <form onSubmit={handleAddPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select 
                    value={postCat} onChange={(e) => setPostCat(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent outline-none bg-white font-medium"
                  >
                    <option value="event">Event (Graduation & Milestone Celebrations)</option>
                    <option value="news">News & Academic Notices</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                  <input 
                    required 
                    value={postTitle} 
                    onChange={e=>setPostTitle(e.target.value)} 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy outline-none" 
                    placeholder="e.g. 2026 Graduation Ceremony Highlights" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea 
                    required 
                    value={postDesc} 
                    onChange={e=>setPostDesc(e.target.value)} 
                    rows={4} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-navy outline-none" 
                    placeholder="Write details about this event or news update..." 
                  />
                </div>
                
                {/* Video URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <Youtube className="w-4 h-4 text-red-600"/> YouTube Video URL (Optional)
                  </label>
                  <input 
                    value={postVid} 
                    onChange={e=>setPostVid(e.target.value)} 
                    type="url" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy outline-none text-sm" 
                    placeholder="e.g. https://youtu.be/-XAR0F1ae24" 
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Supports YouTube links. Thumbnails are automatically extracted.
                  </p>
                </div>

                {/* Image Upload or URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-navy"/> Image / Cover Photo
                  </label>
                  <input 
                    accept="image/*" 
                    onChange={e=>handleImageUpload(e, setPostImg)} 
                    type="file" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50" 
                  />
                  {effectivePostImg && (
                    <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-100 group">
                      <img src={effectivePostImg} alt="Preview" className="w-full h-full object-cover" />
                      {postVid && isYouTubeUrl(postVid) && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-white font-bold text-[10px] rounded-md flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-current" /> YouTube Video Preview
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-navy-dark transition-all shadow-md active:scale-[0.99]"
                >
                  🚀 Publish to Website
                </button>
              </form>
            </div>

            <div className="xl:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy">Published Updates ({posts.length})</h2>
                <span className="text-xs text-gray-500 font-medium">Auto-synced across Home & News</span>
              </div>
              
              <div className="space-y-3">
                {posts.map(post => (
                  <div key={post.id} className="bg-white p-4 border border-gray-200 rounded-xl flex gap-4 items-start shadow-sm hover:border-gray-300 transition-colors">
                    {post.imageUrl ? (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-gray-100">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                        {post.videoUrl && (
                          <button
                            type="button"
                            onClick={() => setSelectedVideo({ url: post.videoUrl!, title: post.title })}
                            className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors text-white"
                            title="Play Video"
                          >
                            <Play className="w-6 h-6 fill-current text-white" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-navy/5 flex items-center justify-center shrink-0 border border-navy/10">
                        <ImageIcon className="w-8 h-8 text-navy/40" />
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md", post.category === 'news' ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800")}>
                          {post.category}
                        </span>
                        {post.videoUrl && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-100 text-red-700 flex items-center gap-1">
                            <Play className="w-2.5 h-2.5 fill-current" /> Video
                          </span>
                        )}
                        <span className="text-xs text-gray-400 ml-auto">{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                      <h3 className="font-bold text-navy text-base truncate">{post.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1">{post.description}</p>
                      
                      {post.videoUrl && (
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedVideo({ url: post.videoUrl!, title: post.title })}
                            className="text-xs font-semibold text-accent-red hover:underline flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 fill-current" /> Watch Video
                          </button>
                          <span className="text-gray-300">•</span>
                          <a
                            href={post.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                          >
                            Open YouTube <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0 self-center">
                      <button 
                        onClick={() => handleStartEdit(post)} 
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Edit Post"
                      >
                        <Pencil className="w-4 h-4"/>
                      </button>
                      <button 
                        onClick={() => handleDeletePost(post.id, post.imageUrl)} 
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete Post"
                      >
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {posts.length === 0 && <p className="text-gray-500 py-8 text-center italic">No updates published yet.</p>}
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1 border border-gray-200 bg-white rounded-2xl shadow-sm p-6 self-start">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-accent-red"/> Add 2026 Graduation Picture or Video
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Add 2026 graduation ceremony photos or YouTube video clips directly to the 2026 Graduation Pictures gallery.
              </p>
              <form onSubmit={handleAddGallery} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Caption / Title</label>
                  <input 
                    required 
                    value={galCap} 
                    onChange={e=>setGalCap(e.target.value)} 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy outline-none" 
                    placeholder="e.g. 2026 Graduation: Choir Musical Performance" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Youtube className="w-4 h-4 text-red-600"/> YouTube Video URL
                  </label>
                  <input 
                    value={galVid} 
                    onChange={e=>setGalVid(e.target.value)} 
                    type="url" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy outline-none text-sm" 
                    placeholder="e.g. https://youtu.be/1bElOWvJURM" 
                  />
                </div>

                <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">— OR UPLOAD IMAGE —</div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <ImageIcon className="w-4 h-4 text-navy"/> Upload 2026 Graduation Picture (Max 4MB)
                  </label>
                  <input 
                    accept="image/*" 
                    onChange={e=>handleImageUpload(e, setGalImg)} 
                    type="file" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50" 
                  />
                  {effectiveGalImg && (
                    <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-100">
                      <img src={effectiveGalImg} alt="Preview" className="w-full h-full object-cover" />
                      {galVid && isYouTubeUrl(galVid) && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-white font-bold text-[10px] rounded-md flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-current" /> Video Preview
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-navy-dark transition-all shadow-md active:scale-[0.99]"
                >
                  🚀 Publish to 2026 Graduation Pictures
                </button>
              </form>
            </div>

            <div className="xl:col-span-2">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-xl font-bold text-navy">2026 Graduation Pictures ({gallery.length})</h2>
                 <span className="text-xs text-gray-500">Live on the 2026 Graduation Pictures page</span>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallery.map(item => (
                    <div key={item.id} className="relative group bg-gray-100 rounded-xl overflow-hidden aspect-square border border-gray-200 shadow-sm">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                           <Video className="w-8 h-8 opacity-50"/>
                         </div>
                      )}
                      
                      {item.videoUrl && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-current" /> Video
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                        <div className="flex justify-end gap-1.5">
                           {item.videoUrl && (
                             <button
                               type="button"
                               onClick={() => setSelectedVideo({ url: item.videoUrl!, title: item.caption })}
                               className="p-1.5 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                               title="Watch Video"
                             >
                               <Play className="w-3.5 h-3.5" />
                             </button>
                           )}
                           <button 
                             onClick={() => handleDeleteGallery(item.id, item.imageUrl)} 
                             className="p-1.5 bg-red-600 rounded-lg hover:bg-red-700 transition-colors" 
                             title="Delete Gallery Item"
                           >
                             <Trash2 className="w-3.5 h-3.5"/>
                           </button>
                        </div>
                        <p className="text-xs font-semibold line-clamp-3">{item.caption}</p>
                      </div>
                    </div>
                  ))}
               </div>
               {gallery.length === 0 && <p className="text-gray-500 py-8 text-center italic">2026 Graduation Pictures gallery is empty.</p>}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-md border border-gray-200 bg-white rounded-2xl shadow-sm p-6">
             <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-accent-red"/> Security Settings
              </h2>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">New Admin Password</label>
                  <input 
                    required 
                    value={newPass} 
                    onChange={e=>setNewPass(e.target.value)} 
                    type="password" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy outline-none" 
                    placeholder="Enter new password (min 6 chars)" 
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use this password whenever logging into <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-navy">/admin</code>.
                  </p>
                </div>
                <button type="submit" className="bg-navy text-white font-bold py-2.5 px-6 rounded-xl hover:bg-navy-dark transition-colors shadow">
                  Update Password
                </button>
              </form>
          </div>
        )}

      </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={editCat} 
                  onChange={(e) => setEditCat(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy outline-none bg-white"
                >
                  <option value="event">Event</option>
                  <option value="news">News</option>
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
                  <Video className="w-4 h-4 text-red-600"/> Video URL (Optional)
                </label>
                <input 
                  value={editVid} 
                  onChange={e => setEditVid(e.target.value)} 
                  type="url" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                  placeholder="YouTube video link" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <ImageIcon className="w-4 h-4"/> Image
                </label>
                <input 
                  accept="image/*" 
                  onChange={e => handleImageUpload(e, setEditImg)} 
                  type="file" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                />
                {editImg && (
                  <img src={editImg} alt="Preview" className="mt-2 h-24 w-auto rounded object-cover border border-gray-200" />
                )}
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

      {/* VIDEO PLAYER MODAL */}
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
