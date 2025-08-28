import React, { useMemo } from "react";

/**
 * Designers (Brands) directory
 * - A–Z index row with a leading “#”
 * - Two-column grid of alphabetical sections (A/Z styling like screenshots)
 * - Simple search field on the right of the index row (non-functional placeholder to match UI)
 * - Smooth scroll when clicking a letter
 *
 * Add/edit brand names in the `allBrands` array below.
 */
export default function DesignersPage() {
  // Flat list of brand names (pulled from your screenshots)
  const allBrands = [
    // #
    "234LABS",
    "424",

    // A
    "A Cold Wall",
    "A.P.C (Atelier de Production et de Création)",
    "Ambush",
    "Area",
    "ARTE",
    "Ashluxe",
    "Axel Arigato",

    // B
    "Balmain",
    "BBC",
    "Bianca Saunders",
    "Bloke",
    "Botter",

    // C
    "Casablanca",
    "Charles Jeffery Loverboy",
    "Coperni",
    "Cult Gaia",

    // D
    "Daily Paper",
    "Darkai",
    "Diesel",

    // E
    // (none shown in first screenshot; keep section header empty)

    // F
    "Facetasm",
    "Fear Of God",
    "Frescobol",

    // G
    "Ganni",
    "GCDS",
    "GmbH",

    // H
    "Han Kjobenhavn",
    "Hardkova",
    "Hatton Labs",
    "Heliot Emil",
    "Human Made",

    // I
    "Ih Nom Uh Nit",
    "Inbetweeners",

    // J
    "JW Anderson",
    "JW PEI",

    // K
    "Kenzo",
    "Ksubi",

    // L
    "Linda Farrow",

    // M
    "Maison Margiela",
    "Marcelo Burlon",
    "Marine Serre",
    "Martine Rose",
    "Missoni",
    "MSFTRep",
    "Msgm",

    // N
    "Nahmias",
    "Nike",

    // O
    "Orelia",
    "Ottolinger",
    "Our Legacy",

    // P
    "Pdf",

    // Q
    // (none in shots)

    // R
    "Represent",
    "RetroSuperFuture",
    "Rhude",
    "Robyn Lynch",

    // S
    "Sunflower",

    // T
    "The Antipode",

    // V
    "Vetements",

    // W
    "Who Decides War",
    "Winnie",
    "Wood Wood",

    // Y
    "Yume Yume",

    // Z
    "Zafira",
  ];

  // Build a grouped map like { '#': [...], 'A': [...], ... }
  const grouped = useMemo(() => {
    const map = new Map();
    const letters = ["#", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];
    letters.forEach((l) => map.set(l, []));
    for (const name of allBrands) {
      const first = name.trim().charAt(0).toUpperCase();
      const key = /[A-Z]/.test(first) ? first : "#";
      map.get(key).push(name);
    }
    // sort brands within each letter group alphabetically (case-insensitive)
    for (const [k, arr] of map) {
      arr.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    }
    return map;
  }, [allBrands]);

  const letters = ["#", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  const scrollTo = (letter) => {
    const el = document.getElementById(`brand-section-${letter}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-4xl md:text-5xl font-semibold text-center mb-8">Brands</h1>

      {/* A-Z index row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1">
          {letters.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className={`h-8 min-w-[32px] rounded-md border px-2 text-sm ${
                l === "B" ? "bg-gray-900 text-white border-gray-900" : "bg-gray-100 hover:bg-gray-200"
              }`}
              aria-label={`Jump to ${l}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* search pill on right (visual only) */}
        <div className="hidden md:flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"></line>
          </svg>
          <input className="w-56 outline-none" placeholder="Search brands" />
        </div>
      </div>

      {/* Sections grid — two columns on large screens */}
      <div className="mt-10 grid gap-x-12 gap-y-12 lg:grid-cols-2">
        {letters.map((l) => (
          <section key={l} id={`brand-section-${l}`}>
            <h2 className="text-3xl font-medium tracking-wide mb-4">{l}</h2>
            <div className="h-px bg-gray-200 mb-6" />
            <ul className="space-y-4">
              {grouped.get(l).length === 0 ? (
                <li className="text-gray-300 select-none">—</li>
              ) : (
                grouped.get(l).map((name) => <li key={name}>{name}</li>)
              )}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}