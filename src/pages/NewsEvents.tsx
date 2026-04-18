import { useState, useEffect } from "react";
import { useAppStore } from "../store/useStore";
import { format } from "date-fns";
import { Calendar, Newspaper, ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";

export function NewsEvents() {
  const posts = useAppStore(state => state.posts);
  const fetchPosts = useAppStore(state => state.fetchPosts);
  const [filter, setFilter] = useState<'all' | 'news' | 'event'>('all');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter(post => filter === 'all' || post.category === filter);

  return (
    <div className="w-full min-h-screen bg-off-white">
      {/* Header */}
      <section className="bg-navy py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Events</h1>
          <p className="text-lg text-gray-300">
            Stay updated with the latest happenings and upcoming activities.
          </p>
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
                "px-6 py-2 rounded-full font-medium transition-colors capitalize",
                filter === f 
                  ? "bg-accent-red text-white" 
                  : "bg-white text-navy-dark border border-gray-200 hover:bg-gray-50"
              )}
            >
              {f === 'all' ? 'All Updates' : f}
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
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 bg-gray-100 shrink-0">
                  {post.imageUrl && (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm",
                      post.category === 'news' ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    )}>
                      {post.category === 'news' ? <Newspaper className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-sm text-gray-400 mb-2">
                    {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                  </span>
                  <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {post.description}
                  </p>
                  
                  {post.videoUrl && (
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <a 
                        href={post.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent-red hover:text-rose-700 font-medium text-sm flex items-center gap-1"
                      >
                        Watch Video <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
