import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { skills } from "../data/portfolioData";
import { SiPython, SiCplusplus, SiHtml5, SiRaspberrypi, SiArduino, SiGithub, SiFirebase, SiSupabase } from "react-icons/si";
import { MdDeviceHub, MdSmartToy, MdApi, MdHome, MdMemory, MdPsychology, MdCode, MdStyle, MdWifi, MdHub } from "react-icons/md";

const iconMap = {
  SiPython:<SiPython/>, SiC:<MdCode/>, SiCplusplus:<SiCplusplus/>,
  SiHtml5:<SiHtml5/>, SiCss3:<MdStyle/>, MdDeviceHub:<MdDeviceHub/>,
  MdSmartToy:<MdSmartToy/>, MdPsychology:<MdPsychology/>, SiRaspberrypi:<SiRaspberrypi/>,
  MdHome:<MdHome/>, MdMemory:<MdMemory/>, MdApi:<MdApi/>,
  SiGithub:<SiGithub/>, SiArduino:<SiArduino/>,
  SiFirebase:<SiFirebase/>, SiSupabase:<SiSupabase/>,
  MdWifi:<MdWifi/>, MdHub:<MdHub/>,
};

const catColor = {
  Language:"#6366f1", Web:"#38bdf8", IoT:"#a855f7",
  AI:"#ec4899", Embedded:"#f59e0b", Backend:"#10b981", Tools:"#f97316",
};

const groupBy = (arr, key) =>
  arr.reduce((a, i) => { (a[i[key]] = a[i[key]] || []).push(i); return a; }, {});

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
  const grouped = groupBy(skills, "category");

  return (
    <SectionWrapper id="skills">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionTitle
          label="Skills"
          title="Technologies I Work With"
          subtitle="Focused on IoT, embedded systems, and AI — with supporting software skills."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(grouped).map(([cat, items], gi) => {
            const color = catColor[cat] || "#6366f1";
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: gi * 0.07 }}
                className="card rounded-xl p-5"
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <h3 className="mono text-xs font-bold uppercase tracking-widest"
                    style={{ color }}>
                    {cat}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  {items.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-sm" style={{ color: `${color}99` }}>
                            {iconMap[skill.icon] || <MdDeviceHub />}
                          </span>
                          <span className="text-slate-300 text-xs font-medium">{skill.name}</span>
                        </div>
                        <span className="mono text-[10px] text-slate-600">{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 0.9, delay: gi * 0.07 + si * 0.06, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${color}60, ${color})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
