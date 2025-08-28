import Button from '../ui/Button.jsx'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice.js'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <div className="group">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden rounded-xl bg-gray-100">
        <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover transition group-hover:scale-105" />
      </Link>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">{product.brand}</p>
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
        </div>
        <Button variant="ghost" onClick={() => addToCart({ id: product.id, price: product.price, qty: 1 })}>Quick Buy</Button>
      </div>
    </div>
  )
}
