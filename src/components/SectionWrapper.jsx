import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionWrapper = ({ children, id, className = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`section ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
