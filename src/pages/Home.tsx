import { motion } from "motion/react";
import { ArrowRight, BookOpen, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-navy overflow-hidden">
        {/* Placeholder for real hero image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577896849786-738ed6c78bd3?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-accent-red/20 text-white font-medium text-sm mb-6 border border-accent-red/50">
              Welcome to Mercy Heritage
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Study with us in Mercy Heritage and Build Your Future
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
              Providing quality, inclusive education that promotes equity and nurtures every child towards excellence in character and learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="px-8 py-4 bg-accent-red text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
                Visit Us Today <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why Choose Mercy Heritage?</h2>
            <div className="w-24 h-1 bg-accent-red mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-accent-red" />,
                title: "Academic Excellence",
                desc: "Rigorous curriculum designed to challenge and inspire students towards their highest potential."
              },
              {
                icon: <Users className="w-8 h-8 text-accent-red" />,
                title: "Dedicated Staff",
                desc: "Experienced educators committed to nurturing every child's unique talents and abilities."
              },
              {
                icon: <Trophy className="w-8 h-8 text-accent-red" />,
                title: "Holistic Development",
                desc: "Focus on character building, extracurricular activities, and service to society."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Image Section */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://i.ibb.co/kpC97JK/file-0000000081a071f481bb137e78e0a75a.png" 
                  alt="Mercy Heritage Excellence" 
                  className="rounded-2xl shadow-2xl w-full border-4 border-white/10"
                />
              </motion.div>
            </div>
            <div className="lg:w-1/2 text-white">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Shaping Extraordinary Minds for a Brighter Future</h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  At Mercy Heritage, we believe that education is the most powerful tool to change the world. Our dedicated approach focuses on identifying and nurturing the unique potential within every child, fostering a culture of innovation, critical thinking, and moral integrity.
                </p>
                <div className="flex flex-wrap gap-4">
                   <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex-1 min-w-[200px]">
                      <h4 className="font-bold text-accent-red mb-1">Our Vision</h4>
                      <p className="text-sm text-gray-400">To be a leading educational institution that produces global citizens equipped with expertise and character.</p>
                   </div>
                   <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex-1 min-w-[200px]">
                      <h4 className="font-bold text-accent-red mb-1">Our Mission</h4>
                      <p className="text-sm text-gray-400">To provide high-quality, inclusive, and equitable education that fosters total transformation.</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message Section */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src="https://i.ibb.co/JjbsPDjV/file-00000000c9e471f4aa67597cd355f272.png" 
                  alt="Akinsola Micheal" 
                  className="rounded-2xl shadow-xl w-full border-4 border-white"
                />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent-red rounded-xl -z-10" />
              </motion.div>
            </div>
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-navy">Message from the Founder</h2>
                <div className="w-20 h-1 bg-accent-red mb-6" />
                <p className="text-xl text-gray-600 italic font-medium leading-relaxed">
                  "Our goal is to create an environment where learning is coupled with character development. Every child at Mercy Heritage is seen as a unique heritage with a bright future ahead."
                </p>
                <div>
                  <h4 className="text-2xl font-bold text-navy">Akinsola Micheal</h4>
                  <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mt-1">Founder & President, Mercy Heritage School</p>
                </div>
                <Link to="/about" className="inline-flex items-center gap-2 text-accent-red font-bold hover:gap-3 transition-all">
                  Read His Bio <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop" 
                alt="Students studying" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Featured Programs</h2>
              <p className="text-lg text-gray-600 mb-8">
                From early childhood education to rigorous tutorials for external examinations, we provide a structured learning environment for every stage of development.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Creche, Nursery & Primary Education",
                  "High/Secondary School Programs",
                  "Tutorials for External Examinations (WAEC, NECO, JAMB)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      ✓
                    </div>
                    <span className="text-navy-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/programs" className="text-accent-red font-semibold hover:text-rose-700 flex items-center gap-2">
                Explore All Programs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
         </div>
      </section>
    </div>
  );
}
