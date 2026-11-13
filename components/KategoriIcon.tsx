/* ============================================================
   KATEGORI ICON
   Data di data/artikel.ts hanya menyimpan NAMA icon (string),
   karena nama icon tidak bisa dikirim sebagai komponen React.
   Komponen ini menerjemahkan nama tersebut ke icon lucide-react.
   ============================================================ */

import {
  BookOpen,
  Compass,
  Eye,
  Hourglass,
  Moon,
  Shield,
  type LucideIcon,
} from "lucide-react";

// Peta nama icon (di data) ke komponen icon lucide-react.
const petaIcon: Record<string, LucideIcon> = {
  Moon,
  Hourglass,
  Eye,
  Shield,
  BookOpen,
  Compass,
};

interface Props {
  nama: string; // nama icon di data, mis. "Moon"
  className?: string; // ukuran/warna via class Tailwind
}

export default function KategoriIcon({ nama, className }: Props) {
  const Icon = petaIcon[nama] ?? BookOpen; // fallback aman
  return <Icon className={className} aria-hidden="true" />;
}
