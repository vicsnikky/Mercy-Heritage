import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://i.ibb.co/sp63CtVc/Whats-App-Image-2026-04-18-at-7-32-55-AM.jpg" 
                alt="Mercy Heritage School Logo" 
                className="w-8 h-8 object-cover rounded-md bg-white p-0.5" 
              />
              <span className="font-bold text-xl text-white">
                Mercy Heritage School
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              To be a distinguished centre of learning, dedicated to providing high-quality education, promoting equity, and nurturing pupils who exemplify excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-red hover:text-white transition-all text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-red hover:text-white transition-all text-white">
                <Instagram className="w-5 h-5" />
              </a>
              {/* Note: TikTok icon isn't native in lucide, using generic social structure */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-red hover:text-white transition-all text-white font-bold italic">
                t
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-red shrink-0" />
                <span className="text-sm">7, Akinsola House behind C.A.C<br />Agbala Itura Odeda, Abeokuta, Ogun State.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-red shrink-0" />
                <div className="flex flex-col text-sm">
                  <span>08066801436</span>
                  <span>07081368163</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-red shrink-0" />
                <span className="text-sm">gloriousheriteig@yahoo.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#/about" className="hover:text-accent-red transition-colors">About Us</a></li>
              <li><a href="#/programs" className="hover:text-accent-red transition-colors">Programs</a></li>
              <li><a href="#/gallery" className="hover:text-accent-red transition-colors">Gallery</a></li>
              <li><a href="#/news-events" className="hover:text-accent-red transition-colors">News & Events</a></li>
              <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-accent-red transition-colors">Back to top</button></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Mercy Heritage Nursery and Primary School. All rights reserved.</p>
          <p className="mt-2"><a href="#/admin" className="hover:text-white transition-colors">Admin Login</a></p>
        </div>
      </div>
    </footer>
  );
}
