import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../ui/Button'

export default function MiniCartDrawer() {
  const { items, subtotal, currency, toggleCart } = useCart()
  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl border-l">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold">Your Bag</h3>
        <button onClick={toggleCart}>Close</button>
      </div>
      <div className="p-4 space-y-4">
        {items.length === 0 && <p className="text-sm text-gray-500">Your bag is empty.</p>}
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <span>{it.id}</span>
            <span>{it.qty} × {formatPrice(it.price, currency)}</span>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="mb-3 flex items-center justify-between font-medium">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  )
}
