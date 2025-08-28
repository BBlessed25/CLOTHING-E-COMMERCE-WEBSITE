// src/components/Navbar.jsx
import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NavChevron = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const IconSearch = (props) => (
    <svg viewBox="0 0 24 24" className={"h-5 w-5 " + (props.className || "")} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const IconUser = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 21a9 9 0 0118 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const IconHeart = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M12 21s-6.7-4.35-9.33-7A5.86 5.86 0 113.5 3.5L12 6.5l8.5-3A5.86 5.86 0 1133.33 14C18.7 16.65 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );

  const IconBag = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8V6a3 3 0 016 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const IconMenu = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const NavItem = ({ children, chevron=false }) => (
    <button className="group inline-flex items-center gap-1 text-[15px] leading-6 text-slate-900 hover:text-black">
      <span>{children}</span>
      {chevron && <NavChevron />}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand + mobile menu */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
              onClick={() => setOpen(!open)}
              aria-label="Open menu"
            >
              <IconMenu />
            </button>

            {/* BRAND */}
            <a
              href="/"
              className="text-[22px] font-extrabold tracking-tight text-black uppercase"
              aria-label="FINCH — home"
            >
              FINCH
            </a>
          </div>

          {/* Center: Primary nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavItem chevron>What's New</NavItem>
            <NavItem chevron>Men</NavItem>
            <NavItem chevron>Women</NavItem>
            <NavItem>Designers</NavItem>
            <NavItem>Sneakers</NavItem>
            <NavItem>Editorials</NavItem>
            <NavItem chevron>Gifts</NavItem>
          </nav>

          {/* Right: Search + Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center rounded-full border border-slate-300 px-3 py-2 w-[260px]">
              <IconSearch className="mr-2 opacity-70" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent text-[15px] placeholder-slate-500 outline-none"
              />
            </div>

            {/* Icons */}
            <button className="hidden md:inline-flex p-2 text-slate-800 hover:bg-slate-100 rounded-full" aria-label="Account">
              <IconUser />
            </button>
            <button className="hidden md:inline-flex p-2 text-slate-800 hover:bg-slate-100 rounded-full" aria-label="Wishlist">
              <IconHeart />
            </button>

            <button className="relative inline-flex p-2 text-slate-800 hover:bg-slate-100 rounded-full" aria-label="Cart">
              <IconBag />
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1.5 text-xs font-medium text-white">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="md:hidden pb-3">
          <div className="flex items-center rounded-full border border-slate-300 px-3 py-2">
            <IconSearch className="mr-2 opacity-70" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-[15px] placeholder-slate-500 outline-none"
            />
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-slate-200">
            <div className="grid gap-2 pt-4">
              <a href="#" className="flex items-center justify-between py-2 text-slate-900">
                <span>What's New</span> <NavChevron />
              </a>
              <a href="#" className="flex items-center justify-between py-2 text-slate-900">
                <span>Men</span> <NavChevron />
              </a>
              <a href="#" className="flex items-center justify-between py-2 text-slate-900">
                <span>Women</span> <NavChevron />
              </a>
              <a href="#" className="py-2 text-slate-900">Designers</a>
              <a href="#" className="py-2 text-slate-900">Sneakers</a>
              <a href="#" className="py-2 text-slate-900">Editorials</a>
              <a href="#" className="flex items-center justify-between py-2 text-slate-900">
                <span>Gifts</span> <NavChevron />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}