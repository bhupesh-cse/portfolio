import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { certificates } from "../data/portfolioData";
import { HiX, HiZoomIn, HiBadgeCheck } from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";

// ── Vite eager import of all certificate images ──────────
// When you add a .jpg/.png/.webp to src/assets/certificates/
// it is automatically picked up here — no code change needed.
const imageModules = import.meta.glob(
  "../assets/certificates/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}",
  { eager: true }
);

// Build a map: filename (no ext) → resolved URL
const imageMap = {};
Object.entries(imageModules).forEach(([path, mod]) => {
  const filename = path.split("/").pop().replace(/\.[^.]+$/, ""); // e.g. "sih-2025"
  imageMap[filename] = mod.default;
});

// Resolve image for a certificate entry
// cert.image is expected to be the filename key, e.g. "sih-2025"
const resolveImage = (cert) => {
  if (!cert.image) return null;
  // Support both "sih-2025" and "/src/assets/certificates/sih-2025.jpg"
  const key = cert.image
    .split("/").pop()          // get filename
    .replace(/\.[^.]+$/, ""); // strip extension
  return imageMap[key] || null;
};

const catIcon  = { Hackathon: <FaTrophy size={16} />, IEEE: <HiBadgeCheck size={16} />, GDG: <HiBadgeCheck size={16} />, Startup: <HiBadgeCheck size={16} />, Ideathon: <HiBadgeCheck size={16} /> };
const catColor = { Hackathon: "#f59e0b", IEEE: "#6366f1", GDG: "#38bdf8", Startup: "#ec4899", Ideathon: "#a855f7", default: "#8b5cf6" };

/* ── Full-screen lightbox ─────────────────────────── */
const Lightbox = ({ cert, imgSrc, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-9 right-0 flex items-center gap-1.5
            text-slate-400 hover:text-white transition-colors text-xs"
        >
          <HiX size={14} /> Close
        </button>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden border border-white/10
          shadow-2xl shadow-black/70">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={cert.title}
              className="w-full h-auto object-contain max-h-[80vh]"
              style={{ background: "#0a0a14" }}
            />
          ) : (
            <div
              className="w-full h-64 flex flex-col items-center justify-center gap-3"
              style={{
                background: `${catColor[cert.category] || catColor.default}08`,
                border: `1px solid ${catColor[cert.category] || catColor.default}20`,
              }}
            >
              <span style={{ color: catColor[cert.category] || catColor.default }}
                className="opacity-50 text-3xl">
                {catIcon[cert.category] || <HiBadgeCheck size={32} />}
              </span>
              <div className="text-center">
                <p className="text-slate-500 text-sm">Image not added yet</p>
                <p className="text-slate-700 text-xs mt-1 mono">
                  Save as: src/assets/certificates/{cert.image?.split("/").pop()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info bar */}
        <div className="mt-4 flex flex-wrap items-start justify-between gap-3 px-1">
          <div>
            <h3 className="text-white font-semibold text-sm leading-snug">{cert.title}</h3>
            <p className="text-slate-500 text-xs mt-0.5">
              {cert.organization} · {cert.date}
            </p>
          </div>
          <span
            className="mono text-[10px] font-bold px-2.5 py-1 rounded-full
              uppercase tracking-wider flex-shrink-0"
            style={{
              color: catColor[cert.category] || catColor.default,
              background: `${catColor[cert.category] || catColor.default}15`,
              border: `1px solid ${catColor[cert.category] || catColor.default}25`,
            }}
          >
            {cert.category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ── Certificate card ─────────────────────────────── */
const CertCard = ({ cert, index, inView, onClick, imgSrc }) => {
  const color = catColor[cert.category] || catColor.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, delay: index * 0.09 }}
      onClick={onClick}
      className="card rounded-xl overflow-hidden cursor-pointer group relative"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 z-10"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-[#0d0d1a]" style={{ aspectRatio: "4/3" }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-500
              group-hover:scale-105"
          />
        ) : (
          /* Placeholder until image is added */
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: `${color}06` }}
          >
            <span style={{ color }} className="opacity-30 text-2xl">
              {catIcon[cert.category] || <HiBadgeCheck />}
            </span>
            <span className="text-slate-800 text-[10px] mono">Add image</span>
          </div>
        )}

        {/* Hover zoom overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45
          transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
            bg-white/10 backdrop-blur-sm rounded-full p-2.5 border border-white/20">
            <HiZoomIn size={18} className="text-white" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span style={{ color }} className="text-xs opacity-70">
            {catIcon[cert.category] || <HiBadgeCheck size={11} />}
          </span>
          <span
            className="mono text-[10px] font-bold uppercase tracking-widest"
            style={{ color }}
          >
            {cert.category}
          </span>
        </div>

        <h3 className="text-slate-200 text-xs font-semibold leading-snug mb-1
          group-hover:text-white transition-colors line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-slate-600 text-[10px] mb-0.5">{cert.organization}</p>
        <p className="text-slate-700 text-[10px]">{cert.date}</p>
      </div>
    </motion.div>
  );
};

/* ── Placeholder card ─────────────────────────────── */
const PlaceholderCard = ({ index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.42, delay: index * 0.09 }}
    className="rounded-xl border border-dashed border-white/[0.05] flex flex-col
      items-center justify-center text-center p-6 min-h-[200px]"
  >
    <div className="text-slate-800 text-xs mb-1">More certificates</div>
    <div className="text-slate-900 text-[10px] mono">Coming soon</div>
  </motion.div>
);

/* ── Main section ─────────────────────────────────── */
const Certificates = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selected, setSelected] = useState(null);

  return (
    <SectionWrapper id="certificates">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionTitle
          label="Certificates"
          title="Credentials"
          subtitle="Click any certificate to view it full size."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert, i) => {
            const imgSrc = resolveImage(cert);
            return (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                inView={inView}
                imgSrc={imgSrc}
                onClick={() => setSelected({ cert, imgSrc })}
              />
            );
          })}
          <PlaceholderCard index={certificates.length} inView={inView} />
        </div>
      </div>

      {selected && (
        <Lightbox
          cert={selected.cert}
          imgSrc={selected.imgSrc}
          onClose={() => setSelected(null)}
        />
      )}
    </SectionWrapper>
  );
};

export default Certificates;
