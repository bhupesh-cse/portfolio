import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { projects } from "../data/portfolioData";
import { FaGithub } from "react-icons/fa";
import { HiExternalLink, HiChip } from "react-icons/hi";
import { MdWifi } from "react-icons/md";

/* Map category → accent color */
const catAccent = {
  "AI / Software":    "#6366f1",
  "AI / IoT":         "#a855f7",
  "Robotics / IoT":   "#06b6d4",
  "AI / Automation":  "#6366f1",
  "IoT / Healthcare": "#10b981",
  "AI / Safety":      "#ef4444",
};

/* Featured card (first project — larger) */
const FeaturedCard = ({ project, inView }) => {
  const accent = catAccent[project.category] || "#6366f1";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="card-glow rounded-2xl p-6 sm:p-8 col-span-1 sm:col-span-2 lg:col-span-2
        relative overflow-hidden group transition-all duration-300
        hover:shadow-[0_20px_60px_rgba(99,102,241,0.18)]"
    >
      {/* Decorative corner glow */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${accent}15` }} />

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="chip mono mb-3 inline-block">{project.category}</span>
            <h3 className="text-white font-black text-xl sm:text-2xl leading-tight
              group-hover:text-indigo-300 transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-2 flex-shrink-0 mt-1">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/8 text-slate-400
                hover:text-white hover:border-indigo-500/30 transition-all">
              <FaGithub size={14} />
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/8 text-slate-400
                hover:text-indigo-400 hover:border-indigo-500/30 transition-all">
              <HiExternalLink size={14} />
            </a>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-lg">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* Regular card */
const ProjectCard = ({ project, index, inView }) => {
  const accent = catAccent[project.category] || "#6366f1";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="card rounded-xl p-5 flex flex-col group"
    >
      {/* Accent top bar */}
      <div className="h-0.5 w-8 rounded-full mb-4 transition-all duration-300 group-hover:w-16"
        style={{ background: accent }} />

      <span className="mono text-[10px] font-bold uppercase tracking-widest mb-2"
        style={{ color: accent }}>
        {project.category}
      </span>

      <h3 className="text-white font-bold text-sm leading-snug mb-2
        group-hover:text-indigo-300 transition-colors">
        {project.title}
      </h3>

      <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      <div className="flex gap-4 pt-3 border-t border-white/[0.05]">
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-white transition-colors">
          <FaGithub size={11} /> Code
        </a>
        <a href={project.demo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-indigo-400 transition-colors">
          <HiExternalLink size={11} /> Demo
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 });

  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionTitle
          label="Projects"
          title="Things I've Built"
          subtitle="IoT systems, AI applications, and embedded hardware projects."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* First project featured */}
          <FeaturedCard project={projects[0]} inView={inView} />
          {/* Rest normal */}
          {projects.slice(1).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 1} inView={inView} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
