import { Link } from 'react-router-dom'

const posts = [
  { id: 1, title: 'Revealed: Why Sunglasses Transform Your Look Instantly', author: 'ASHCORP LUXURY PROJECTS', date: 'Sep 17, 2024', image: '/editorials/hero-1.jpg' },
  { id: 2, title: 'Accessory Secrets: How To Unlock Your Effortless Style', author: 'Stella owoeye', date: 'Aug 31, 2024', image: '/editorials/hero-2.jpg' },
  { id: 3, title: "Top Influencer Picks for Ashluxury's Anniversary Celebration", author: 'Tega Otomiewo', date: 'Aug 27, 2024', image: '/editorials/post-1.jpg' },
  { id: 4, title: 'Celebrating Two Years of Redefining Luxury: The Ashluxury Legacy', author: 'Tega Otomiewo', date: 'Aug 27, 2024', image: '/editorials/post-2.jpg' },
  { id: 5, title: 'Ashluxe’s New Olympiad 2.0 Sports Collection Debuts at High-Energy Vertical Rave', author: 'Tega Otomiewo', date: 'Aug 8, 2024', image: '/editorials/post-3.jpg' },
  { id: 6, title: '2024: Welcoming a Year of Phenomenal Possibilities', author: 'Tega Otomiewo', date: 'Jan 11, 2024', image: '/editorials/post-4.jpg' },
  { id: 7, title: 'The Olympiad: A Luxurious Fusion of Sports and Film', author: 'Tega Otomiewo', date: 'Sep 12, 2023', image: '/editorials/post-5.jpg' },
  { id: 8, title: 'DailyPaper: The Trio Hustlers Taking The World By A Storm', author: 'Tega Otomiewo', date: 'May 2, 2023', image: '/editorials/post-6.jpg' },
  { id: 9, title: 'Dreams + Reality: The Ashluxe AW23 Collection', author: 'Tega Otomiewo', date: 'Jan 30, 2023', image: '/editorials/post-7.jpg' },
  { id: 10, title: 'Inside The Harmonious Discord Launch', author: 'Tega Otomiewo', date: 'Dec 9, 2022', image: '/editorials/post-8.jpg' },
]

function ReadMore() {
  return (
    <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium">
      Read more
      <span className="ml-3 h-[2px] w-16 bg-black" />
    </span>
  )
}

function PostRow({ post, flip = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
      {/* image */}
      <div className={flip ? 'order-2 md:order-1' : 'order-1'}>
        <div className="aspect-[16/12] w-full overflow-hidden bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
            onError={(e) => { e.currentTarget.style.background='#e5e5e5'; e.currentTarget.src='' }}
          />
        </div>
      </div>

      {/* text */}
      <div className={flip ? 'order-1 md:order-2' : 'order-2'}>
        <h3 className="text-[26px] md:text-[28px] font-semibold leading-snug text-black">{post.title}</h3>
        <div className="mt-2 text-sm text-black/70">
          By {post.author} <span className="mx-2"> </span> {post.date}
        </div>
        <ReadMore />
      </div>
    </div>
  )
}

export default function EditorialsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-12">
        <h1 className="text-center text-4xl md:text-[40px] font-semibold tracking-tight text-black">News</h1>

        {/* Top feature rows */}
        <div className="mt-10 space-y-16">
          <PostRow post={posts[0]} flip={false} />
          <PostRow post={posts[1]} flip />
        </div>

        {/* Remaining rows */}
        <div className="mt-14 space-y-16">
          {posts.slice(2).map((p, idx) => (
            <PostRow key={p.id} post={p} flip={idx % 2 === 1} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-14 flex items-center justify-center gap-4 text-gray-800">
          <button className="h-9 w-9 rounded-full border text-gray-700">1</button>
          <button className="h-9 w-9 rounded-full border bg-black text-white">2</button>
          <button className="h-9 w-9 rounded-full border text-gray-700">3</button>
          <button className="ml-2 h-9 rounded-full border px-3">{'>'}</button>
        </div>
      </div>
    </div>
  )
}