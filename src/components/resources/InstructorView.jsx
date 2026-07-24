import React from 'react';
import { Target, Zap } from 'lucide-react';

const InstructorView = ({ instructor, darkMode }) => (
  <>
    <section className="mb-10 md:mb-12">
      <h2 
        className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Meet Your Instructor
      </h2>

      <div 
        className={`p-6 md:p-8 rounded-xl border-2 mb-8 ${
          darkMode ? 'bg-blue-900 bg-opacity-20 border-blue-700' : 'bg-blue-50 border-blue-200'
        }`}
      >
        <h3 
          className={`text-xl md:text-2xl font-bold mb-4 ${
            darkMode ? 'text-blue-300' : 'text-blue-900'
          }`}
        >
          Ray - Technical Automation Architect
        </h3>
        <p className={`text-sm md:text-base leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          I'm your guide through this intensive 14-day bootcamp. My mission is to transform you from a complete beginner into a job-ready Technical Automation Architect who can build sophisticated business systems using AI, APIs, and automation tools.
        </p>
        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          With expertise spanning content creation, SEO, video production, funnel building, and complex workflow automation, I'll teach you not just the technical skills, but the problem-solving mindset that makes you invaluable to clients and employers.
        </p>
      </div>
    </section>

    <section className="mb-10 md:mb-12">
      <h2 
        className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        <Target size={24} className="text-blue-600" aria-hidden="true" />
        Areas of Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {instructor.expertise.map((exp, idx) => (
          <div
            key={idx}
            className={`p-5 md:p-6 rounded-lg border-l-4 border-blue-600 transition hover:shadow-lg ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            } ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <h3 
              className={`text-lg md:text-xl font-semibold mb-3 ${
                darkMode ? 'text-blue-300' : 'text-blue-900'
              }`}
            >
              {exp.category}
            </h3>
            <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-10 md:mb-12">
      <h2 
        className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        <Zap size={24} className="text-orange-600" aria-hidden="true" />
        Proficient Tools & Platforms
      </h2>
      <div className="flex flex-wrap gap-3">
        {instructor.tools.map((tool, idx) => (
          <span
            key={idx}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              darkMode 
                ? 'bg-orange-900 bg-opacity-40 text-orange-200 hover:bg-opacity-60' 
                : 'bg-orange-100 text-orange-900 hover:bg-orange-200'
            }`}
          >
            {tool}
          </span>
        ))}
      </div>
    </section>

    <section 
      className={`p-6 md:p-8 rounded-lg border-2 ${
        darkMode ? 'bg-blue-900 bg-opacity-20 border-blue-700' : 'bg-blue-50 border-blue-200'
      }`}
    >
      <h3 
        className={`text-lg md:text-xl font-bold mb-3 ${
          darkMode ? 'text-blue-300' : 'text-blue-900'
        }`}
      >
        🎯 What We Offer
      </h3>
      <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        I bring expert-level knowledge across multiple disciplines: creating SEO-optimized content systems, producing compelling video and graphics, building high-converting sales funnels, conducting competitive research, and automating complex workflows. My toolkit includes the latest AI platforms (ChatGPT, Claude, Gemini), design tools (Canva, CapCut), no-code platforms (Zapier, Make, n8n), and analytics solutions to deliver measurable results.
      </p>
    </section>
  </>
);

export default InstructorView;
