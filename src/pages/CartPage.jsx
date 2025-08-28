import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export default function CartPage() {
  const { items } = useCart()
  const navigate = useNavigate()

  // Empty state (matches screenshot)
  if (!items || items.length === 0) {
    return (
      <div className="min-h-[calc(100dvh-64px)] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="text-4xl md:text-[40px] font-semibold tracking-tight text-black mb-4">
            Your cart is empty
          </h1>
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-black/70 mb-8">There are no items in your cart</p>
          <button
            onClick={() => navigate('/collections')}
            className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-base font-medium hover:bg-black hover:text-white transition"
          >
            Continue shopping
          </button>
        </div>
      </div>
    )
  }

  // Basic non-empty placeholder (optional)
  return (
    <div className="min-h-[calc(100dvh-64px)] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-6">Your Cart</h1>
        <div className="rounded-lg border p-6 text-sm text-gray-700">
          You have {items.length} item{items.length > 1 ? 's' : ''} in your cart.
          {/* Replace this with your cart line-items UI */}
        </div>
        <div className="mt-8 flex gap-3">
          <Link
            to="/collections"
            className="rounded-full border px-5 py-2.5 text-sm hover:bg-black hover:text-white transition"
          >
            Continue shopping
          </Link>
          <Link
            to="/checkout"
            className="rounded-full bg-black px-5 py-2.5 text-sm text-white hover:opacity-90 transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}