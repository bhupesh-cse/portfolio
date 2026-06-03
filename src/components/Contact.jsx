import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { personalInfo } from "../data/portfolioData";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from "react-icons/hi";

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 4000);
    }, 1400);
  };

  return (
    <SectionWrapper id="contact">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionTitle
          label="Contact"
          title="Let's Work Together"
          subtitle="Open to collaborations, internships, and interesting IoT/AI projects."
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-10 max-w-4xl">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            <p className="text-slate-400 text-sm leading-relaxed mb-7">
              Whether you have a project idea, want to collaborate on IoT/AI work,
              or just want to connect — my inbox is always open.
            </p>

            <div className="space-y-3 mb-7">
              {[
                { icon: <HiMail size={14} />,          label: personalInfo.email,    href: `mailto:${personalInfo.email}`, color: "#F43F5E" },
                { icon: <HiPhone size={14} />,         label: personalInfo.phone,    href: `tel:${personalInfo.phone}`, color: "#10B981" },
                { icon: <HiLocationMarker size={14} />, label: personalInfo.location, href: "#", color: "#3B82F6" },
              ].map((item) => (
                <a key={item.label} href={item.href}
                  className="flex items-center gap-3 text-slate-400 hover:text-white text-sm
                    transition-colors group cursor-pointer">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    transition-colors"
                    style={{
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}25`,
                      color: item.color,
                    }}>
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { href: personalInfo.github,   icon: <FaGithub size={13} />,   label: "GitHub" },
                { href: personalInfo.linkedin, icon: <FaLinkedin size={13} />, label: "LinkedIn" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2 cursor-pointer">
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {[
              { name: "name",  type: "text",  placeholder: "Your name" },
              { name: "email", type: "email", placeholder: "your@email.com" },
            ].map((f) => (
              <input key={f.name} type={f.type} name={f.name}
                value={form[f.name]} onChange={handleChange} required
                placeholder={f.placeholder}
                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-lg
                  px-4 py-2.5 text-sm text-white placeholder-slate-700
                  focus:outline-none focus:border-violet-500/40 focus:bg-violet-500/[0.03]
                  transition-all"
              />
            ))}

            <textarea name="message" value={form.message} onChange={handleChange}
              required rows={4} placeholder="Tell me about your project..."
              className="w-full bg-white/[0.03] border border-white/[0.07] rounded-lg
                px-4 py-2.5 text-sm text-white placeholder-slate-700
                focus:outline-none focus:border-violet-500/40 focus:bg-violet-500/[0.03]
                transition-all resize-none"
            />

            <button type="submit" disabled={status === "sending"}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
              {status === "sending" ? (
                <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
              ) : status === "sent" ? (
                "Message sent ✓"
              ) : (
                <><HiPaperAirplane size={13} /> Send Message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
