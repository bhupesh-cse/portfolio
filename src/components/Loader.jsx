import { motion } from "framer-motion";

const Loader = () => (
  <motion.div
    key="loader"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="fixed inset-0 z-[999] bg-[#09090B] flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-white font-bold text-xl tracking-tight mb-6"
    >
      Bhupesh<span className="text-gradient">.</span>
    </motion.div>

    {/* Loading bar */}
    <div className="w-32 h-0.5 bg-white/[0.05] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="h-full rounded-full"
        style={{ background: "linear-gradient(90deg, #3B82F6, #8B5CF6)" }}
      />
    </div>
  </motion.div>
);

export default Loader;
