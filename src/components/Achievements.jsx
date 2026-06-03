import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { achievements } from "../data/portfolioData";

/* Top 3 get a special "podium" treatment */
const podiumColors = ["#F59E0B", "#94a3b8", "#cd7c2f"];

const Achievements = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 });

  // Split: first 3 are "wins", rest are "participations"
  const wins  = achievements.slice(0, 3);
  const rest  = achievements.slice(3);

  return (
    <SectionWrapper id="achievements">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionTitle
          label="Achievements"
          title="Recognition & Wins"
          subtitle="National-level hackathon victories and competition results."
        />

        <div ref={ref}>
          {/* ── Top wins ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {wins.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="card rounded-xl p-5 relative overflow-hidden group"
              >
                {/* Glow top-left */}
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-30"
                  style={{ background: podiumColors[i] }} />

                <div className="relative z-10">
                  {/* Medal */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono text-2xl font-black" style={{ color: podiumColors[i] }}>
                      {item.stat}
                    </span>
                    <span className="mono text-[10px] px-2 py-0.5 rounded-full border font-bold"
                      style={{ color: podiumColors[i], borderColor: `${podiumColors[i]}40`, background: `${podiumColors[i]}10` }}>
                      {item.year}
                    </span>
                  </div>

                  <div className="mono text-xs font-bold mb-1" style={{ color: podiumColors[i] }}>
                    {item.statLabel}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Other achievements ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {rest.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                className="card rounded-xl p-4 group"
              >
                <div className="text-xl mb-2">{item.stat}</div>
                <div className="text-violet-400 mono text-[10px] font-bold uppercase tracking-wider mb-1">
                  {item.statLabel}
                </div>
                <h3 className="text-slate-300 text-xs font-medium leading-snug mb-1">{item.title}</h3>
                <p className="text-slate-700 text-[10px] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Achievements;
