import { X, Play, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { getYouTubeEmbedUrl } from "../lib/videoUtils";

interface VideoPlayerModalProps {
  videoUrl: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({ videoUrl, title, isOpen, onClose }: VideoPlayerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  const embedUrl = getYouTubeEmbedUrl(videoUrl, true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-navy-dark rounded-2xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy border-b border-gray-800 text-white">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 bg-accent-red/20 text-accent-red rounded-lg">
              <Play className="w-4 h-4 fill-current" />
            </span>
            <h3 className="font-bold text-base md:text-lg truncate text-white">
              {title || "2026 Graduation Ceremony Video"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-gray-200 rounded-lg flex items-center gap-1 transition-colors"
            >
              Watch on YouTube <ExternalLink className="w-3 h-3" />
            </a>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Video Player"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Video Player Iframe */}
        <div className="relative w-full aspect-video bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || "YouTube Video Player"}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
              <p className="text-lg font-semibold mb-3">External Video Player</p>
              <a 
                href={videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                Open in YouTube <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
