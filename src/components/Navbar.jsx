import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const navLinks = [
  { label: "About",        to: "about" },
  { label: "Skills",       to: "skills" },
  { label: "Projects",     to: "projects" },
  { label: "Achievements", to: "achievements" },
  { label: "Gallery",      to: "hackathons" },
  { label: "Education",    to: "education" },
  { label: "Contact",      to: "contact" },
];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("hero");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass" : "bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[62px]">

          {/* Logo */}
          <Link to="hero" smooth duration={500} className="cursor-pointer select-none">
            <span className="font-black text-base text-white tracking-tight text-heading">
              Bhupesh<span className="text-gradient">.</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} smooth duration={500} spy
                onSetActive={() => setActive(link.to)} className="cursor-pointer">
                <span className={`hover-line text-sm transition-colors duration-200 ${
                  active === link.to ? "text-violet-400 font-semibold" : "text-slate-400 hover:text-slate-200"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode}
              className="text-slate-600 hover:text-violet-400 transition-colors p-1"
              aria-label="Toggle theme">
              {darkMode ? <MdLightMode size={16} /> : <MdDarkMode size={16} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Menu">
              {menuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-[62px] inset-x-0 z-40 nav-glass lg:hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} smooth duration={500}
                  onClick={() => setMenuOpen(false)} className="cursor-pointer">
                  <div className="py-2.5 text-sm text-slate-300 hover:text-violet-400 transition-colors">
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
