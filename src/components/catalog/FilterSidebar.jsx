import { useFilters } from '../../hooks/useFilters'
export default function FilterSidebar() {
  const { params, set } = useFilters()
  return (
    <aside className="space-y-6">
      <section>
        <h4 className="font-semibold mb-2">Price</h4>
        <div className="flex items-center gap-2">
          <input className="w-24 rounded border px-2 py-1" placeholder="Min" defaultValue={params.get('min')||''} onBlur={(e)=>set('min', e.target.value)} />
          <span>–</span>
          <input className="w-24 rounded border px-2 py-1" placeholder="Max" defaultValue={params.get('max')||''} onBlur={(e)=>set('max', e.target.value)} />
        </div>
      </section>
      <section>
        <h4 className="font-semibold mb-2">Size</h4>
        <div className="flex flex-wrap gap-2">
          {['XS','S','M','L','XL'].map(s => (
            <button key={s} onClick={()=>set('size', s)} className={`rounded border px-2 py-1 text-sm ${params.get('size')===s ? 'bg-black text-white' : ''}`}>{s}</button>
          ))}
        </div>
      </section>
    </aside>
  )
}
