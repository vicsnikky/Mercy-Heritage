import { motion } from "motion/react";
import { BookOpen, GraduationCap, PenTool, Baby } from "lucide-react";

export function Programs() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Programs</h1>
          <p className="text-xl text-gray-300">
            Comprehensive educational tracks designed for mastery and success.
          </p>
        </motion.div>
      </section>

      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Programs */}
          <div className="space-y-24">

            {/* Creche, Nursery & Primary */}
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <img 
                  src="https://i.ibb.co/Y43gRXFW/file-00000000d57871f48c354d93463fe7c3.png" 
                  alt="Young kids learning" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                  <Baby className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-navy">Creche, Nursery & Primary</h2>
                <div className="w-16 h-1 bg-accent-red" />
                <p className="text-lg text-gray-600">
                  We provide a safe, nurturing, and intellectually stimulating environment for children in their formative years. Through interactive play and guided learning, we establish a robust foundation for lifelong curiosity.
                </p>
                <ul className="space-y-3">
                  {[
                    "Early Childhood Care and Education (Creche)",
                    "Interactive & Play-Based Nursery Curriculum",
                    "Comprehensive Primary Education Curriculum",
                    "Strong focus on Numeracy and Literacy"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Secondary School */}
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046?q=80&w=2070&auto=format&fit=crop" 
                  alt="Students studying" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center text-navy mb-2">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-navy">High/Secondary School Programs</h2>
                <div className="w-16 h-1 bg-accent-red" />
                <p className="text-lg text-gray-600">
                  Our comprehensive secondary school program bridges the gap between foundational literacy and advanced academic prowess. We prepare students to think critically, communicate effectively, and lead with empathy.
                </p>
                <ul className="space-y-3">
                  {[
                    "Junior Secondary Curriculum (JSS 1 - JSS 3)",
                    "Senior Secondary Curriculum (SSS 1 - SSS 3)",
                    "STEM and Arts focused pathways",
                    "Extracurricular and Leadership Development"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center text-navy shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            {/* External Exams */}
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2070&auto=format&fit=crop" 
                  alt="Exam preparation" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-accent-red mb-2">
                  <PenTool className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-navy">External Examination Tutorials</h2>
                <div className="w-16 h-1 bg-accent-red" />
                <p className="text-lg text-gray-600">
                  We offer intensive, structured tutorials for students seeking to write and excel in external examinations in Nigeria. Our expert tutors employ past questions, concise materials, and mock exams to ensure success.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { title: "WAEC", desc: "West African Examinations Council" },
                    { title: "NECO", desc: "National Examinations Council" },
                    { title: "JAMB / UTME", desc: "Joint Admissions and Matriculation Board" },
                    { title: "NABTEB", desc: "National Business and Technical Exams" },
                  ].map((exam, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-navy text-xl mb-1">{exam.title}</h4>
                      <p className="text-xs text-gray-500">{exam.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent-red text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join our community?</h2>
          <p className="text-xl mb-8 opacity-90">Enrollment is ongoing for the next academic session.</p>
          <a href="https://wa.me/2348066801436?text=Hello!%20I%20am%20interested%20in%20contacting%20Admissions." target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-white text-accent-red font-bold rounded-lg hover:bg-gray-50 transition-colors">
            Contact Admissions via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
