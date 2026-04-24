import { motion } from "motion/react";
import { Target, Compass, Heart, Award, Shield, Lightbulb } from "lucide-react";

export function About() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-300">
            Nurturing excellence in character and learning.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-navy">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To provide quality, inclusive education that promotes equity and nurtures every child towards excellence in character and learning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-accent-red">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be a distinguished centre of learning, dedicated to providing high-quality education, promoting equity, and nurturing pupils who exemplify excellence in character, knowledge, and service to society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2070&auto=format&fit=crop" 
                alt="School Campus" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-navy mb-6">Overview of Mercy Heritage</h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Mercy Heritage Nursery and Primary School is a cornerstone of early and foundational education in Odeda. We believe that every child deserves a strong start, embedded in an environment that fosters curiosity, discipline, and creativity.
                </p>
                <p>
                  Our dedicated staff goes above and beyond to ensure our students receive personalized attention, empowering them to thrive not just academically, but socially and emotionally. We boast modern facilities, dynamic extracurricular programs, and a community-centered approach to education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-off-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <img 
                  src="https://i.ibb.co/JjbsPDjV/file-00000000c9e471f4aa67597cd355f272.png" 
                  alt="Akinsola Micheal - Founder" 
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5] border-8 border-white"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-red rounded-2xl -z-10 animate-pulse" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-navy rounded-2xl -z-10" />
              </motion.div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-accent-red font-bold tracking-wider uppercase text-sm">Meet Our Visionary</span>
                <h2 className="text-4xl font-bold text-navy mt-2 mb-4">Akinsola Micheal</h2>
                <h3 className="text-xl text-gray-500 font-medium mb-6">Founder & President</h3>
                <div className="w-20 h-1.5 bg-accent-red mb-8" />
                
                <div className="space-y-6 text-lg text-gray-600 italic leading-relaxed">
                  <p>
                    "Education is the bedrock of societal transformation. At Mercy Heritage, we didn't just set out to build a school; we envisioned a sanctuary where every child's potential is recognized as a divine heritage to be nurtured with precision and love."
                  </p>
                  <p className="not-italic">
                    Under the visionary leadership of Mr. Akinsola Micheal, the school has grown from a humble dream into a beacon of academic excellence and moral uprightness in Abeokuta. His unwavering commitment to quality and affordable education continues to drive our mission to produce leaders of tomorrow today.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-accent-red mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-8 h-8" />, label: "Excellence" },
              { icon: <Shield className="w-8 h-8" />, label: "Integrity" },
              { icon: <Heart className="w-8 h-8" />, label: "Empathy" },
              { icon: <Lightbulb className="w-8 h-8" />, label: "Innovation" },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center p-8 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10"
              >
                <div className="w-16 h-16 rounded-full bg-accent-red/20 flex items-center justify-center text-accent-red mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold">{value.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
