/* ============================================================
   ADMIN: UBAH ARTIKEL
   Memuat artikel berdasarkan slug dari penyimpanan lokal,
   lalu menampilkan form editor yang terisi datanya.
   ============================================================ */

import { notFound } from "next/navigation";
import EditorForm from "@/components/admin/EditorForm";
import { bacaSemua } from "@/lib/store";

export default async function AdminUbahArtikelPage({
  params,
}: PageProps<"/admin/artikel/[slug]">) {
  const { slug } = await params;

  // Cari artikel; bila tidak ada, tampilkan 404
  const artikel = bacaSemua().find((a) => a.slug === slug);
  if (!artikel) notFound();

  return (
    <div>
      <p className="text-sm text-muted">
        Mengubah artikel: <span className="font-medium text-ink">{artikel.judul}</span>
      </p>
      <div className="mt-6">
        <EditorForm awal={artikel} />
      </div>
    </div>
  );
}
