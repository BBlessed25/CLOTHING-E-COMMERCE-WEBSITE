// src/components/layout/Layout.jsx
import { Outlet, Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import Button from '../ui/Button.jsx'

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function ChevronDown({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" clipRule="evenodd" />
    </svg>
  )
}
function ChevronRight({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707A1 1 0 1 1 8.707 5.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z" clipRule="evenodd" />
    </svg>
  )
}
function IconSearch({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"></line>
    </svg>
  )
}
function IconUser({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 1 1 15 0v.75H4.5v-.75z" />
    </svg>
  )
}
function IconHeart({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}
function IconBag({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6 7h12l-1 13H7L6 7Z" />
      <path d="M9 7a3 3 0 1 1 6 0" />
    </svg>
  )
}

function NavItem({ to, children, dropdown = false }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-2 py-1 inline-flex items-center gap-1 text-sm ${isActive ? 'text-black' : 'text-gray-700 hover:text-black'}`
      }
    >
      <span>{children}</span>
      {dropdown && <ChevronDown className="h-3.5 w-3.5" />}
    </NavLink>
  )
}

/* ---------------- Search Popover ---------------- */
function SearchPopover() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const onClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  // ✅ Branding updated here
  const popular = ['finch', 'casablanca', 'daily paper', 'tank top', 'diesel']

  const products = [
    { id: 1, title: 'Finch Logo Tank Top - Black', price: '₦156,000', status: 'In stock', badge: 'green', image: '/assets/crop.jpg'},
    { id: 2, title: '234Labs Globe Logo T-shirt Black', price: '₦85,800', status: 'In stock', badge: 'green', image: '/assets/cas.jpg' },
    { id: 3, title: 'Finch 3 Set Female Bodycon Top White Black Brown', price: '₦93,600', status: 'In stock', badge: 'green', image: '/assets/sing.jpg' },
    { id: 4, title: 'Marcelo Burlon Feathers Necklace Over Tee - Black Red', price: '₦358,800', status: 'In stock', badge: 'green', image: '/assets/MCM jacket1.jpg' },
    { id: 5, title: '234Labs Dreamers T-shirt Green', price: '₦70,200', status: 'Only 3 in stock', badge: 'amber', image: '/assets/jersey.jpg' },
  ]

  const badgeClass = (tone) =>
    tone === 'green'
      ? 'rounded-full bg-green-100 text-green-700 text-[12px] px-2 py-0.5'
      : 'rounded-full bg-amber-100 text-amber-700 text-[12px] px-2 py-0.5'

  return (
    <div className="relative hidden md:block" ref={ref}>
      <div
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${open ? 'ring-2 ring-black/10' : ''}`}
        onClick={() => setOpen(true)}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open ? 'true' : 'false'}
      >
        <IconSearch className="h-4 w-4" />
        <input
          className="w-64 outline-none placeholder:text-gray-500"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && (
        <div
          className="absolute right-0 mt-2 rounded-lg border border-gray-200 bg-white shadow-xl z-[60] overflow-hidden"
          style={{ width: 'min(720px, calc(100vw - 24px))' }}
        >
          <div className="grid grid-cols-2 divide-x">
            <div className="p-4">
              <div className="text-[12px] uppercase tracking-wide text-gray-500 mb-3">Popular searches</div>
              <ul className="space-y-2">
                {popular.map((p) => (
                  <li key={p}>
                    <button type="button" className="w-full text-left rounded-md px-2 py-2 text-sm hover:bg-gray-50" onClick={() => setQuery(p)}>
                      {p}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4">
              <div className="text-[12px] uppercase tracking-wide text-gray-500 mb-3">TRENDING PRODUCTS</div>
              <ul className="space-y-2">
                {products.map((pr) => (
                  <li key={pr.id}>
                    <Link 
                      to={`/products/${pr.slug || pr.id}`}
                      className="group flex w-full items-center gap-3 rounded-md p-2 transition-colors hover:bg-black/80"
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded border bg-gray-100">
                        <img
                          src={pr.image}
                          alt=""
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = ''
                            e.currentTarget.style.background = '#eee'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm leading-tight group-hover:text-white">{pr.title}</div>
                        <div className="mt-0.5 flex items-center gap-3">
                          <div className="text-[13px] font-medium group-hover:text-white">{pr.price}</div>
                          <span className={badgeClass(pr.badge)}>{pr.status}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-right pr-1">
                <span className="text-[11px] text-gray-400">powered by</span>{' '}
                <span className="text-[11px] font-semibold text-gray-500">rapid search</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------------- Gifts menu ---------------- */
function GiftsMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const onClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onClickOutside); document.removeEventListener('keydown', onEsc) }
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-2 py-1 inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black"
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
      >
        <span>Gifts</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div role="menu" aria-label="Gifts menu" className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg">
          <button type="button" className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50" role="menuitem" onClick={() => setOpen(false)}>Gift for Her</button>
          <button type="button" className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50" role="menuitem" onClick={() => setOpen(false)}>Gifts for Him</button>
        </div>
      )}
    </div>
  )
}

/* ---------------- Women menu ---------------- */
function WomenMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const onClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onClickOutside); document.removeEventListener('keydown', onEsc) }
  }, [])
  const Row = ({ children, chevron = false }) => (
    <button type="button" className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-gray-50" onClick={() => setOpen(false)}>
      <span>{children}</span>
      {chevron && <ChevronRight className="h-3.5 w-3.5 text-gray-500" />}
    </button>
  )
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-2 py-1 inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black"
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
      >
        <span>Women</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div role="menu" aria-label="Women menu" className="absolute left-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-50">
          <Row>All</Row>
          <Row chevron>Clothing</Row>
          <Row chevron>Shoes</Row>
          <Row>Bags</Row>
          <Row>Perfumes &amp; Colognes</Row>
          <Row>Accessories</Row>
          <Row>Gifts for Her</Row>
        </div>
      )}
    </div>
  )
}

/* ---------------- Men menu ---------------- */
function MenMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const onClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onClickOutside); document.removeEventListener('keydown', onEsc) }
  }, [])
  const Row = ({ children, chevron = false }) => (
    <button type="button" className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-gray-50" onClick={() => setOpen(false)}>
      <span>{children}</span>
      {chevron && <ChevronRight className="h-3.5 w-3.5 text-gray-500" />}
    </button>
  )
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-2 py-1 inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black"
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
      >
        <span>Men</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div role="menu" aria-label="Men menu" className="absolute left-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-50">
          <Row>All</Row>
          <Row chevron>Clothing</Row>
          <Row chevron>Shoes</Row>
          <Row>Perfumes &amp; Colognes</Row>
          <Row>Accessories</Row>
          <Row>Gifts for Him</Row>
        </div>
      )}
    </div>
  )
}

/* ---------------- What's New menu ---------------- */
function WhatsNewMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  const Row = ({ children }) => (
    <button type="button" className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50" onClick={() => setOpen(false)}>
      {children}
    </button>
  )

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-2 py-1 inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black"
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
      >
        <span>What’s New</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div role="menu" aria-label="What’s New menu" className="absolute left-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-50">
          <Row>Men</Row>
          <Row>Women</Row>
        </div>
      )}
    </div>
  )
}

/* ---------------- Header ---------------- */
function Header() {
  const { state } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const items = state.cart.items
  
  console.log('Header cart items:', items)

  return (
    <header className="border-b bg-white overflow-visible">
      <div className="container-px mx-auto flex h-16 items-center justify-between gap-6">
        {/* ✅ Brand updated to FINCH */}
        <Link
          to="/"
          className="text-[22px] font-extrabold tracking-tight text-black uppercase"
        >
          FINCH
        </Link>

        <nav className="hidden lg:flex items-center gap-5">
          <WhatsNewMenu />
          <MenMenu />
          <WomenMenu />
          <NavItem to="/designers">Designers</NavItem>
          <NavItem to="/sneakers">Sneakers</NavItem>
          <NavItem to="/editorials">Editorials</NavItem>
          <GiftsMenu />
        </nav>

        <div className="flex items-center gap-4">
          <SearchPopover />

          <Link to="/login" state={{ from: location }} aria-label="Account" className="p-2 rounded-full hover:bg-gray-100">
            <IconUser className="h-5 w-5" />
          </Link>

          <Link to="/login" state={{ from: location }} aria-label="Wishlist" className="p-2 rounded-full hover:bg-gray-100">
            <IconHeart className="h-5 w-5" />
          </Link>

          <button onClick={() => navigate('/cart')} aria-label="Bag" className="relative p-2 rounded-full hover:bg-gray-100">
            <IconBag className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex items-center justify-center h-5 min-w-[20px] rounded-full bg-black text-white text-[11px] px-1">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------------- Footer ---------------- */
function Footer() {
  const year = new Date().getFullYear()
  const onDummy = (e) => e.preventDefault()

  const Col = ({ title, items }) => (
    <div>
      <h4 className="mb-4 font-semibold text-white">{title}</h4>
      <ul className="space-y-3">
        {items.map((label) => (
          <li key={label}>
            <button
              type="button"
              onClick={onDummy}
              className="text-sm text-gray-300 hover:text-white"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className="bg-black text-gray-300">
      {/* Top grid */}
      <div className="container-px mx-auto grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-5">
        <Col title="Customer Services" items={['Customer Care','Shipping','Orders & Payments','Returns','FAQ','My Account']} />
        <Col title="Company" items={['About Us','Careers','Contact Us','Find a Store']} />
        <Col title="Categories" items={['Gifts for her','Men','Women','Editorial']} />
        <Col title="Policies" items={['Exchange Policy','Refund Policy','Return Policy','Privacy Policy','Cookie Policy']} />

        {/* Join Our List */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Join Our List</h4>
          <p className="mb-4 text-sm text-gray-400">
            Receive updates on our latest products, releases and exclusive partnerships.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full flex-col gap-3 sm:flex-row">
            <input
              className="w-full flex-1 rounded-lg bg-transparent px-4 py-3 text-sm text-white ring-1 ring-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-white/40"
              placeholder="Your email"
              type="email"
            />
            <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90">
              SUBSCRIBE
            </button>
          </form>

          {/* socials */}
          <div className="mt-5 flex items-center gap-4">
            <button type="button" onClick={onDummy} aria-label="Facebook" className="text-gray-300 hover:text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7c0-1.03.21-1.5 1.5-1.5H17V2.1c-.74-.1-1.49-.1-2.23-.1-2.27 0-3.77 1.38-3.77 3.92V10H8v4h3v8h2Z"/></svg>
            </button>
            <button type="button" onClick={onDummy} aria-label="Instagram" className="text-gray-300 hover:text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.5a2.5 2.5 0 1 0 .001 5.001A2.5 2.5 0 0 0 12 9.5ZM18 6.8a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px mx-auto flex flex-col items-center justify-between gap-3 py-5 text-sm text-gray-400 md:flex-row">
          <span>Powered by FINCH FASHION AND BEAUTY LIMITED</span>
          <span>© {year}, Finch. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}