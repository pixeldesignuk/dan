interface TrustStripProps {
  items: string[];
}

export function TrustStrip({ items }: TrustStripProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-8 border-y border-edge bg-surface-card">
      <div className="container-editorial">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Simple checkmark */}
              <svg
                className="w-4 h-4 text-brand-green flex-shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-body-sm text-ink-secondary">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
