export function getYouTubeVideoId(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const regExp = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/;
  const match = trimmed.match(regExp);
  return match ? match[1] : null;
}

export function isYouTubeUrl(url?: string): boolean {
  return !!getYouTubeVideoId(url);
}

export function getYouTubeThumbnailUrl(url?: string, quality: 'maxres' | 'hq' | 'mq' = 'hq'): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;
  return quality === 'maxres' 
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(url?: string, autoplay: boolean = false): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0${autoplay ? '&autoplay=1' : ''}`;
}

export interface GraduationVideo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  youtubeId: string;
  thumbnailUrl: string;
  tag: string;
}

export const graduationVideos: GraduationVideo[] = [
  {
    id: "grad-vid-1",
    title: "2026 Graduation Ceremony: Grand Video Highlights & Processional",
    subtitle: "Mercy Heritage Nursery & Primary School Landmark Celebration",
    description: "Experience the colorful processional, presidential addresses, student presentations, and unforgettable memories from the 2026 Graduation Ceremony.",
    videoUrl: "https://youtu.be/-XAR0F1ae24?si=NwRIWIElPTe1w2p0",
    youtubeId: "-XAR0F1ae24",
    thumbnailUrl: "https://img.youtube.com/vi/-XAR0F1ae24/hqdefault.jpg",
    tag: "Graduation Ceremony (Part 1)"
  },
  {
    id: "grad-vid-2",
    title: "2026 Graduation Ceremony: Student Presentations & Cultural Dances (Clip 2)",
    subtitle: "Valedictory Speeches, Choirs & Choreography",
    description: "Inspiring student addresses, emotional farewell remarks, choir presentations, and vibrant graduation cultural dances during the 2026 celebration.",
    videoUrl: "https://youtu.be/1bElOWvJURM?si=tUsSzlBHfIKPExHs",
    youtubeId: "1bElOWvJURM",
    thumbnailUrl: "https://img.youtube.com/vi/1bElOWvJURM/hqdefault.jpg",
    tag: "Graduation Ceremony (Part 2)"
  },
  {
    id: "grad-vid-3",
    title: "2026 Graduation Ceremony: Awards Recognition & Certificate Conferment (Clip 3)",
    subtitle: "Academic Honors, Diplomas & Celebration Moments",
    description: "Honoring top-performing pupils, testimonial presentations, prize giving, and joyful family celebrations at the 2026 Mercy Heritage Graduation Ceremony.",
    videoUrl: "https://youtu.be/T-XvECAxa4g?si=2mYPSp0tGvcwYFsL",
    youtubeId: "T-XvECAxa4g",
    thumbnailUrl: "https://img.youtube.com/vi/T-XvECAxa4g/hqdefault.jpg",
    tag: "Graduation Ceremony (Part 3)"
  }
];
