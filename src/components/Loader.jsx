import { motion } from "framer-motion";

const Loader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0c14]"
  >
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-white font-bold text-xl tracking-tight mb-6"
    >
      Bhupesh<span className="text-indigo-400">.</span>
    </motion.div>

    {/* Loading bar */}
    <div className="w-32 h-px bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="h-full bg-indigo-500"
      />
    </div>
  </motion.div>
);

export default Loader;
