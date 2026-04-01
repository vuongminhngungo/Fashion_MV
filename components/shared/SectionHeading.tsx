export default function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 border-b border-orange-100 pb-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ee4d2d]">
          fashion-mv
        </p>
        <h2 className="mt-1 text-2xl font-bold text-zinc-900">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
