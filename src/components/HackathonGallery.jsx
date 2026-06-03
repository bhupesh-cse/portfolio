import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { hackathonGallery } from "../data/hackathonData";
import {
  HiX, HiZoomIn, HiCalendar,
  HiChevronLeft, HiChevronRight,
} from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";

// ── Auto-import all hackathon images ──────────────────────
const imgModules = import.meta.glob(
  "../assets/hackathons/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);
const imgMap = {};
Object.entries(imgModules).forEach(([path, mod]) => {
  const key = path.split("/").pop().replace(/\.[^.]+$/, "");
  imgMap[key] = mod.default;
});

// Resolve array of image keys → array of URLs (skip missing)
const resolveImages = (keys) =>
  keys.map((k) => imgMap[k]).filter(Boolean);

// ── Full-screen Lightbox ──────────────────────────────────
const Lightbox = ({ event, allImages, startIdx, onClose }) => {
  const [idx, setIdx] = useState(startIdx);
  const total = allImages.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  const handleKey = useCallback((e) => {
    if (e.key === "ArrowLeft")  prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape")     onClose();
  }, [idx]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(18px)" }}
        onClick={onClose}
        onKeyDown={handleKey}
        tabIndex={0}
        ref={(el) => el?.focus()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full
            bg-white/10 border border-white/15 flex items-center justify-center
            text-slate-300 hover:text-white hover:bg-white/20 transition-all"
        >
          <HiX size={16} />
        </button>

        {/* Counter */}
        {total > 1 && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20
            mono text-xs text-slate-500 bg-black/40 px-3 py-1 rounded-full">
            {idx + 1} / {total}
          </div>
        )}

        {/* Prev */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 sm:left-8 z-20 w-10 h-10 rounded-full
              bg-white/10 border border-white/15 flex items-center justify-center
              text-slate-300 hover:text-white hover:bg-white/20 transition-all"
          >
            <HiChevronLeft size={20} />
          </button>
        )}

        {/* Next */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 sm:right-8 z-20 w-10 h-10 rounded-full
              bg-white/10 border border-white/15 flex items-center justify-center
              text-slate-300 hover:text-white hover:bg-white/20 transition-all"
          >
            <HiChevronRight size={20} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.93, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative max-w-3xl w-full mx-14 sm:mx-24"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="rounded-2xl overflow-hidden border shadow-2xl"
            style={{
              borderColor: `${event.color}30`,
              boxShadow: `0 0 80px ${event.color}18`,
            }}
          >
            <img
              src={allImages[idx]}
              alt={`${event.event} — ${idx + 1}`}
              className="w-full h-auto max-h-[68vh] object-contain"
              style={{ background: "#08080f" }}
            />
          </div>

          {/* Info */}
          <div className="mt-4 px-1 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-white font-bold text-sm">{event.event}</h3>
              <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1.5">
                <HiCalendar size={11} /> {event.date}
              </p>
            </div>
            <span
              className="mono text-[10px] font-bold px-3 py-1.5 rounded-full"
              style={{
                color: event.color,
                background: `${event.color}15`,
                border: `1px solid ${event.color}30`,
              }}
            >
              {event.positionLabel}
            </span>
          </div>

          {/* Dot indicators */}
          {total > 1 && (
            <div className="flex justify-center gap-1.5 mt-4">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === idx ? "20px" : "6px",
                    height: "6px",
                    background: i === idx ? event.color : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── Gallery Card ──────────────────────────────────────────
const GalleryCard = ({ item, index, inView, onOpen }) => {
  const [thumbIdx, setThumbIdx] = useState(0);
  const images = resolveImages(item.images);
  const hasImages = images.length > 0;
  const current = images[thumbIdx] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
      }}
      whileHover={{
        y: -5,
        boxShadow: `0 20px 50px ${item.color}18, 0 0 0 1px ${item.color}28`,
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 z-10"
        style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
      />

      {/* ── Thumbnail ── */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio: "16/10" }}
        onClick={() => hasImages && onOpen(thumbIdx)}
      >
        {hasImages ? (
          <motion.img
            key={thumbIdx}
            src={current}
            alt={item.event}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            style={{ transition: "transform 0.5s ease" }}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${item.color}10, ${item.color}04)` }}
          >
            <FaTrophy size={32} style={{ color: item.color }} className="opacity-25" />
            <span className="text-slate-800 text-[10px] mono">No images yet</span>
          </div>
        )}

        {/* Zoom overlay */}
        {hasImages && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center
              border border-white/30 bg-white/10">
              <HiZoomIn size={20} className="text-white" />
            </div>
          </motion.div>
        )}

        {/* Position badge */}
        <div
          className="absolute top-2.5 right-2.5 z-10 mono text-[10px] font-black
            px-2.5 py-1 rounded-full"
          style={{
            background: `${item.color}22`,
            color: item.color,
            border: `1px solid ${item.color}40`,
            backdropFilter: "blur(8px)",
          }}
        >
          {item.position}
        </div>

        {/* Image count badge */}
        {images.length > 1 && (
          <div
            className="absolute bottom-2.5 right-2.5 z-10 mono text-[10px] font-bold
              px-2 py-0.5 rounded-md"
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            1 / {images.length}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip (if multiple images) ── */}
      {images.length > 1 && (
        <div className="flex gap-1.5 px-3 pt-2.5">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setThumbIdx(i)}
              className="flex-1 rounded-md overflow-hidden transition-all duration-200"
              style={{
                aspectRatio: "16/9",
                border: i === thumbIdx
                  ? `1.5px solid ${item.color}`
                  : "1.5px solid rgba(255,255,255,0.06)",
                opacity: i === thumbIdx ? 1 : 0.45,
              }}
            >
              <img
                src={src}
                alt={`thumb ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Info ── */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            className="text-white font-bold text-sm leading-snug
              group-hover:text-violet-300 transition-colors"
          >
            {item.event}
          </h3>
          <span className="flex items-center gap-1 text-slate-600 text-[10px] mono
            flex-shrink-0 mt-0.5">
            <HiCalendar size={10} /> {item.date}
          </span>
        </div>

        <p className="text-slate-500 text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {item.technologies.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────
const HackathonGallery = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 });
  const [lightbox, setLightbox] = useState(null);
  // lightbox = { eventIdx, imgIdx }

  return (
    <SectionWrapper id="hackathons">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionTitle
          label="Gallery"
          title="Hackathon Achievements"
          subtitle="Moments from national competitions, hackathons, and innovation challenges. Click any photo to view full size."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {hackathonGallery.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              inView={inView}
              onOpen={(imgIdx) => setLightbox({ eventIdx: i, imgIdx })}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (() => {
        const event = hackathonGallery[lightbox.eventIdx];
        const images = resolveImages(event.images);
        return (
          <Lightbox
            event={event}
            allImages={images}
            startIdx={lightbox.imgIdx}
            onClose={() => setLightbox(null)}
          />
        );
      })()}
    </SectionWrapper>
  );
};

export default HackathonGallery;
