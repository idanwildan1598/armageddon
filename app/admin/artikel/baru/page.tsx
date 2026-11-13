/* ============================================================
   ADMIN: TAMBAH ARTIKEL BARU
   ============================================================ */

import EditorForm from "@/components/admin/EditorForm";

export default function AdminArtikelBaruPage() {
  return (
    <div>
      <p className="text-sm text-muted">
        Isi data artikel dan susun isinya per blok, lalu simpan.
      </p>
      <div className="mt-6">
        <EditorForm />
      </div>
    </div>
  );
}
