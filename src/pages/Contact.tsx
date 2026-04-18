import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Redirect to WhatsApp
    const text = `Hello! My name is ${name}.%0A%0A*Subject:* ${subject}%0A*Message:* ${message}`;
    window.open(`https://wa.me/2348066801436?text=${text}`, '_blank');
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300">
            We would love to hear from you. Get in touch with us today.
          </p>
        </div>
      </section>

      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Info Side */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-navy mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-accent-red shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Our Location</h4>
                      <p className="text-gray-600 text-sm">
                        7, Akinsola House behind C.A.C<br />
                        Agbala Itura Odeda, Abeokuta, Ogun State.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Phone Numbers</h4>
                      <p className="text-gray-600 text-sm flex flex-col">
                        <span>08066801436</span>
                        <span>07081368163</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Email Address</h4>
                      <p className="text-gray-600 text-sm">
                        gloriousheriteig@yahoo.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-2/3">
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-navy mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-red/50 focus:border-accent-red transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-red/50 focus:border-accent-red transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-red/50 focus:border-accent-red transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-red/50 focus:border-accent-red transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-navy text-white font-bold py-4 rounded-lg hover:bg-navy-dark transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to WhatsApp
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
