export default function Input({ label, error, className='', ...props }) {
    return (
      <label className={`block space-y-1 ${className}`}>
        {label && <span className="text-sm">{label}</span>}
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          {...props}
        />
        {error && <span className="text-xs text-red-600">{error}</span>}
      </label>
    )
  }
  