import { useEffect, useState } from "react";
import { useAppStore } from "../store/useStore";
import { format } from "date-fns";
import { PlayCircle, Trash2, Play, Sparkles, X, Maximize2 } from "lucide-react";
import { VideoPlayerModal } from "../components/VideoPlayerModal";
import { getYouTubeThumbnailUrl, isYouTubeUrl } from "../lib/videoUtils";

export function Gallery() {
  const gallery = useAppStore(state => state.gallery);
  const fetchGallery = useAppStore(state => state.fetchGallery);
  const deleteGalleryItem = useAppStore(state => state.deleteGalleryItem);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleDelete = async (id: string, imageUrl?: string) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      await deleteGalleryItem(id, imageUrl);
    }
  };

  return (
    <div className="w-full min-h-screen bg-off-white">
      {/* Header */}
      <section className="bg-navy py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold border border-accent-gold/40 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Official 2026 Graduation Photo Gallery
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">2026 Graduation Pictures</h1>
          <p className="text-lg text-gray-300">
            A comprehensive visual showcase of photographs, student speeches, awards, cultural performances, and memorable moments from the 2026 Mercy Heritage Graduation Ceremony.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {gallery.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-gray-200">
            No gallery items posted yet.
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((item) => {
              const hasVideo = !!item.videoUrl;
              const displayImage = item.imageUrl || (hasVideo && isYouTubeUrl(item.videoUrl!) ? getYouTubeThumbnailUrl(item.videoUrl!) : null);

              return (
                <div 
                  key={item.id} 
                  className="break-inside-avoid bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden group relative hover:shadow-xl transition-all"
                >
                  {/* Media */}
                  <div className="relative w-full overflow-hidden bg-gray-950">
                    {isAuthenticated && (
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(item.id, item.imageUrl); }}
                        className="absolute top-3 right-3 z-30 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md transition-transform hover:scale-110"
                        title="Delete gallery item (Admin)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {displayImage ? (
                      <div 
                        className="relative cursor-pointer overflow-hidden"
                        onClick={() => {
                          if (hasVideo) {
                            setSelectedVideo({ url: item.videoUrl!, title: item.caption });
                          } else {
                            setSelectedImage({ url: displayImage, caption: item.caption });
                          }
                        }}
                      >
                        <img 
                          src={displayImage} 
                          alt={item.caption} 
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          {hasVideo ? (
                            <div className="w-14 h-14 rounded-full bg-accent-red text-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                              <Play className="w-6 h-6 fill-current translate-x-0.5" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs">
                              <Maximize2 className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : hasVideo ? (
                      <div 
                        onClick={() => setSelectedVideo({ url: item.videoUrl!, title: item.caption })}
                        className="w-full aspect-video flex items-center justify-center bg-gray-900 text-white relative cursor-pointer group-hover:bg-black transition-colors"
                      >
                        <div className="w-14 h-14 rounded-full bg-accent-red text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-400">No Media</div>
                    )}

                    {hasVideo && (
                      <button 
                        type="button"
                        onClick={() => setSelectedVideo({ url: item.videoUrl!, title: item.caption })}
                        className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/80 text-accent-gold backdrop-blur-xs border border-white/10 flex items-center gap-1.5 hover:bg-black"
                      >
                        <Play className="w-3 h-3 fill-current" /> Video
                      </button>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <p className="text-navy font-bold leading-snug mb-2 text-base group-hover:text-accent-red transition-colors">
                      {item.caption}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
                      <span>{format(new Date(item.createdAt), 'MMMM d, yyyy')}</span>
                      {hasVideo && (
                        <button
                          type="button"
                          onClick={() => setSelectedVideo({ url: item.videoUrl!, title: item.caption })}
                          className="font-bold text-accent-red hover:text-rose-700 flex items-center gap-1"
                        >
                          Play Clip <Play className="w-3 h-3 fill-current" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          isOpen={true}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.caption} 
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <p className="text-white text-center mt-4 text-lg font-medium px-4">
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

