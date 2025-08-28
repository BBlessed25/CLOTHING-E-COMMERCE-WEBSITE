import { useEffect } from 'react'
export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose?.()
    if (open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-4 shadow-xl">
        {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
        <div className="prose max-w-none">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  )
}
