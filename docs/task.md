# TASK — OurCode Phase 0
**Dibuat:** 28 Mei 2026  
**Berdasarkan:** Code review menyeluruh seluruh repositori  
**Phase aktif:** Phase 0 — Foundation Fix

--## 0A — Bug Kritis 🔴

- [x] **Fix submit proyek** — saat ini `Projects.tsx:258` langsung tutup modal tanpa kirim data ke mana pun. Koneksikan ke Google Form embed atau Formspree sementara (sebelum Supabase di Phase 1)
- [x] **Fix contact form** — `Contact.tsx:26` hanya `setTimeout` palsu. Koneksikan ke EmailJS / Formspree / nomor WA dengan notifikasi nyata
- [x] **Fix branding navbar** — `Layout.tsx:120` bertuliskan `"OurCreativity"` dan `Layout.tsx:121` `"Edisi Koding"`. Ganti jadi `"OurCode"` dan `"ourcreativity.id"`
- [x] **Rename package** — `package.json:2` masih `"react-example"` → ganti ke `"ourkode"`

---

## 0B — Data Cleanup 🟡

- [x] **Foto Flores** — `team.json:17` menggunakan `data:image/svg+xml` biru solid. Minta foto asli atau gunakan foto placeholder yang proper (avatar/ilustrasi, bukan warna solid)
- [x] **Social links tim** — semua di `team.json` mengarah ke URL generik kosong (`github.com/`, `linkedin.com/`, `twitter.com/`). Update ke profil nyata
  - [x] Social links ARDELLIO (GitHub, LinkedIn, Twitter/X)
  - [x] Social links FLORES (GitHub, LinkedIn, Twitter/X)
- [x] **Fix ProjectDetail fallback** — `projectService.ts:49-50` fallback ke proyek `"01"` kalau ID tidak ketemu. Ganti jadi redirect ke `/projects` dengan pesan "Proyek tidak ditemukan"
- [x] **Tambah deskripsi singkat di projects.json** — field `summary` sudah ada tapi proyek 02, 03, 04, 05 masih sangat minimal (1 paragraf saja di `content`)

---

## 0C — SEO & Meta Tags 🟡

- [x] **Meta description per halaman** — `index.html` saat ini hanya punya title "Vite + React + TS" tanpa meta apapun
  - [x] Home: deskripsi platform OurCode
  - [x] Projects: deskripsi halaman proyek
  - [x] About: deskripsi tentang OurCreativity
  - [x] Team: deskripsi tim
  - [x] Contact: deskripsi kontak
- [x] **Open Graph tags** — tambah `og:title`, `og:description`, `og:image`, `og:url` di `index.html` (penting untuk share di WA/IG Story)
- [x] **Update `<title>` di index.html** — dari `"Vite + React + TS"` ke `"OurCode — Showcase Proyek Developer Indonesia"`
- [x] **Canonical URL** — tambah `<link rel="canonical">` di `index.html`

---

## 0D — UI Polish 🟠

- [x] **Skeleton loading** — ganti spinner sederhana di `Projects.tsx:172-176` dengan skeleton card yang proper (3 placeholder card saat loading)
- [x] **Custom form validation** — ganti validasi native HTML5 dengan pesan error custom Bahasa Indonesia
  - [x] Validasi nama (min 2 karakter)
  - [x] Validasi email (format valid)
  - [x] Validasi pesan (min 10 karakter)
  - [x] Tampilkan error di bawah field, bukan browser popup
- [x] **Back-to-top button** — tambahkan di halaman Projects dan ProjectDetail (halaman panjang)
- [x] **Submit modal fields** — tambah field di `Projects.tsx:258-312`:
  - [x] Kategori proyek (dropdown: Web App, Mobile, Open Source, API, dll)
  - [x] Tech stack (multi-select atau text input)
  - [x] Nama pembuat proyek

---

## 0E — Cleanup Teknis 🟠

- [x] **Hapus dependensi tidak terpakai** dari `package.json`:
  - [x] `better-sqlite3` (tidak dipakai di mana pun)
  - [x] `express` (tidak dipakai di mana pun)
  - [x] `@google/genai` (tidak dipakai di mana pun)
  - [x] `@types/express` (dari devDependencies)
- [x] **Update `.env.example`** — hapus GEMINI_API_KEY jika tidak dipakai, tambah variabel yang akan dibutuhkan (misal Formspree endpoint, Supabase URL)
- [x] **Audit `haptics.ts`** — file hanya 87 bytes, `web-haptics` kompatibel dengan standard API di modern browsers dan gagal secara anggun tanpa crash.
- [x] **Audit `metadata.json`** — file ini digunakan oleh environment IDE/Remix workspace untuk konfigurasi permissions, sehingga dipertahankan.

---

## 0F — Konten & Aset 🟢

- [x] **Foto tim yang asli** — minta semua anggota kirim foto untuk ditaruh di `/public/`
- [x] **Logo dan favicon** — pastikan favicon di `index.html` mengarah ke logo yang benar (saat ini hanya `/vite.svg` default)
- [x] **Proyek dummy realistis** — update stats di `projects.json` agar tidak ada "N/A" untuk proyek yang harusnya publik
- [ ] **GitHub repo dipublish** — supaya link `repository` di projects.json bisa diklik dan tidak 404

---

## PROGRESS TRACKER

| Kategori | Total | Done | Remaining |
|---|---|---|---|
| 0A Bug Kritis | 4 | 4 | 0 |
| 0B Data Cleanup | 7 | 7 | 0 |
| 0C SEO & Meta | 7 | 7 | 0 |
| 0D UI Polish | 8 | 8 | 0 |
| 0E Cleanup Teknis | 6 | 6 | 0 |
| 0F Konten | 4 | 3 | 1 |
| **TOTAL** | **36** | **35** | **1** |

---

## CATATAN IMPLEMENTASI

### Submit Proyek Sementara (sebelum Supabase)
Gunakan **Formspree** (gratis 50 submission/bulan):
1. Buat akun di formspree.io
2. Buat form baru → dapat endpoint `https://formspree.io/f/XXXXXXXX`
3. Di `Projects.tsx`, ganti `onSubmit` handler untuk POST ke endpoint tersebut

### Contact Form Sementara
Gunakan **EmailJS** (gratis 200 email/bulan):
1. Setup EmailJS dengan template email
2. Di `Contact.tsx`, ganti `setTimeout` dengan `emailjs.send(...)`

Atau lebih simpel: redirect ke link WhatsApp:
```
https://wa.me/62XXXXXXXXX?text=Halo+OurCode...
```

### Supabase untuk Phase 1
Kode sudah siap — `projectService.ts` dan `Contact.tsx` sudah punya komentar Supabase yang tinggal di-uncomment setelah:
1. Buat project Supabase
2. Buat file `src/lib/supabase.ts` dengan client
3. Uncomment kode yang ada

---

*Update task ini setiap kali item selesai dengan mengubah `[ ]` jadi `[x]`*
