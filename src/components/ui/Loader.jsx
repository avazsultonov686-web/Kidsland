export default function Loader({ className = '' }) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-red border-t-transparent" />
    </div>
  )
}
