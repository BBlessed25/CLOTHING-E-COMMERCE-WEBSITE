import { useFilters } from '../../hooks/useFilters'
export default function SortControl() {
  const { params, set } = useFilters()
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">Sort by</label>
      <select
        className="rounded border px-2 py-1 text-sm"
        value={params.get('sort') || ''}
        onChange={(e)=>set('sort', e.target.value)}
      >
        <option value="">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A–Z</option>
        <option value="name-desc">Name: Z–A</option>
      </select>
    </div>
  )
}
