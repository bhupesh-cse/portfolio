const SectionTitle = ({ label, title, subtitle }) => (
  <div className="mb-14">
    {label && (
      <p className="mono text-violet-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
        <span className="w-4 h-px bg-violet-500 inline-block" />
        {label}
      </p>
    )}
    <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tight text-heading">{title}</h2>
    {subtitle && <p className="text-slate-500 text-sm mt-2 max-w-lg">{subtitle}</p>}
    <div className="divider" />
  </div>
);

export default SectionTitle;
