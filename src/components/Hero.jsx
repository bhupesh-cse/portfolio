import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload, HiArrowDown, HiChip } from "react-icons/hi";
import { MdWifi } from "react-icons/md";
import { Link } from "react-scroll";
import { personalInfo } from "../data/portfolioData";

// ── Profile image — Vite eager import ───────────────────
// Supported filenames: profile.jpg / profile.jpeg / profile.png / profile.webp
// Just drop the file into src/assets/ and it appears automatically.
const profileModules = import.meta.glob(
  "../assets/profile.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);
const profileSrc = Object.values(profileModules)[0]?.default || null;

/* Floating tech badge */
const Badge = ({ icon, label, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4, type: "spring", stiffness: 200 }}
    className={`absolute flex items-center gap-1.5 px-3 py-1.5 rounded-lg
      bg-[#18181B]/90 border border-violet-500/25 text-xs font-medium text-violet-200
      shadow-lg shadow-violet-500/10 backdrop-blur-sm ${className}`}
  >
    {icon}
    {label}
  </motion.div>
);

const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

    {/* ── Background glow blobs ── */}
    <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full
      bg-blue-600/8 blur-[140px] pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full
      bg-violet-600/6 blur-[120px] pointer-events-none" />
    <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full
      bg-cyan-600/5 blur-[100px] pointer-events-none" />

    <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full pt-24 pb-20">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

        {/* ══ LEFT ══════════════════════════════════════ */}
        <div className="flex-1 text-center lg:text-left">

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs text-slate-400 mono">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-5"
          >
            <span className="text-white">Bhupesh</span>
            <br />
            <span className="text-gradient">Nagda</span>
          </motion.h1>

          {/* Typing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex items-center gap-2 justify-center lg:justify-start mb-5"
          >
            <span className="text-slate-600 mono text-sm">&gt;</span>
            <span className="text-violet-400 font-semibold text-lg sm:text-xl mono">
              <TypeAnimation
                sequence={[
                  "IoT Developer", 2000,
                  "Embedded Systems Eng.", 2000,
                  "AI Enthusiast", 2000,
                  "SIH 2025 Winner 🏆", 2200,
                  "Raspberry Pi Expert", 2000,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </span>
            <span className="w-0.5 h-5 bg-violet-400 animate-pulse" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
          >
            B.Tech CSE student at GITS Udaipur. I build IoT systems, embedded hardware,
            and AI-powered solutions — from Raspberry Pi prototypes to
            <span className="text-cyan-400 font-medium"> national hackathon-winning</span> products.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12"
          >
            <a href={personalInfo.resumeUrl} download className="btn-primary flex items-center gap-2">
              <HiDownload size={15} /> Download Resume
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
              className="btn-ghost flex items-center gap-2">
              <FaGithub size={14} /> GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
              className="btn-ghost flex items-center gap-2">
              <FaLinkedin size={14} /> LinkedIn
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex gap-8 justify-center lg:justify-start"
          >
            {[
              { n: "8+",  l: "Hackathon Wins", color: "#F59E0B" },
              { n: "7+",  l: "IoT Projects",   color: "#8B5CF6" },
              { n: "3mo", l: "IoT Training",    color: "#06B6D4" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
              >
                <div className="text-2xl font-black text-heading" style={{ color: s.color }}>{s.n}</div>
                <div className="text-xs text-slate-500 mt-0.5 mono">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ══ RIGHT — Avatar ════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="flex-shrink-0 relative"
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-cyan-500/10 blur-3xl scale-110" />

          {/* Rotating dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              background: "transparent",
              border: "1px dashed rgba(139,92,246,0.2)",
              borderRadius: "50%",
            }}
          />

          {/* Solid ring */}
          <div className="absolute inset-3 rounded-full border border-violet-500/15" />

          {/* Avatar box */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full
            overflow-hidden grad-border flex items-center justify-center
            bg-gradient-to-br from-[#0f0f20] to-[#13132a]">
            {profileSrc ? (
              <img
                src={profileSrc}
                alt="Bhupesh Nagda"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%" }}
              />
            ) : (
              /* Fallback initials until photo is added */
              <div className="text-center select-none">
                <div className="text-6xl lg:text-7xl font-black text-gradient leading-none">BN</div>
                <div className="text-slate-700 text-[9px] mt-2 mono tracking-[0.2em] uppercase">
                  Add profile.jpg
                </div>
              </div>
            )}
          </div>

          {/* Floating badges */}
          <Badge
            icon={<span className="text-amber-400">🏆</span>}
            label="SIH 2025 Winner"
            className="float -top-4 -right-6 lg:-right-10"
            delay={0.7}
          />
          <Badge
            icon={<MdWifi size={12} className="text-cyan-400" />}
            label="IoT Expert"
            className="float-slow -bottom-4 -left-6 lg:-left-10"
            delay={0.85}
          />
          <Badge
            icon={<HiChip size={12} className="text-violet-400" />}
            label="Embedded Dev"
            className="float -left-8 top-1/2 -translate-y-1/2 hidden lg:flex"
            delay={1.0}
          />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-slate-700 text-[10px] mono tracking-widest uppercase">scroll</span>
        <Link to="about" smooth duration={500} className="cursor-pointer">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="text-slate-600 hover:text-violet-400 transition-colors"
          >
            <HiArrowDown size={16} />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default Hero;
