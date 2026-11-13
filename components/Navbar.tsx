"use client";

/* ============================================================
   NAVBAR
   Navbar utama. Client Component karena menu hamburger
   di HP membutuhkan state (terbuka/tertutup).
   ============================================================ */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, LogIn, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

// Daftar menu navigasi (Masuk = tombol login admin)
const menu = [
  { label: "Beranda", href: "/" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kategori", href: "/#kategori" },
  { label: "Tentang", href: "/tentang" },
  { label: "Masuk", href: "/masuk" },
];

export default function Navbar() {
  const [terbuka, setTerbuka] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-primary-light bg-card/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo teks + icon */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-white">
            <BookOpen className="size-5" aria-hidden="true" />
          </span>
          <span className="font-semibold text-ink">
            Web <span className="text-primary-dark">Akhir Zaman</span>
          </span>
        </Link>

        {/* Sisi kanan: menu desktop, tombol tema, tombol hamburger */}
        <div className="flex items-center gap-1.5">
          {/* Menu desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {menu.map((item) => {
              const masuk = item.label === "Masuk";
              const aktif =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.split("#")[0]) &&
                    item.href.split("#")[0] !== "/";
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors ${
                      masuk
                        ? "bg-primary font-medium text-white hover:bg-primary-dark"
                        : aktif
                          ? "bg-primary-light font-medium text-primary-dark"
                          : "text-muted hover:bg-primary-light hover:text-primary-dark"
                    }`}
                  >
                    {masuk && <LogIn className="size-4" aria-hidden="true" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Tombol ganti tema (selalu tampil, kanan atas) */}
          <ThemeToggle />

          {/* Tombol hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setTerbuka((v) => !v)}
            aria-expanded={terbuka}
            aria-label={terbuka ? "Tutup menu" : "Buka menu"}
            className="flex size-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-primary-light md:hidden"
          >
            {terbuka ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Menu mobile (drop-down) */}
      {terbuka && (
        <ul className="border-t border-primary-light bg-card px-4 py-3 md:hidden">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setTerbuka(false)} // tutup menu setelah klik
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  item.label === "Masuk"
                    ? "font-medium text-primary-dark"
                    : "text-ink hover:bg-primary-light hover:text-primary-dark"
                }`}
              >
                {item.label === "Masuk" && (
                  <LogIn className="size-4" aria-hidden="true" />
                )}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
