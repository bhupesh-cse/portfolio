import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";
import { FaMicrochip, FaBrain, FaRobot, FaCode } from "react-icons/fa";

const focuses = [
  { icon: <FaMicrochip />, title: "IoT & Embedded",   desc: "Raspberry Pi (Zero/3/4/5), Arduino, STM boards, sensor networks, MQTT, home automation." },
  { icon: <FaBrain />,     title: "AI & ML",           desc: "Computer vision, NLP, AI-powered automation, model integration into hardware." },
  { icon: <FaRobot />,     title: "Robotics",          desc: "Autonomous robots, smart irrigation, waste segregation, disaster response systems." },
  { icon: <FaCode />,      title: "Software & APIs",   desc: "Python, C/C++, HTML/CSS, REST APIs, Firebase, Supabase, real-time dashboards." },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <SectionWrapper id="about">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionTitle label="About" title="Who I Am" />

        <div ref={ref} className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="space-y-4 text-slate-400 text-sm leading-7 mb-8">
              <p>
                I'm <span className="text-white font-semibold">Bhupesh Nagda</span>, a final-year
                Computer Science Engineering student at Geetanjali Institute of Technical Studies,
                Udaipur. I specialise in <span className="text-indigo-300 font-medium">IoT development
                and embedded systems</span> — building hardware and software that work together to
                solve real-world problems.
              </p>
              <p>
                My hands-on experience includes Raspberry Pi (Zero, 3, 4, 5), Arduino, and STM
                microcontroller boards. I completed a dedicated <span className="text-indigo-300 font-medium">
                3-month offline IoT training program</span> and applied that knowledge across 7+ projects
                ranging from smart healthcare kiosks to autonomous robots.
              </p>
              <p>
                I'm a <span className="text-indigo-300 font-semibold">Smart India Hackathon 2025 Winner</span> (Hardware
                Edition Grand Finale), IEEE YESIST-12 winner, and Shankara Global Hackathon 1st prize holder.
                I enjoy working at the intersection of hardware, AI, and real-world impact.
              </p>
            </div>

            {/* Key facts grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                ["📍 Location",  "Udaipur, Rajasthan"],
                ["🎓 Degree",    "B.Tech CSE — GITS"],
                ["🔧 Training",  "3-Month IoT (Offline)"],
                ["📬 Status",    "Open to opportunities"],
              ].map(([k, v]) => (
                <div key={k} className="card rounded-lg px-3 py-2.5">
                  <div className="text-[10px] text-slate-600 mb-0.5">{k}</div>
                  <div className="text-slate-300 text-xs font-medium">{v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Focus cards */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-3">
            {focuses.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="card rounded-xl p-4 flex gap-3 items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20
                  flex items-center justify-center text-indigo-400 flex-shrink-0 text-sm mt-0.5">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold mb-1">{f.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
