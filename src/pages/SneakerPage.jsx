import React from "react";
import { Link } from "react-router-dom";

/**
 * Sneakers listing page
 * - Responsive grid (1/2/3/4/5 columns)
 * - Soft card UI with tall image pane
 * - “Filter / Results” on the left, “Sort” on the right
 * - Prices and brands styled to match your screenshots
 */
export default function SneakerPage() {
  const products = [
    // --- Row 1
    {
      id: 1,
      slug: "ace-gg-canvas-low-top-sneakers",
      title: "Ace GG Canvas Low-Top Sneakers",
      brand: "Gucci",
      price: "₦363,480",
      image: "/assets/GG.jpg",
    },
    {
      id: 2,
      slug: "chloe-kick-low-top-sneakers",
      title: "Chloé Kick Low-Top Sneakers",
      brand: "Chloe",
      price: "₦1,045,200",
      image: "/assets/Chloe.jpg",
    },
    {
      id: 3,
      slug: "vieira-2-sneakers",
      title: "Vieira 2 Sneakers ",
      brand: "Christian Louboutin",
      price: "₦514,800",
      image: "/assets/cl.jpg",
    },
    {
      id: 4,
      slug: "ff-logo-low-top-sneakers",
      title: "FF Logo Low-Top Sneakers",
      brand: "Fendi",
      price: "₦873,600",
      image: "/assets/FD.jpg",
    },
    {
      id: 5,
      slug: "urban-street-sneakers-leather-elastic",
      title: "Urban Street Sneakers in Leather with Elastic Band",
      brand: "Givenchy",
      price: "₦811,200",
      image: "/assets/GV.jpg",
    },

    // --- Row 2
    {
      id: 6,
      slug: "veles-knit-sneakers",
      title: "Veles Knit Sneakers",
      brand: "Jimmy Choo",
      price: "₦483,600",
      image: "/assets/JM.jpg",
    },
    {
      id: 7,
      slug: "womens-americas-cup-biker-fabric-sneakers",
      title: "Women's America's Cup Biker Fabric Sneakers",
      brand: "Prada",
      price: "₦2,346,000",
      image: "/assets/prada.jpg",
    },
    {
      id: 8,
      slug: "skel-top-low-leather-sneakers",
      title: "Skel Top Low Leather Sneakers",
      brand: "Amiri",
      price: "₦996,400",
      image: "/assets/amiri1.jpg",
    },
    {
      id: 9,
      slug: "leather-curb-sneakers",
      title: "Leather Curb Sneakers",
      brand: "Lanvin",
      price: "₦920,400",
      image: "/assets/lanvin.jpg",
    },
    {
      id: 10,
      slug: "stella-mccartney-adidas-rasant-logo-sneakers",
      title: "Stella McCartney x adidas Rasant Logo Sneakers",
      brand: "Stella McCartney",
      price: "₦358,800",
      image: "/assets/stella.jpg",
    },

    // --- Row 3
    {
      id: 11,
      slug: "new-regis-check-sneakers",
      title: "New Regis Check Sneakers",
      brand: "Burberry",
      price: "₦842,400",
      image: "/assets/burberry.jpg",
    },
    {
      id: 12,
      slug: "stella-mccartney-adidas-rasant-logo-sneakers-2",
      title: "Stella McCartney x adidas Rasant Logo Sneakers",
      brand: "Stella McCartney",
      price: "₦1,842,400",
      image: "/assets/mcarty.jpg",
    },
    {
      id: 13,
      slug: "gymnasium-technical-fabric-suede-sneakers",
      title: "Gymnasium Technical Fabric and Suede Sneakers",
      brand: "Miu Miu",
      price: "₦363,480",
      image: "/assets/miu.jpg",
    },
    {
      id: 14,
      slug: "aeliot-logo-detailed-leather-canvas-sneakers",
      title: "AEliot Logo-Detailed Leather & Canvas Sneakers",
      brand: "Bottega Veneta",
      price: "₦983,600",
      image: "/assets/bv.jpg",
    },
    {
      id: 15,
      slug: "comme-des-garcons-asics-gel-lyte-iii-sneakers",
      title: "Comme des Garçons Shirt X Asics Gel-Lyte III Low-Top Sneakers",
      brand: "Comme des Garçons",
      price: "₦811,200",
      image: "/assets/mul.jpg",
    },

    // --- Row 4 (to show footer “You’re viewing 1–18 of 18” like your shot)
    {
      id: 16,
      slug: "the-72-spring-sneakers",
      title: "The 72 Spring Sneakers",
      brand: "Marc Jacobs",
      price: "₦676,400",
      image: "/assets/marc.jpg",
    },
    {
      id: 17,
      slug: "leather-shearling-low-top-sneakers",
      title: "Leather & Shearling Low-Top Sneakers",
      brand: "McQueen",
      price: "₦883,600",
      image: "/assets/mq.jpg",
    },
    {
      id: 18,
      slug: "vlogo-easyjog-calfskin-fabric-sneakers",
      title: "VLogo Easyjog Calfskin and Fabric Sneakers",
      brand: "Valentino Garavani",
      price: "₦1,194,640",
      image: "/assets/vl.jpg",
    },
  ];

  return (
    <div className="container-px mx-auto py-6">
      {/* Top controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm">
            {/* simple equalizer icon */}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
            </svg>
            <span>Filter</span>
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
            </svg>
          </div>
          <span className="text-sm text-gray-500">18 Results</span>
        </div>

        <div className="text-sm text-gray-700">
          <span className="mr-2">Sort:</span>
          <span className="inline-flex items-center gap-1 rounded-full border px-3 py-2">
            Featured
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.slug || p.id}`}
            className="block rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image pane (tall, very light gray background like screenshots) */}
            <div className="bg-gray-100">
              <div className="aspect-[3/4] w-full overflow-hidden flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "";
                    e.currentTarget.style.background = "#eee";
                  }}
                />
              </div>
            </div>

            {/* Meta */}
            <div className="p-4">
              <h3 className="text-[15px] md:text-base font-medium leading-tight">{p.title}</h3>
              <div className="mt-1 text-sm text-gray-500">{p.brand}</div>
              <div className="mt-1 font-medium">{p.price}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note like in your screenshot */}
      <div className="mt-8 text-center text-sm text-gray-600">
        You’re viewing 1–18 of 18 products
      </div>
    </div>
  );
}