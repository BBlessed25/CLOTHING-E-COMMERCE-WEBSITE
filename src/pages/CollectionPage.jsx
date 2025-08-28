import { useParams } from 'react-router-dom'

/**
 * Replace the image paths with your real assets
 * (e.g. public/collections/424.jpg -> "/collections/424.jpg")
 */
const collections = [
  { title: '234LABS', handle: '234labs', image: '/assets/243.jpg' },
  { title: '424', handle: '424', image: '/assets/camo.jpg' },
  { title: 'A Cold Wall', handle: 'a-cold-wall', image: '/assets/gold.jpg' },
  { title: 'A-COLD-WALL', handle: 'a-cold-wall-2', image: '/assets/cap.jpg' },
  { title: 'A.P.C (Atelier de Production et de Création)', handle: 'apc', image: '/assets/cas.jpg' },
  { title: 'Accessories', handle: 'accessories', image: '/assets/accessories.jpg' },
  { title: "ACW'summer25", handle: 'acw-summer25', image: '/assets/summer.jpg' },
  { title: 'Adidas', handle: 'adidas', image: '/assets/addidas.jpg' },
  { title: 'ALL GIFTING', handle: 'all-gifting', image: '/assets/short.jpg' },
  { title: 'ALL', handle: 'all', image: '/assets/sing.jpg' },
  { title: 'All 2', handle: 'all-2', image: '/assets/crop.jpg' },
  { title: 'All 3', handle: 'all-3', image: '/assets/pink.jpg' },
]

function Arrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}

/** Card that looks clickable but does not navigate */
function CollectionCard({ title, image }) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-md border bg-white select-none">
      {/* image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        onError={(e) => { e.currentTarget.style.background = '#eee'; e.currentTarget.src = '' }}
      />
      {/* bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
      {/* text row */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 text-white">
        <div className="text-sm md:text-base font-medium line-clamp-1">{title}</div>
        <Arrow />
      </div>
      {/* non-navigating overlay */}
      <div
        role="button"
        aria-label={title}
        tabIndex={0}
        className="absolute inset-0 cursor-default"
        onClick={(e) => e.preventDefault()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.preventDefault() }}
      />
    </div>
  )
}

export default function CollectionPage() {
  const { handle } = useParams()

  // If a specific collection handle is present, keep the same simple stub
  if (handle) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-12">
          <h1 className="text-center text-4xl md:text-[40px] font-semibold tracking-tight text-black">
            Collection
          </h1>
          <p className="mt-6 text-center text-gray-600">
            This is a placeholder. Cards on the grid intentionally do not navigate.
          </p>
        </div>
      </div>
    )
  }

  // Grid page (as in your screenshots)
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-12">
        <h1 className="text-center text-4xl md:text-[40px] font-semibold tracking-tight text-black">Collections</h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.slice(0, 12).map((c) => (
            <CollectionCard key={c.handle} title={c.title} image={c.image} />
          ))}
        </div>

        {/* Pagination (static mock to mirror screenshot) */}
        <div className="mt-10 flex flex-col items-center gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <button className="h-9 w-9 rounded-full border text-gray-600">1</button>
            <button className="h-9 w-9 rounded-full border bg-black text-white">2</button>
            <button className="h-9 w-9 rounded-full border text-gray-600">3</button>
            <span className="px-1">…</span>
            <button className="h-9 w-9 rounded-full border text-gray-600">28</button>
            <button className="ml-2 h-9 rounded-full border px-3">›</button>
          </div>
          <div>You're viewing 1-12 of 334 collections</div>
        </div>
      </div>
    </div>
  )
}