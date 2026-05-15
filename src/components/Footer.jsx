import { Link } from "react-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";
import { personalInfo } from "../data/portfolioData";

const Footer = () => (
  <footer className="border-t border-white/[0.05]">
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row
      items-center justify-between gap-4">

      <div className="text-slate-700 text-xs mono">
        © {new Date().getFullYear()} {personalInfo.name}
        <span className="text-slate-800 mx-2">·</span>
        Built with React & Tailwind CSS
      </div>

      <div className="flex items-center gap-5">
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
          className="text-slate-700 hover:text-slate-300 transition-colors" aria-label="GitHub">
          <FaGithub size={14} />
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
          className="text-slate-700 hover:text-slate-300 transition-colors" aria-label="LinkedIn">
          <FaLinkedin size={14} />
        </a>
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <div className="text-slate-700 hover:text-indigo-400 transition-colors">
            <HiArrowUp size={14} />
          </div>
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
