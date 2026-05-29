# Roadmap OurCode

Dokumen ini menjelaskan arah pengembangan OurCode dari sekarang sampai jangka panjang. Ini bukan janji fitur — ini gambaran besar cara kita membangun platform secara bertahap.

---

## Sekarang: Phase 0 — Stabilisasi

Sebelum publish ke komunitas yang lebih luas, semua hal dasar harus berjalan dengan benar. Bug sudah diperbaiki, form kontak sudah nyambung ke Supabase, dan struktur database sudah aman dengan RLS.

Yang sudah selesai:
- Submit proyek tersambung ke Supabase (dengan fallback ke email)
- Contact form dengan perlindungan spam (honeypot)
- Branding seragam — "OurCode" di seluruh halaman
- SEO dasar: meta description, Open Graph tags
- Skeleton loading, validasi form Bahasa Indonesia, back-to-top button
- Error boundary agar app tidak blank putih kalau crash

Yang masih tertunda:
- GitHub repo dipublish ke publik

---

## Fase Berikutnya: Phase 1 — Submit Proyek Beneran

Saat ini kalau Supabase belum dikonfigurasi, submit proyek fallback ke email. Phase 1 fokus bikin submit proyek jadi fully working dari sisi database — proyek masuk ke Supabase dengan status `PENDING`, tim mereview, lalu publish.

Yang direncanakan:
- Dashboard sederhana untuk admin bisa review dan publish proyek
- Email notifikasi ke admin ketika ada submission baru (via Resend)
- Validasi URL di server-side sebelum insert ke database

---

## Phase 2 — Akun dan Profil

Kalau platform sudah punya traction, logis untuk kasih developer identitas di sini — bukan sekedar nama yang ditulis di form, tapi akun yang bisa diklaim.

Yang direncanakan:
- Register dan login (email + Google OAuth via Supabase Auth)
- Halaman profil publik per developer
- Dashboard "Proyek Saya" — bisa lihat status submission, edit, atau hapus

---

## Phase 3 — Proyek yang Lebih Kaya

Saat ini detail proyek masih dari data JSON statis. Phase 3 bikin semua dinamis dari database.

Yang direncanakan:
- Form submit yang lebih lengkap: thumbnail upload, link live demo, tags
- Halaman ProjectDetail sepenuhnya dari database, bukan JSON
- Admin bisa edit detail proyek setelah publish

---

## Phase 4 — Discovery

Makin banyak proyek → makin susah nemuin yang relevan. Phase ini fokus di pencarian dan filtering.

Yang direncanakan:
- Full-text search (PostgreSQL `tsvector`)
- Filter berdasarkan tech stack, kategori, tahun
- View counter per proyek
- Like / bookmark proyek

---

## Phase 5 dan Seterusnya

Kalau komunitas sudah aktif, baru masuk ke fitur yang lebih dalam:

- Komentar di proyek
- Follow developer dan lihat update dari mereka
- "Cari Kolaborator" tag di proyek
- Blog atau wiki komunitas
- Leaderboard kontributor
- Integrasi GitHub untuk auto-sync stats (stars, forks)

---

## Prinsip yang Kami Pegang

**Ship dulu, sempurnakan nanti.** Lebih baik platform berjalan dengan 5 proyek daripada menunggu sempurna dan tidak pernah launch.

**Kurated > open.** Tidak semua proyek masuk. Bukan soal kualitas kode, tapi soal ada cerita dan konteks yang layak dibaca.

**Komunitas lokal dulu.** Bahasa Indonesia, developer Indonesia, masalah Indonesia. Baru nanti memikirkan international.
