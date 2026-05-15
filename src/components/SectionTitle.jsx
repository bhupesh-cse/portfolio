const SectionTitle = ({ label, title, subtitle }) => (
  <div className="mb-14">
    {label && (
      <p className="mono text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
        <span className="w-4 h-px bg-indigo-500 inline-block" />
        {label}
      </p>
    )}
    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-slate-500 text-sm leading-relaxed max-w-xl">{subtitle}</p>
    )}
    <div className="divider" />
  </div>
);

export default SectionTitle;
