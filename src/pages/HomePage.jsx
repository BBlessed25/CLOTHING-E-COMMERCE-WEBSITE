// src/pages/HomePage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/** --- Small, reuseable bits --- */
const Section = ({ title, children, right }) => (
  <section className="container-px mx-auto py-12 md:py-16">
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      {right}
    </div>
    {children}
  </section>
);

const Card = ({ image, title, subtitle, price, slug, id }) => (
  <Link
    to={`/products/${slug || id}`}
    className="group rounded-2xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
  >
    <div className="aspect-[4/3] w-full bg-gray-50">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img 
        src={image} 
        alt={title}
        className="h-full w-full object-contain"
        onError={(e) => {
          e.currentTarget.src = ''
          e.currentTarget.style.background = '#eee'
        }}
      />
    </div>
    <div className="p-4">
      <div className="text-sm text-gray-500">{subtitle}</div>
      <div className="mt-1 text-[15px] font-medium">{title}</div>
      {price && <div className="mt-1 text-[15px]">₦{price.toLocaleString()}</div>}
    </div>
  </Link>
);

/** --- HERO / CAROUSEL --- */
const slidesSeed = [
  {
    id: "FINCH",
    img: "/assets/model 1.jpg",
    overlayClass: "from-slate-900/70 via-slate-900/40 to-transparent",
    heading: "FINCH",
    sub: "See it your way",
    cta: "Shop Now",
  },
  {
    id: "wardrobe",
    img: "/assets/model 2.jpg",
    overlayClass: "from-black/70 via-black/40 to-transparent",
    heading: "Wardrobe Essentials",
    sub: "Must-Have Staples For Effortless Style",
    ctaLeft: "Shop Women",
    ctaRight: "Shop Men",
  },
  {
    id: "shop-her",
    img: "/assets/model 3.jpg",
    overlayClass: "from-black/70 via-black/40 to-transparent",
    heading: "Shop Her Favorite",
    sub: "Special Gift Inside",
    cta: "Shop Now",
  },
];

function Hero() {
  const slides = useMemo(() => slidesSeed, []);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  // auto-advance every 4 seconds
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const start = () => {
    stop();
    timerRef.current = setInterval(() => {
      setIdx((p) => (p + 1) % slides.length);
    }, 4000);
  };
  const stop = () => timerRef.current && clearInterval(timerRef.current);

  const go = (n) => setIdx((n + slides.length) % slides.length);

  const slide = slides[idx];

  return (
    <section className="relative">
      {/* Image */}
      <div className="relative h-[68vh] md:h-[78vh] w-full overflow-hidden">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={slide.img}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${slide.overlayClass}`}
        />
        {/* Copy */}
        <div className="container-px mx-auto relative z-10 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              {slide.heading}
            </h1>
            {slide.sub && (
              <p className="mt-4 text-xl md:text-3xl text-white/90">{slide.sub}</p>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              {slide.cta && (
                <Link 
                  to="/collections" 
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
                >
                  {slide.cta}
                </Link>
              )}
              {slide.ctaLeft && (
                <Link 
                  to="/collections" 
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
                >
                  {slide.ctaLeft}
                </Link>
              )}
              {slide.ctaRight && (
                <Link 
                  to="/collections" 
                  className="rounded-full border border-white/70 bg-transparent px-6 py-3 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  {slide.ctaRight}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dots + arrows */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-3">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
          <button
            aria-label="Previous"
            onClick={() => go(idx - 1)}
            className="h-6 w-6 rounded-full text-white/90 hover:text-white"
          >
            ‹
          </button>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === idx ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <button
            aria-label="Next"
            onClick={() => go(idx + 1)}
            className="h-6 w-6 rounded-full text-white/90 hover:text-white"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

/** --- Tabs helper for section carousels --- */
function SimpleTabs({ tabs, active, onChange }) {
  return (
    <div className="mb-6 flex gap-6">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`border-b-2 pb-2 text-[15px] transition ${
            t === active
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/** --- Dummy content (replace with your real products/imagery) --- */
const img = (n) => `/assets/p${n}.png`;

const demoRows = {
  brands_finch: [
    { id: 'home-1', slug: 'finch-meshed-knit-shirt', image: "/assets/finch meshed.jpg", title: "finch meshed knit shirt", subtitle: "Finch", price: 296400 },
    { id: 'home-2', slug: 'finch-ski-quilted-puffer-jacket', image: "/assets/finch metallic.jpg", title: "finch Ski Quilted Puffer Jacket In Metallic Polyester ", subtitle: "Finch", price: 296400 },
    { id: 'home-3', slug: 'finch-varsity-jacket', image: "/assets/finch varsity jacket.jpg", title: "finch Varsity Jacket", subtitle: "Finch", price: 280800 },
    { id: 'home-4', slug: 'finch-monogram-denim-jacket', image: "/assets/finch denim jacket.jpeg", title: "Finch Monogram Denim", subtitle: "finch", price: 343200 },
    { id: 'home-5', slug: 'finch-monogram-denim-jeans', image: "/assets/finch denim jeans.jpg", title: "Finch Monogram Denim", subtitle: "Finch", price: 312000 },
  ],
  trending_sunglasses: [
    { id: 'home-6', slug: 'cartier-elysian-sunglass', image: "/assets/Cartier eyewear .jpg", title: "Cartier Elysian Sunglass", subtitle: "Cartier", price: 210600 },
    { id: 'home-7', slug: 'gucci-gg1855o-002', image: "/assets/Gucci eyewear.jpg", title: "GUCCI GG1855O 002", subtitle: "Gucci", price: 259200 },
    { id: 'home-8', slug: 'dior-signatureo-b2i', image: "/assets/Dior eyewear.jpg", title: "DiorSignatureO B2I", subtitle: "Dior", price: 267300 },
    { id: 'home-9', slug: 'channel-ch5546q-17338h', image: "/assets/Channel eyewear.jpg", title: "CH5546Q 17338H", subtitle: "Channel", price: 243000 },
    { id: 'home-10', slug: 'celine-3-dots', image: "/assets/Celine eyewear.jpg", title: "CELINE 3 Dots", subtitle: "Celine", price: 259200 },
  ],
  best_sellers_shirts: [
    { id: 'home-11', slug: 'louis-vuitton-embroidered-polo', image: "/assets/LV-polo.jpg", title: "Embroidered Short-Sleeved Cotton Blend Polo Shirt", subtitle: "Louis Vuitton", price: 390000 },
    { id: 'home-12', slug: 'burberry-slim-fit-monogram-shirt', image: "/assets/Burberry Shirt.jpg", title: "Burberry-Slim-Fit-Monogram-Motif-Stretch-Cotton-Poplin-Shirt-Deep-Maroon", subtitle: "Burberry", price: 343200 },
    { id: 'home-13', slug: 'amiri-hollywood-bowling-shirt', image: "/assets/Amiri shirt.png", title: "Amiri Hollywood Bowling Shirt", subtitle: "Amiri", price: 530400 },
    { id: 'home-14', slug: 'mcm-kasina-bandana-hoodie', image: "/assets/MCM shirt.jpg", title: "MCM X KASINA Bandana Monogram Zip Hoodie In Oxford Cotton", subtitle: "MCM", price: 499200 },
  ],
     MCM_Collections: [
     { id: 'home-15', slug: 'mcm-monogram-shorts-denim', image: "/assets/MCM shorts.jpg", title: "Monogram Shorts In Denim Jacquard", subtitle: "MCM", price: 124800 },
     { id: 'home-16', slug: 'mcm-essential-logo-shorts', image: "/assets/MCM shorts1.jpg", title: "Essential Logo Ponte Shorts", subtitle: "MCM", price: 46800 },
     { id: 'home-17', slug: 'mcm-skirt-layered-shorts', image: "/assets/MCM skirt.jpg", title: "Skirt-Layered Shorts In ECONYL® And Monogram Print Leather", subtitle: "MCM", price: 117000 },
         { id: 'home-18', slug: 'mcm-reversible-vest', image: "/assets/MCM jacket1.jpg", title: "Reversible Vest In Lamb Leather And Monogram Nylon", subtitle: "MCM", price: 124800 },
     { id: 'home-19', slug: 'mcm-cropped-rider-jacket', image: "/assets/MCM rider.jpg", title: "Cropped Rider Jacket In Lamb Leather", subtitle: "MCM", price: 124800 },
  ],
};

/** --- Page --- */
export default function HomePage() {
  const [brandsTab, setBrandsTab] = useState("Finch");
  const [trendTab, setTrendTab] = useState("Sunglasses");
  const [bestTab, setBestTab] = useState("Shirts");

  return (
    <div className="bg-white">
      {/* HERO */}
      <Hero />

      {/* SHOP BY BRANDS */}
      <Section
        title="SHOP BY BRANDS"
        right={
          <button className="text-sm font-medium underline underline-offset-4">
            View all
          </button>
        }
      >
        <SimpleTabs
          tabs={["Finch", "BBC", "Arte"]}
          active={brandsTab}
          onChange={setBrandsTab}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {demoRows.brands_finch.map((p, i) => (
            <Card key={i} {...p} />
          ))}
        </div>
      </Section>

      {/* NEW ARRIVALS */}
      <Section
        title="NEW ARRIVALS"
        right={
          <button className="text-sm font-medium underline underline-offset-4">
            View all
          </button>
        }
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {demoRows.trending_sunglasses.map((p, i) => (
            <Card key={i} {...p} />
          ))}
        </div>
      </Section>

      {/* BEST SELLERS */}
      <Section
        title="Best Sellers"
        right={
          <button className="text-sm font-medium underline underline-offset-4">
            View all
          </button>
        }
      >
        <SimpleTabs
          tabs={["Shirts", "T-Shirts", "Shorts"]}
          active={bestTab}
          onChange={setBestTab}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {demoRows.best_sellers_shirts.map((p, i) => (
            <Card key={i} {...p} />
          ))}
        </div>
      </Section>

      {/* TRENDING */}
      <Section
        title="Trending"
        right={
          <button className="text-sm font-medium underline underline-offset-4">
            View all
          </button>
        }
      >
        <SimpleTabs
          tabs={["Sunglasses", "Perfumes", "Slides"]}
          active={trendTab}
          onChange={setTrendTab}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {demoRows.trending_sunglasses.map((p, i) => (
            <Card key={i} {...p} />
          ))}
        </div>
      </Section>

      {/* DESIGN YOUR LEGACY */}
      <Section title=" ">
        <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
          <div className="grid items-stretch gap-0 md:grid-cols-2">
            <div className="bg-neutral-100 p-8 md:p-14">
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Design Your Legacy
              </h3>
              <p className="mt-3 text-base text-gray-600 max-w-xl">
                A jersey as unique as you—customize it, wear it, own it, go for it.
              </p>
              <button className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90">
                Customize Now
              </button>
            </div>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src="/assets/jersey.jpg"
              className="h-[280px] w-full object-cover md:h-full"
            />
          </div>
        </div>
      </Section>

      {/* 234 LABS */}
      <Section
        title="Collections"
        right={
          <button className="text-sm font-medium underline underline-offset-4">
            View all
          </button>
        }
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {demoRows.MCM_Collections.map((p, i) => (
            <Card key={i} {...p} />
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section title=" ">
        <div className="relative overflow-hidden rounded-3xl bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
            <span className="select-none text-[18vw] font-black tracking-tight">
              FINCH
            </span>
          </div>

          <div className="relative grid items-center gap-8 p-8 md:grid-cols-2 md:p-14">
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Sign up and get 10% off your first order!
              </h3>
              <p className="mt-3 text-base text-gray-600 max-w-xl">
                Get 10% off your first order. Subscribe for exclusive updates.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full gap-2 rounded-full bg-white p-2 ring-1 ring-black/10 md:max-w-lg"
            >
              <input
                className="min-w-0 flex-1 rounded-full px-4 py-3 outline-none"
                placeholder="Your email"
                type="email"
              />
              <button className="whitespace-nowrap rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}