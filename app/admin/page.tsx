/* ============================================================
   PANEL ADMIN: DAFTAR ARTIKEL
   Menampilkan semua artikel (dari penyimpanan lokal) dengan
   tombol ubah, hapus, dan tambah artikel baru.
   ============================================================ */

import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import TombolHapus from "@/components/admin/TombolHapus";
import { bacaSemua } from "@/lib/store";
import { formatTanggal } from "@/lib/artikel";

export default function AdminPage() {
  const daftar = bacaSemua();

  return (
    <div>
      {/* Baris aksi atas */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{daftar.length} artikel tersimpan</p>
        <Link
          href="/admin/artikel/baru"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          <Plus className="size-4" aria-hidden="true" />
          Tambah Artikel
        </Link>
      </div>

      {/* Daftar artikel (baris tabel sederhana) */}
      <ul className="mt-6 divide-y divide-primary-light rounded-2xl border border-primary-light bg-card">
        {daftar.map((a) => (
          <li key={a.slug} className="flex items-center gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{a.judul}</p>
              <p className="mt-0.5 text-xs text-muted">
                {a.kategori} · {formatTanggal(a.tanggal)} · /artikel/{a.slug}
              </p>
            </div>

            {/* Tombol ubah */}
            <Link
              href={`/admin/artikel/${a.slug}`}
              aria-label={`Ubah ${a.judul}`}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-primary-light hover:text-primary-dark"
            >
              <Pencil className="size-4" aria-hidden="true" />
            </Link>

            {/* Tombol hapus */}
            <TombolHapus slug={a.slug} judul={a.judul} />
          </li>
        ))}
      </ul>

      {/* Catatan penyimpanan */}
      <p className="mt-6 text-xs leading-relaxed text-muted">
        Artikel disimpan di file lokal <code className="rounded bg-primary-light px-1.5 py-0.5">data/artikel-lokal.json</code>.
        Perubahan langsung tampil saat menjalankan <code className="rounded bg-primary-light px-1.5 py-0.5">npm run dev</code>.
        Untuk memunculkannya di hosting, commit file tersebut ke GitHub.
      </p>
    </div>
  );
}
