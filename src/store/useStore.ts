import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export type PostCategory = 'news' | 'event';

export interface Post {
  id: string;
  title: string;
  description: string;
  category: PostCategory;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: number;
}

export interface GalleryItem {
  id: string;
  caption: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: number;
}

interface AppState {
  adminPasswordHash: string;
  isAuthenticated: boolean;
  posts: Post[];
  gallery: GalleryItem[];
  isLoading: boolean;
  
  // Auth Actions
  login: (password: string) => boolean;
  logout: () => void;
  updatePassword: (newPassword: string) => void;
  
  // Data Actions
  fetchPosts: () => Promise<void>;
  fetchGallery: () => Promise<void>;
  
  addPost: (post: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
  deletePost: (id: string, imageUrl?: string) => Promise<void>;
  
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'createdAt'>) => Promise<void>;
  deleteGalleryItem: (id: string, imageUrl?: string) => Promise<void>;
}

// Helper to convert base64 (from our preview) to a Blob and upload to Supabase Storage
async function uploadImage(base64: string): Promise<string | null> {
  if (!base64.startsWith('data:')) return base64; // already a URL
  try {
    const response = await fetch(base64);
    const blob = await response.blob();
    const ext = blob.type.split('/')[1] || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    
    const { error } = await supabase.storage.from('school_media').upload(fileName, blob, {
      contentType: blob.type,
      cacheControl: '3600',
      upsert: false
    });
    
    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage.from('school_media').getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Image upload failed:', err);
    return null;
  }
}

// Helper to extract filename from Supabase public URL and delete it
async function deleteImage(imageUrl?: string) {
  if (!imageUrl || !imageUrl.includes('school_media')) return;
  try {
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    if (fileName) {
      await supabase.storage.from('school_media').remove([fileName]);
    }
  } catch (err) {
    console.error('Failed to delete image:', err);
  }
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      adminPasswordHash: 'Admin123',
      isAuthenticated: false,
      posts: [],
      gallery: [],
      isLoading: false,
      
      login: (password) => {
        const { adminPasswordHash } = get();
        if (password === adminPasswordHash) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => set({ isAuthenticated: false }),
      
      updatePassword: (newPassword) => set({ adminPasswordHash: newPassword }),

      fetchPosts: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!error && data) {
          set({
            posts: data.map(d => ({
              id: d.id,
              title: d.title,
              description: d.description,
              category: d.category,
              imageUrl: d.image_url,
              videoUrl: d.video_url,
              createdAt: new Date(d.created_at).getTime()
            }))
          });
        }
        set({ isLoading: false });
      },

      fetchGallery: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!error && data) {
          set({
            gallery: data.map(d => ({
              id: d.id,
              caption: d.caption,
              imageUrl: d.image_url,
              videoUrl: d.video_url,
              createdAt: new Date(d.created_at).getTime()
            }))
          });
        }
        set({ isLoading: false });
      },
      
      addPost: async (postData) => {
        const uploadedUrl = postData.imageUrl ? await uploadImage(postData.imageUrl) : undefined;
        
        const { error } = await supabase.from('posts').insert([{
          title: postData.title,
          description: postData.description,
          category: postData.category,
          image_url: uploadedUrl,
          video_url: postData.videoUrl
        }]);
        
        if (error) throw error;
        await get().fetchPosts();
      },
      
      deletePost: async (id, imageUrl) => {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) throw error;
        
        if (imageUrl) {
          await deleteImage(imageUrl);
        }
        
        await get().fetchPosts();
      },
      
      addGalleryItem: async (itemData) => {
        const uploadedUrl = itemData.imageUrl ? await uploadImage(itemData.imageUrl) : undefined;
        
        const { error } = await supabase.from('gallery').insert([{
          caption: itemData.caption,
          image_url: uploadedUrl,
          video_url: itemData.videoUrl
        }]);
        
        if (error) throw error;
        await get().fetchGallery();
      },
      
      deleteGalleryItem: async (id, imageUrl) => {
        const { error } = await supabase.from('gallery').delete().eq('id', id);
        if (error) throw error;

        if (imageUrl) {
          await deleteImage(imageUrl);
        }
        
        await get().fetchGallery();
      }
    }),
    {
      name: 'mercy-heritage-auth',
      // ONLY persist auth credentials natively, we don't need to persist posts locally now 
      // because we are fetching them from Supabase.
      partialize: (state) => ({ 
        adminPasswordHash: state.adminPasswordHash,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
