import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { education } from "../data/portfolioData";

const degreeIcon = { 1: "🎓", 2: "📘", 3: "📗" };

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <SectionWrapper id="education">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionTitle label="Education" title="Academic Background" />

        <div ref={ref} className="max-w-3xl">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-indigo-500/20 to-transparent" />

            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 w-8 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#0f0f1e] border border-indigo-500/30
                      flex items-center justify-center text-sm z-10 relative">
                      {degreeIcon[edu.id] || "📚"}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 card rounded-xl p-5 mb-2">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-white font-bold text-sm">{edu.degree}</h3>
                        <p className="text-indigo-400 text-xs mt-0.5 font-medium">{edu.field}</p>
                      </div>
                      <span className="mono text-[10px] text-slate-500 bg-white/[0.03]
                        border border-white/[0.06] px-2.5 py-1 rounded-lg">
                        {edu.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500 mb-3">
                      <span>{edu.institution}</span>
                      <span className="text-slate-700">·</span>
                      <span>{edu.location}</span>
                      <span className="text-slate-700">·</span>
                      <span className="text-indigo-500/70">{edu.grade}</span>
                    </div>

                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{edu.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {edu.highlights.map((h, hi) => (
                        <div key={hi} className="flex items-start gap-2 text-slate-600 text-xs">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500/40 flex-shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Education;
