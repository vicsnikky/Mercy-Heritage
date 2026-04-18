import React, { useState, useEffect } from "react";
import { useAppStore, PostCategory } from "../../store/useStore";
import { Trash2, AlertCircle, CheckCircle2, Image as ImageIcon, Video, Plus, KeyRound } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";

export function AdminDashboard() {
  const { posts, gallery, addPost, deletePost, addGalleryItem, deleteGalleryItem, updatePassword, fetchPosts, fetchGallery } = useAppStore();

  useEffect(() => {
    fetchPosts();
    fetchGallery();
  }, [fetchPosts, fetchGallery]);
  
  // Tabs
  const [activeTab, setActiveTab] = useState<'posts' | 'gallery' | 'settings'>('posts');

  // Notifications
  const [notification, setNotification] = useState<{type: 'success'|'error', msg: string} | null>(null);

  const showNotif = (type: 'success'|'error', msg: string) => {
    setNotification({type, msg});
    setTimeout(() => setNotification(null), 3000);
  };

  // Post Form State
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postCat, setPostCat] = useState<PostCategory>("news");
  const [postImg, setPostImg] = useState("");
  const [postVid, setPostVid] = useState("");

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
    if (!postTitle || !postDesc) return showNotif('error', 'Title and Description are required.');
    
    try {
      await addPost({
        title: postTitle,
        description: postDesc,
        category: postCat,
        imageUrl: postImg || undefined,
        videoUrl: postVid || undefined,
      });
      
      setPostTitle(""); setPostDesc(""); setPostImg(""); setPostVid("");
      showNotif('success', 'Post added successfully');
    } catch (err) {
      showNotif('error', 'Failed to add post. Check Supabase config.');
    }
  };

  // Gallery Form State
  const [galCap, setGalCap] = useState("");
  const [galImg, setGalImg] = useState("");
  const [galVid, setGalVid] = useState("");

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galCap) return showNotif('error', 'Caption is required.');
    if (!galImg && !galVid) return showNotif('error', 'Media URL is required.');

    try {
      await addGalleryItem({
        caption: galCap,
        imageUrl: galImg || undefined,
        videoUrl: galVid || undefined,
      });

      setGalCap(""); setGalImg(""); setGalVid("");
      showNotif('success', 'Gallery item added successfully');
    } catch (err) {
      showNotif('error', 'Failed to add gallery item. Check Supabase config.');
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
        <h1 className="text-3xl font-bold text-navy">Dashboard Overview</h1>
      </div>

      {notification && (
        <div className={cn(
          "p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4",
          notification.type === 'success' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        )}>
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5"/> : <AlertCircle className="w-5 h-5"/>}
          {notification.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'posts', label: 'News & Events' },
          { id: 'gallery', label: 'Gallery' },
          { id: 'settings', label: 'Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-6 py-3 font-medium transition-colors border-b-2",
              activeTab === tab.id 
                ? "border-navy text-navy" 
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
              <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5"/> Add Update
              </h2>
              <form onSubmit={handleAddPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    value={postCat} onChange={(e) => setPostCat(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent outline-none bg-white"
                  >
                    <option value="news">News</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required value={postTitle} onChange={e=>setPostTitle(e.target.value)} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-shadow" placeholder="e.g. Annual Sports Day" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea required value={postDesc} onChange={e=>setPostDesc(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none" placeholder="Details about this update..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><ImageIcon className="w-4 h-4"/> Upload Image (Max 4MB)</label>
                  <input accept="image/*" onChange={e=>handleImageUpload(e, setPostImg)} type="file" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  {postImg && <img src={postImg} alt="Preview" className="mt-2 h-20 w-auto rounded object-cover border border-gray-200" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Video className="w-4 h-4"/> Video URL (Optional)</label>
                  <input value={postVid} onChange={e=>setPostVid(e.target.value)} type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="YouTube or Google Drive link" />
                </div>
                <button type="submit" className="w-full bg-navy text-white font-bold py-2.5 rounded-lg hover:bg-navy-dark transition-colors">Publish Update</button>
              </form>
            </div>

            <div className="xl:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-navy mb-4">Published Updates ({posts.length})</h2>
              {posts.map(post => (
                <div key={post.id} className="bg-white p-4 border border-gray-200 rounded-xl flex gap-4 items-start shadow-sm">
                  {post.imageUrl && (
                    <img src={post.imageUrl} className="w-24 h-24 object-cover rounded-lg shrink-0 border border-gray-100" />
                  )}
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className={cn("text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md", post.category === 'news' ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800")}>{post.category}</span>
                      <span className="text-xs text-gray-400">{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                    <h3 className="font-bold text-navy truncate">{post.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{post.description}</p>
                  </div>
                  <button onClick={() => deletePost(post.id, post.imageUrl)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0" title="Delete Post">
                    <Trash2 className="w-5 h-5"/>
                  </button>
                </div>
              ))}
              {posts.length === 0 && <p className="text-gray-500 py-8 text-center italic">No updates published.</p>}
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1 border border-gray-200 bg-white rounded-2xl shadow-sm p-6 self-start">
              <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5"/> Add to Gallery
              </h2>
              <form onSubmit={handleAddGallery} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                  <input required value={galCap} onChange={e=>setGalCap(e.target.value)} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="A brief description" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><ImageIcon className="w-4 h-4"/> Upload Image (Max 4MB)</label>
                  <input accept="image/*" onChange={e=>handleImageUpload(e, setGalImg)} type="file" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  {galImg && <img src={galImg} alt="Preview" className="mt-2 h-20 w-auto rounded object-cover border border-gray-200" />}
                </div>
                <div className="text-center text-sm font-medium text-gray-400">— OR —</div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Video className="w-4 h-4"/> Video URL</label>
                  <input value={galVid} onChange={e=>setGalVid(e.target.value)} type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="YouTube or Drive link" />
                </div>
                <button type="submit" className="w-full bg-navy text-white font-bold py-2.5 rounded-lg hover:bg-navy-dark transition-colors">Add Media</button>
              </form>
            </div>

            <div className="xl:col-span-2">
               <h2 className="text-xl font-bold text-navy mb-4">Gallery Items ({gallery.length})</h2>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallery.map(item => (
                    <div key={item.id} className="relative group bg-gray-100 rounded-xl overflow-hidden aspect-square border border-gray-200">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} className="w-full h-full object-cover" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                           <Video className="w-8 h-8 opacity-50"/>
                         </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                        <div className="flex justify-end">
                           <button onClick={() => deleteGalleryItem(item.id, item.imageUrl)} className="p-1.5 bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                             <Trash2 className="w-4 h-4"/>
                           </button>
                        </div>
                        <p className="text-xs font-medium line-clamp-3">{item.caption}</p>
                      </div>
                    </div>
                  ))}
               </div>
               {gallery.length === 0 && <p className="text-gray-500 py-8 text-center italic">Gallery is empty.</p>}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-md border border-gray-200 bg-white rounded-2xl shadow-sm p-6">
             <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <KeyRound className="w-5 h-5"/> Security Settings
              </h2>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Admin Password</label>
                  <input 
                    required 
                    value={newPass} 
                    onChange={e=>setNewPass(e.target.value)} 
                    type="password" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    placeholder="Enter new password" 
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Changing the password will update it locally. Next time you login, use the new password.
                  </p>
                </div>
                <button type="submit" className="bg-navy text-white font-bold py-2.5 px-6 rounded-lg hover:bg-navy-dark transition-colors">Update Password</button>
              </form>
          </div>
        )}

      </div>
    </div>
  );
}
