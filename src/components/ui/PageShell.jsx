/**
 * Consistent wrapper for all content pages.
 * Renders a title and optional subtitle, then the page body.
 */
export default function PageShell({ title, subtitle, children, className = '' }) {
  return (
    <div className={`min-h-full bg-gradient-to-b from-[#faf9fc] to-pastel-cream px-4 pt-6 pb-8 ${className}`}>
      {(title || subtitle) && (
        <header className="mb-6">
          {title && (
            <h1 className="text-[22px] font-bold tracking-[-0.025em] text-pastel-ink leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-1 text-[14px] text-pastel-inkmuted leading-snug">{subtitle}</p>
          )}
        </header>
      )}
      {children}
    </div>
  )
}
