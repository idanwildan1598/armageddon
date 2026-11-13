/* ============================================================
   REDIRECT: /login -> /masuk
   Kemudahan akses: banyak orang terbiasa mengetik /login.
   ============================================================ */

import { redirect } from "next/navigation";

export default function LoginRedirect() {
  redirect("/masuk");
}
