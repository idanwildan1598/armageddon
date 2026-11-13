/* ============================================================
   ROOT LAYOUT
   Membungkus seluruh halaman: memuat font (Poppins untuk
   teks Latin, Amiri untuk teks Arab), CSS global, Navbar,
   Footer, dan metadata default (SEO + Open Graph).
   ============================================================ */

import type { Metadata } from "next";
import { Suspense } from "react";
import { Amiri, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// Font utama: Poppins (variable font, ringan)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Font teks Arab untuk dalil
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

// Metadata default seluruh website (judul halaman per halaman
// akan menimpa title ini).
export const metadata: Metadata = {
  metadataBase: new URL("https://web-akhir-zaman.vercel.app"), // ganti dengan domain final saat deploy
  title: {
    default: "Web Akhir Zaman",
    template: "%s | Web Akhir Zaman",
  },
  description:
    "Kumpulan bahan dakwah ringan dan mudah dibaca tentang akhir zaman, tanda kiamat, dan kesiapan hati.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Web Akhir Zaman",
    title: "Web Akhir Zaman",
    description:
      "Kumpulan bahan dakwah ringan dan mudah dibaca tentang akhir zaman, tanda kiamat, dan kesiapan hati.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${amiri.variable} h-full antialiased`}
      suppressHydrationWarning // class "dark" diatur oleh script di bawah
    >
      <body className="flex min-h-full flex-col bg-background text-ink">
        {/* Script anti-kedip: terapkan tema tersimpan SEBELUM halaman
            tergambar, agar tidak terjadi kedipan putih/gelap. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("tema");var g=t?t==="gelap":window.matchMedia("(prefers-color-scheme: dark)").matches;if(g)document.documentElement.classList.add("dark");}catch(e){}})();`,
          }}
        />

        {/* Navbar tetap di atas seluruh halaman.
            Dibungkus Suspense karena memakai usePathname()
            (nilai hanya tersedia saat runtime). */}
        <Suspense fallback={<div className="h-16 border-b border-primary-light bg-card" />}>
          <Navbar />
        </Suspense>

        {/* Konten halaman */}
        <main className="flex-1">{children}</main>

        {/* Footer di seluruh halaman */}
        <Footer />
      </body>
    </html>
  );
}
