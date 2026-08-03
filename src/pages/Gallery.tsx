import { useEffect } from "react";
import { useAppStore } from "../store/useStore";
import { format } from "date-fns";
import { PlayCircle, Trash2 } from "lucide-react";

export function Gallery() {
  const gallery = useAppStore(state => state.gallery);
  const fetchGallery = useAppStore(state => state.fetchGallery);
  const deleteGalleryItem = useAppStore(state => state.deleteGalleryItem);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-lg text-gray-300">
            A visual journey through moments at Mercy Heritage Nursery and Primary School.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {gallery.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No gallery items posted yet.
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((item) => (
              <div 
                key={item.id} 
                className="break-inside-avoid bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group relative"
              >
                {/* Media */}
                <div className="relative w-full overflow-hidden bg-gray-100">
                  {isAuthenticated && (
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(item.id, item.imageUrl); }}
                      className="absolute top-3 right-3 z-30 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md transition-transform hover:scale-110"
                      title="Delete gallery item (Admin)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.caption} 
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : item.videoUrl ? (
                    <div className="w-full aspect-video flex items-center justify-center bg-gray-900 border-b border-gray-200 text-white relative">
                      {/* For a real app, this would embed an iframe. Here we just link to it for security. */}
                      <PlayCircle className="w-12 h-12 absolute z-10 opacity-80" />
                      <img 
                         src={`https://images.unsplash.com/photo-1577896849786-738ed6c78bd3?q=80&w=2070&auto=format&fit=crop`}
                         className="w-full h-full object-cover opacity-50"
                         alt="Video Thumbnail"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">No Media</div>
                  )}

                  {item.videoUrl && (
                    <a 
                      href={item.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                      title="Play Video"
                    >
                      <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                    </a>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <p className="text-navy-dark font-medium leading-tight mb-2">
                    {item.caption}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(new Date(item.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
