import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { experiences } from "../data/portfolioData";

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="experience">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionTitle
          label="Experience"
          title="Training & Work"
        />

        <div ref={ref} className="max-w-3xl space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="card rounded-xl p-6 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-white font-semibold text-base">{exp.role}</h3>
                  <p className="text-slate-500 text-sm mt-0.5">{exp.company}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-violet-400 font-medium">{exp.duration}</span>
                  <div className="text-xs text-slate-600 mt-0.5">{exp.type}</div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>

              {/* Responsibilities */}
              <ul className="space-y-1.5 mb-4">
                {exp.responsibilities.map((r, ri) => (
                  <li key={ri} className="flex items-start gap-2.5 text-slate-400 text-sm">
                    <span className="mt-2 w-1 h-1 rounded-full bg-violet-500 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>

              {/* Tech */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
