import Button from '../components/ui/Button.jsx'
import { useParams } from 'react-router-dom'

export default function ProductPage() {
  const { slug } = useParams()
  return (
    <div className="container-px mx-auto grid gap-8 py-8 lg:grid-cols-2">
      <div className="rounded-2xl bg-gray-100 aspect-[4/5]" />
      <div>
        <h1 className="text-2xl font-semibold capitalize">{slug?.replaceAll('-', ' ')}</h1>
        <p className="mt-2 text-gray-600">₦ 60,000</p>

        <div className="mt-6">
          <h4 className="mb-2 font-medium">Size</h4>
          <div className="flex flex-wrap gap-2">
            {['XS','S','M','L','XL'].map(s => <button key={s} className="rounded border px-3 py-1">{s}</button>)}
          </div>
        </div>

        <Button className="mt-6">Add to Bag</Button>
        <div className="mt-8 space-y-3">
          <details className="rounded border p-3"><summary className="cursor-pointer font-medium">Description</summary><p className="mt-2 text-sm text-gray-600">Premium cotton tee.</p></details>
          <details className="rounded border p-3"><summary className="cursor-pointer font-medium">Shipping & Returns</summary><p className="mt-2 text-sm text-gray-600">Delivery within 3–14 days.</p></details>
        </div>
      </div>
    </div>
  )
}
