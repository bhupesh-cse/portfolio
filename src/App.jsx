import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import IoTBackground from "./components/IoTBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import HackathonGallery from "./components/HackathonGallery";
import Certificates from "./components/Certificates";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [loading,  setLoading]  = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {!loading && (
        <div className="min-h-screen relative bg-[#080810] noise">
          <IoTBackground />
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((p) => !p)} />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <HackathonGallery />
            <Certificates />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
