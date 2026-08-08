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

export const defaultPosts: Post[] = [
  {
    id: "post-vid-1",
    title: "2026 Graduation Ceremony: Grand Video Highlights & Processional",
    description: "Watch the full video highlights of Mercy Heritage Nursery and Primary School's landmark 2026 Graduation Ceremony, showcasing the grand processional, speeches, and joy.",
    category: "event",
    imageUrl: "https://img.youtube.com/vi/-XAR0F1ae24/hqdefault.jpg",
    videoUrl: "https://youtu.be/-XAR0F1ae24?si=NwRIWIElPTe1w2p0",
    createdAt: Date.now() - 86400000 * 0.5,
  },
  {
    id: "post-vid-2",
    title: "2026 Graduation Ceremony: Student Presentations & Cultural Dances (Clip 2)",
    description: "Inspiring student addresses, emotional farewell remarks, choir presentations, and vibrant graduation cultural dances during the 2026 celebration.",
    category: "event",
    imageUrl: "https://img.youtube.com/vi/1bElOWvJURM/hqdefault.jpg",
    videoUrl: "https://youtu.be/1bElOWvJURM?si=tUsSzlBHfIKPExHs",
    createdAt: Date.now() - 86400000 * 0.8,
  },
  {
    id: "post-vid-3",
    title: "2026 Graduation Ceremony: Awards Recognition & Certificate Conferment (Clip 3)",
    description: "Honoring top-performing pupils, testimonial presentations, prize giving, and joyful family celebrations at the 2026 Mercy Heritage Graduation Ceremony.",
    category: "event",
    imageUrl: "https://img.youtube.com/vi/T-XvECAxa4g/hqdefault.jpg",
    videoUrl: "https://youtu.be/T-XvECAxa4g?si=2mYPSp0tGvcwYFsL",
    createdAt: Date.now() - 86400000 * 0.9,
  },
  {
    id: "post-1",
    title: "2026 Graduation Ceremony: Grand Opening & Processional",
    description: "Mercy Heritage Nursery and Primary School celebrated our landmark 2026 Graduation Ceremony with joy, elegance, and pride as students stepped forward into new academic heights.",
    category: "event",
    imageUrl: "https://i.ibb.co/TDbjhGCK/Whats-App-Image-2026-08-04-at-7-09-47-AM.jpg",
    videoUrl: "https://youtu.be/-XAR0F1ae24?si=NwRIWIElPTe1w2p0",
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: "post-2",
    title: "2026 Graduation: Academic Excellence & Prize Giving",
    description: "Honoring top-performing pupils at the 2026 Graduation & Prize Giving Ceremony for outstanding academic brilliance, leadership, and exemplary character.",
    category: "event",
    imageUrl: "https://i.ibb.co/Gfqz7PJS/Whats-App-Image-2026-08-04-at-7-09-48-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "post-3",
    title: "2026 Graduation: Cultural Dance & Student Performances",
    description: "Graduating students delighted parents, royal guests, and teachers with vibrant traditional dances and musical presentations during the 2026 graduation celebration.",
    category: "event",
    imageUrl: "https://i.ibb.co/JWNQxGLx/Whats-App-Image-2026-08-04-at-7-09-48-AM-2.jpg",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "post-4",
    title: "2026 Graduation: Valedictory Speech & Class Address",
    description: "The Head Boy and Head Girl delivered an emotional Valedictory Address at the 2026 Graduation Ceremony, thanking teachers, parents, and school management.",
    category: "event",
    imageUrl: "https://i.ibb.co/v46n7zFP/Whats-App-Image-2026-08-04-at-7-09-48-AM.jpg",
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: "post-5",
    title: "2026 Graduation: Nursery & Kindergarten Transition",
    description: "Heartfelt moments as our Kindergarten and Nursery pupils graduated into Primary school during the memorable 2026 Mercy Heritage Graduation day.",
    category: "event",
    imageUrl: "https://i.ibb.co/DHMXmSYc/Whats-App-Image-2026-08-04-at-7-09-49-AM.jpg",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "post-6",
    title: "2026 Graduation: Presentation of Diplomas & Certificates",
    description: "Each graduating pupil proudly received their graduation certificate and testimonial on stage amidst loud applause from families and well-wishers.",
    category: "event",
    imageUrl: "https://i.ibb.co/3VxLf5k/Whats-App-Image-2026-08-04-at-7-09-50-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: "post-7",
    title: "2026 Graduation: Choir & Musical Symphony",
    description: "The Mercy Heritage school choir melodiously serenaded guests with inspirational songs of gratitude during the 2026 student graduation ceremony.",
    category: "event",
    imageUrl: "https://i.ibb.co/1tjStLGw/Whats-App-Image-2026-08-04-at-7-09-50-AM-2.jpg",
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: "post-8",
    title: "2026 Graduation: Cutting of the Graduation Cake",
    description: "School executives, graduating pupils, and parents joined together on stage for the ceremonial cutting of the 2026 Mercy Heritage Graduation Cake.",
    category: "event",
    imageUrl: "https://i.ibb.co/whNRFTNy/Whats-App-Image-2026-08-04-at-7-09-50-AM.jpg",
    createdAt: Date.now() - 86400000 * 8,
  },
  {
    id: "post-9",
    title: "2026 Graduation: Drama & Creative Stage Play",
    description: "Student actors staged a captivating moral drama showcasing heritage, perseverance, and academic dedication at the 2026 graduation event.",
    category: "event",
    imageUrl: "https://i.ibb.co/ZR0FDSQt/Whats-App-Image-2026-08-04-at-7-09-51-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 9,
  },
  {
    id: "post-10",
    title: "2026 Graduation: PTA Recognition & Parent Appreciation",
    description: "Parents and guardians were celebrated for their unwavering commitment and support towards the success of the graduating Class of 2026.",
    category: "news",
    imageUrl: "https://i.ibb.co/NdggxT9R/Whats-App-Image-2026-08-04-at-7-09-51-AM.jpg",
    createdAt: Date.now() - 86400000 * 10,
  },
  {
    id: "post-11",
    title: "2026 Graduation: Class Photo Session & Commemorative Moments",
    description: "Graduating students in their academic gowns posed for joyful group photographs with teachers, creating lifelong memories of their time at Mercy Heritage.",
    category: "event",
    imageUrl: "https://i.ibb.co/PGQzt7hX/Whats-App-Image-2026-08-04-at-7-09-54-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 11,
  },
  {
    id: "post-12",
    title: "2026 Graduation: Teachers' Commendation & Farewells",
    description: "Teachers shared inspiring farewell messages and blessings, encouraging the graduating class of 2026 to shine as shining lights in secondary school.",
    category: "news",
    imageUrl: "https://i.ibb.co/kVGKSM7R/Whats-App-Image-2026-08-04-at-7-09-54-AM.jpg",
    createdAt: Date.now() - 86400000 * 12,
  },
  {
    id: "post-13",
    title: "2026 Graduation: Academic & Character Merit Awards",
    description: "Recognizing outstanding student leadership, academic discipline, and moral excellence during the 2026 Graduation awards session.",
    category: "event",
    imageUrl: "https://i.ibb.co/pBzKLMT9/Whats-App-Image-2026-08-04-at-7-09-55-AM.jpg",
    videoUrl: "https://youtu.be/1bElOWvJURM?si=tUsSzlBHfIKPExHs",
    createdAt: Date.now() - 86400000 * 13,
  },
  {
    id: "post-14",
    title: "2026 Graduation: Prophetic Blessings & Thanksgiving",
    description: "Special prayers and thanksgiving dedicated to the future academic endeavors and protection of all graduating pupils.",
    category: "event",
    imageUrl: "https://i.ibb.co/LdJr0pVQ/Whats-App-Image-2026-08-04-at-7-09-56-AM.jpg",
    createdAt: Date.now() - 86400000 * 14,
  },
  {
    id: "post-15",
    title: "2026 Graduation: Headmistress Address & Vision for 2026/2027",
    description: "The Headmistress commended the graduating class and presented the school's roadmap for upcoming academic excellence and facility upgrades.",
    category: "news",
    imageUrl: "https://i.ibb.co/6JfLFt5x/Whats-App-Image-2026-08-04-at-7-09-57-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 15,
  },
  {
    id: "post-16",
    title: "2026 Graduation: STEM & Innovation Project Displays",
    description: "Highlights of innovative science and art projects built by the graduating students displayed at the 2026 graduation exhibition hall.",
    category: "event",
    imageUrl: "https://i.ibb.co/vt0xn96/Whats-App-Image-2026-08-04-at-7-09-57-AM.jpg",
    createdAt: Date.now() - 86400000 * 16,
  },
  {
    id: "post-17",
    title: "2026 Graduation: Reception & Family Celebration",
    description: "Wrapping up the spectacular 2026 Graduation Ceremony with refreshment, photography, music, and celebratory joy with parents and loved ones.",
    category: "event",
    imageUrl: "https://i.ibb.co/RkcY1Z5f/Whats-App-Image-2026-08-04-at-7-09-58-AM.jpg",
    createdAt: Date.now() - 86400000 * 17,
  }
];

export interface GalleryItem {
  id: string;
  caption: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: number;
}

export const defaultGallery: GalleryItem[] = [
  {
    id: "gal-vid-1",
    caption: "2026 Graduation Ceremony: Grand Video Highlights & Processional",
    imageUrl: "https://img.youtube.com/vi/-XAR0F1ae24/hqdefault.jpg",
    videoUrl: "https://youtu.be/-XAR0F1ae24?si=NwRIWIElPTe1w2p0",
    createdAt: Date.now() - 86400000 * 0.5,
  },
  {
    id: "gal-vid-2",
    caption: "2026 Graduation Ceremony: Student Presentations & Cultural Dances (Clip 2)",
    imageUrl: "https://img.youtube.com/vi/1bElOWvJURM/hqdefault.jpg",
    videoUrl: "https://youtu.be/1bElOWvJURM?si=tUsSzlBHfIKPExHs",
    createdAt: Date.now() - 86400000 * 0.8,
  },
  {
    id: "gal-vid-3",
    caption: "2026 Graduation Ceremony: Awards Recognition & Certificate Conferment (Clip 3)",
    imageUrl: "https://img.youtube.com/vi/T-XvECAxa4g/hqdefault.jpg",
    videoUrl: "https://youtu.be/T-XvECAxa4g?si=2mYPSp0tGvcwYFsL",
    createdAt: Date.now() - 86400000 * 0.9,
  },
  {
    id: "gal-1",
    caption: "2026 Graduation Ceremony: Cultural Attire & Grand Processional",
    imageUrl: "https://i.ibb.co/TDbjhGCK/Whats-App-Image-2026-08-04-at-7-09-47-AM.jpg",
    videoUrl: "https://youtu.be/-XAR0F1ae24?si=NwRIWIElPTe1w2p0",
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: "gal-2",
    caption: "2026 Graduation: Academic Brilliance & Top Scholar Awards",
    imageUrl: "https://i.ibb.co/Gfqz7PJS/Whats-App-Image-2026-08-04-at-7-09-48-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "gal-3",
    caption: "2026 Graduation: Traditional Cultural Dance Showcase",
    imageUrl: "https://i.ibb.co/JWNQxGLx/Whats-App-Image-2026-08-04-at-7-09-48-AM-2.jpg",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "gal-4",
    caption: "2026 Graduation: Valedictorian Speech & Student Leaders",
    imageUrl: "https://i.ibb.co/v46n7zFP/Whats-App-Image-2026-08-04-at-7-09-48-AM.jpg",
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: "gal-5",
    caption: "2026 Graduation: Nursery & Kindergarten Stepping Up",
    imageUrl: "https://i.ibb.co/DHMXmSYc/Whats-App-Image-2026-08-04-at-7-09-49-AM.jpg",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "gal-6",
    caption: "2026 Graduation: Presentation of Testimonials & Diplomas",
    imageUrl: "https://i.ibb.co/3VxLf5k/Whats-App-Image-2026-08-04-at-7-09-50-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: "gal-7",
    caption: "2026 Graduation: School Choir Musical Presentation",
    imageUrl: "https://i.ibb.co/1tjStLGw/Whats-App-Image-2026-08-04-at-7-09-50-AM-2.jpg",
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: "gal-8",
    caption: "2026 Graduation: Ceremonial Cutting of the Graduation Cake",
    imageUrl: "https://i.ibb.co/whNRFTNy/Whats-App-Image-2026-08-04-at-7-09-50-AM.jpg",
    createdAt: Date.now() - 86400000 * 8,
  },
  {
    id: "gal-9",
    caption: "2026 Graduation: Dramatic Stage Play on Character & Wisdom",
    imageUrl: "https://i.ibb.co/ZR0FDSQt/Whats-App-Image-2026-08-04-at-7-09-51-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 9,
  },
  {
    id: "gal-10",
    caption: "2026 Graduation: Parents, Guardians & PTA Commendations",
    imageUrl: "https://i.ibb.co/NdggxT9R/Whats-App-Image-2026-08-04-at-7-09-51-AM.jpg",
    createdAt: Date.now() - 86400000 * 10,
  },
  {
    id: "gal-11",
    caption: "2026 Graduation: Academic Gown Portrait Session",
    imageUrl: "https://i.ibb.co/PGQzt7hX/Whats-App-Image-2026-08-04-at-7-09-54-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 11,
  },
  {
    id: "gal-12",
    caption: "2026 Graduation: Teachers' Blessings & Heartwarming Farewells",
    imageUrl: "https://i.ibb.co/kVGKSM7R/Whats-App-Image-2026-08-04-at-7-09-54-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 12,
  },
  {
    id: "gal-13",
    caption: "2026 Graduation: Student Academic & Character Merit Trophies",
    imageUrl: "https://i.ibb.co/pBzKLMT9/Whats-App-Image-2026-08-04-at-7-09-55-AM.jpg",
    videoUrl: "https://youtu.be/1bElOWvJURM?si=tUsSzlBHfIKPExHs",
    createdAt: Date.now() - 86400000 * 13,
  },
  {
    id: "gal-14",
    caption: "2026 Graduation: Dedicated Thanksgiving & Prophetic Prayers",
    imageUrl: "https://i.ibb.co/LdJr0pVQ/Whats-App-Image-2026-08-04-at-7-09-56-AM.jpg",
    createdAt: Date.now() - 86400000 * 14,
  },
  {
    id: "gal-15",
    caption: "2026 Graduation: Headmistress Address to the Class of 2026",
    imageUrl: "https://i.ibb.co/6JfLFt5x/Whats-App-Image-2026-08-04-at-7-09-57-AM-1.jpg",
    createdAt: Date.now() - 86400000 * 15,
  },
  {
    id: "gal-16",
    caption: "2026 Graduation: STEM & Innovation Project Exhibition",
    imageUrl: "https://i.ibb.co/vt0xn96/Whats-App-Image-2026-08-04-at-7-09-57-AM.jpg",
    createdAt: Date.now() - 86400000 * 16,
  },
  {
    id: "gal-17",
    caption: "2026 Graduation: Festive Family Reception & Celebrations",
    imageUrl: "https://i.ibb.co/RkcY1Z5f/Whats-App-Image-2026-08-04-at-7-09-58-AM.jpg",
    createdAt: Date.now() - 86400000 * 17,
  }
];

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
  updatePost: (id: string, post: Partial<Post>) => Promise<void>;
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
        try {
          const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (!error && data && data.length > 0) {
            const fetched = data.map(d => ({
              id: d.id,
              title: d.title,
              description: d.description,
              category: d.category as PostCategory,
              imageUrl: d.image_url,
              videoUrl: d.video_url,
              createdAt: new Date(d.created_at).getTime()
            }));
            
            const fetchedIds = new Set(fetched.map(p => p.id));
            const currentPosts = get().posts || [];
            // Merge with fresh default graduation posts if needed
            const extraPosts = currentPosts.filter(p => !fetchedIds.has(p.id));
            set({ posts: [...fetched, ...(extraPosts.length > 0 ? extraPosts : defaultPosts)] });
          } else {
            const current = get().posts;
            if (!current || current.length === 0) {
              set({ posts: defaultPosts });
            }
          }
        } catch (err) {
          const current = get().posts;
          if (!current || current.length === 0) {
            set({ posts: defaultPosts });
          }
        }
        set({ isLoading: false });
      },

      fetchGallery: async () => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (!error && data && data.length > 0) {
            const fetched = data.map(d => ({
              id: d.id,
              caption: d.caption,
              imageUrl: d.image_url,
              videoUrl: d.video_url,
              createdAt: new Date(d.created_at).getTime()
            }));
            const fetchedIds = new Set(fetched.map(g => g.id));
            const currentGallery = get().gallery || [];
            const extraGallery = currentGallery.filter(g => !fetchedIds.has(g.id));
            set({ gallery: [...fetched, ...(extraGallery.length > 0 ? extraGallery : defaultGallery)] });
          } else {
            const current = get().gallery;
            if (!current || current.length === 0) {
              set({ gallery: defaultGallery });
            }
          }
        } catch (err) {
          const current = get().gallery;
          if (!current || current.length === 0) {
            set({ gallery: defaultGallery });
          }
        }
        set({ isLoading: false });
      },
      
      addPost: async (postData) => {
        // Auto-detect YouTube links in image or video fields
        let finalVideoUrl = postData.videoUrl?.trim() || undefined;
        let finalImageUrl = postData.imageUrl?.trim() || undefined;

        if (finalImageUrl && (finalImageUrl.includes('youtu.be') || finalImageUrl.includes('youtube.com'))) {
          if (!finalVideoUrl) finalVideoUrl = finalImageUrl;
          const match = finalImageUrl.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
          if (match && match[1]) {
            finalImageUrl = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
          }
        }

        if (finalVideoUrl && !finalImageUrl) {
          const match = finalVideoUrl.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
          if (match && match[1]) {
            finalImageUrl = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
          }
        }

        const uploadedUrl = finalImageUrl && finalImageUrl.startsWith('data:') ? await uploadImage(finalImageUrl) : undefined;
        const resolvedImage = uploadedUrl || finalImageUrl;

        const newPost: Post = {
          id: `post-${Date.now()}`,
          title: postData.title,
          description: postData.description,
          category: postData.category,
          imageUrl: resolvedImage,
          videoUrl: finalVideoUrl,
          createdAt: Date.now()
        };

        // Immediately update state and localStorage for instant publishing feedback
        set(state => ({
          posts: [newPost, ...state.posts]
        }));
        
        try {
          const { error } = await supabase.from('posts').insert([{
            id: newPost.id,
            title: postData.title,
            description: postData.description,
            category: postData.category,
            image_url: resolvedImage,
            video_url: finalVideoUrl
          }]);
          if (error) console.warn('Supabase post insert notification:', error);
        } catch (err) {
          console.warn('Supabase insert post notice:', err);
        }
      },

      updatePost: async (id, updatedData) => {
        let finalVideoUrl = updatedData.videoUrl?.trim() || undefined;
        let finalImageUrl = updatedData.imageUrl?.trim() || undefined;

        if (finalImageUrl && (finalImageUrl.includes('youtu.be') || finalImageUrl.includes('youtube.com'))) {
          if (!finalVideoUrl) finalVideoUrl = finalImageUrl;
          const match = finalImageUrl.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
          if (match && match[1]) {
            finalImageUrl = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
          }
        }

        if (finalVideoUrl && !finalImageUrl) {
          const match = finalVideoUrl.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
          if (match && match[1]) {
            finalImageUrl = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
          }
        }

        let uploadedUrl = finalImageUrl;
        if (uploadedUrl && uploadedUrl.startsWith('data:')) {
          uploadedUrl = (await uploadImage(uploadedUrl)) || uploadedUrl;
        }

        set(state => ({
          posts: state.posts.map(p => p.id === id ? {
            ...p,
            ...updatedData,
            videoUrl: finalVideoUrl !== undefined ? finalVideoUrl : p.videoUrl,
            imageUrl: uploadedUrl ?? finalImageUrl ?? p.imageUrl
          } : p)
        }));

        try {
          const { error } = await supabase.from('posts').update({
            title: updatedData.title,
            description: updatedData.description,
            category: updatedData.category,
            image_url: uploadedUrl || finalImageUrl,
            video_url: finalVideoUrl
          }).eq('id', id);
          if (error) console.warn('Supabase update post notice:', error);
        } catch (err) {
          console.warn('Supabase update post exception:', err);
        }
      },
      
      deletePost: async (id, imageUrl) => {
        set(state => ({
          posts: state.posts.filter(p => p.id !== id)
        }));

        try {
          const { error } = await supabase.from('posts').delete().eq('id', id);
          if (error) {
            console.warn('Supabase delete post notice:', error);
          }
        } catch (err) {
          console.warn('Supabase delete post notice:', err);
        }

        if (imageUrl) {
          await deleteImage(imageUrl);
        }
      },

      addGalleryItem: async (itemData) => {
        let finalVideoUrl = itemData.videoUrl?.trim() || undefined;
        let finalImageUrl = itemData.imageUrl?.trim() || undefined;

        if (finalImageUrl && (finalImageUrl.includes('youtu.be') || finalImageUrl.includes('youtube.com'))) {
          if (!finalVideoUrl) finalVideoUrl = finalImageUrl;
          const match = finalImageUrl.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
          if (match && match[1]) {
            finalImageUrl = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
          }
        }

        if (finalVideoUrl && !finalImageUrl) {
          const match = finalVideoUrl.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
          if (match && match[1]) {
            finalImageUrl = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
          }
        }

        const uploadedUrl = finalImageUrl && finalImageUrl.startsWith('data:') ? await uploadImage(finalImageUrl) : undefined;
        const resolvedImage = uploadedUrl || finalImageUrl;

        const newItem: GalleryItem = {
          id: `gal-${Date.now()}`,
          caption: itemData.caption,
          imageUrl: resolvedImage,
          videoUrl: finalVideoUrl,
          createdAt: Date.now()
        };

        // Immediately update state and persist
        set(state => ({
          gallery: [newItem, ...state.gallery]
        }));

        try {
          const { error } = await supabase.from('gallery').insert([{
            id: newItem.id,
            caption: itemData.caption,
            image_url: resolvedImage,
            video_url: finalVideoUrl
          }]);
          if (error) console.warn('Supabase gallery insert notice:', error);
        } catch (err) {
          console.warn('Supabase gallery insert exception:', err);
        }
      },

      deleteGalleryItem: async (id, imageUrl) => {
        set(state => ({
          gallery: state.gallery.filter(g => g.id !== id)
        }));

        try {
          const { error } = await supabase.from('gallery').delete().eq('id', id);
          if (error) {
            console.warn('Supabase delete gallery notice:', error);
          }
        } catch (err) {
          console.warn('Supabase delete gallery exception:', err);
        }

        if (imageUrl) {
          await deleteImage(imageUrl);
        }
      }
    }),
    {
      name: 'mercy-heritage-auth',
      // ONLY persist auth credentials natively, we don't need to persist posts locally now 
      // because we are fetching them from Supabase.
      partialize: (state) => ({ 
        adminPasswordHash: state.adminPasswordHash,
        isAuthenticated: state.isAuthenticated,
        posts: state.posts,
        gallery: state.gallery
      }),
    }
  )
);
