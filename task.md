# TASK — OurCode Phase 0
**Dibuat:** 28 Mei 2026  
**Berdasarkan:** Code review menyeluruh seluruh repositori  
**Phase aktif:** Phase 0 — Foundation Fix

---

## 0A — Bug Kritis 🔴

- [ ] **Fix submit proyek** — saat ini `Projects.tsx:258` langsung tutup modal tanpa kirim data ke mana pun. Koneksikan ke Google Form embed atau Formspree sementara (sebelum Supabase di Phase 1)
- [ ] **Fix contact form** — `Contact.tsx:26` hanya `setTimeout` palsu. Koneksikan ke EmailJS / Formspree / nomor WA dengan notifikasi nyata
- [ ] **Fix branding navbar** — `Layout.tsx:120` bertuliskan `"OurCreativity"` dan `Layout.tsx:121` `"Edisi Koding"`. Ganti jadi `"OurCode"` dan `"ourcreativity.id"`
- [ ] **Rename package** — `package.json:2` masih `"react-example"` → ganti ke `"ourkode"`

---

## 0B — Data Cleanup 🟡

- [ ] **Foto Flores** — `team.json:17` menggunakan `data:image/svg+xml` biru solid. Minta foto asli atau gunakan foto placeholder yang proper (avatar/ilustrasi, bukan warna solid)
- [ ] **Social links tim** — semua di `team.json` mengarah ke URL generik kosong (`github.com/`, `linkedin.com/`, `twitter.com/`). Update ke profil nyata
  - [ ] Social links ARDELLIO (GitHub, LinkedIn, Twitter/X)
  - [ ] Social links FLORES (GitHub, LinkedIn, Twitter/X)
- [ ] **Fix ProjectDetail fallback** — `projectService.ts:49-50` fallback ke proyek `"01"` kalau ID tidak ketemu. Ganti jadi redirect ke `/projects` dengan pesan "Proyek tidak ditemukan"
- [ ] **Tambah deskripsi singkat di projects.json** — field `summary` sudah ada tapi proyek 02, 03, 04, 05 masih sangat minimal (1 paragraf saja di `content`)

---

## 0C — SEO & Meta Tags 🟡

- [ ] **Meta description per halaman** — `index.html` saat ini hanya punya title "Vite + React + TS" tanpa meta apapun
  - [ ] Home: deskripsi platform OurCode
  - [ ] Projects: deskripsi halaman proyek
  - [ ] About: deskripsi tentang OurCreativity
  - [ ] Team: deskripsi tim
  - [ ] Contact: deskripsi kontak
- [ ] **Open Graph tags** — tambah `og:title`, `og:description`, `og:image`, `og:url` di `index.html` (penting untuk share di WA/IG Story)
- [ ] **Update `<title>` di index.html** — dari `"Vite + React + TS"` ke `"OurCode — Showcase Proyek Developer Indonesia"`
- [ ] **Canonical URL** — tambah `<link rel="canonical">` di `index.html`

---

## 0D — UI Polish 🟠

- [ ] **Skeleton loading** — ganti spinner sederhana di `Projects.tsx:172-176` dengan skeleton card yang proper (3 placeholder card saat loading)
- [ ] **Custom form validation** — ganti validasi native HTML5 dengan pesan error custom Bahasa Indonesia
  - [ ] Validasi nama (min 2 karakter)
  - [ ] Validasi email (format valid)
  - [ ] Validasi pesan (min 10 karakter)
  - [ ] Tampilkan error di bawah field, bukan browser popup
- [ ] **Back-to-top button** — tambahkan di halaman Projects dan ProjectDetail (halaman panjang)
- [ ] **Submit modal fields** — tambah field di `Projects.tsx:258-312`:
  - [ ] Kategori proyek (dropdown: Web App, Mobile, Open Source, API, dll)
  - [ ] Tech stack (multi-select atau text input)
  - [ ] Nama pembuat proyek

---

## 0E — Cleanup Teknis 🟠

- [ ] **Hapus dependensi tidak terpakai** dari `package.json`:
  - [ ] `better-sqlite3` (tidak dipakai di mana pun)
  - [ ] `express` (tidak dipakai di mana pun)
  - [ ] `@google/genai` (tidak dipakai di mana pun)
  - [ ] `@types/express` (dari devDependencies)
- [ ] **Update `.env.example`** — hapus GEMINI_API_KEY jika tidak dipakai, tambah variabel yang akan dibutuhkan (misal Formspree endpoint, Supabase URL)
- [ ] **Audit `haptics.ts`** — file hanya 87 bytes, cek apakah `web-haptics` package berjalan di semua browser target
- [ ] **Hapus `metadata.json`** di root jika tidak dipakai

---

## 0F — Konten & Aset 🟢

- [ ] **Foto tim yang asli** — minta semua anggota kirim foto untuk ditaruh di `/public/`
- [ ] **Logo dan favicon** — pastikan favicon di `index.html` mengarah ke logo yang benar (saat ini hanya `/vite.svg` default)
- [ ] **Proyek dummy realistis** — update stats di `projects.json` agar tidak ada "N/A" untuk proyek yang harusnya publik
- [ ] **GitHub repo dipublish** — supaya link `repository` di projects.json bisa diklik dan tidak 404

---

## PROGRESS TRACKER

| Kategori | Total | Done | Remaining |
|---|---|---|---|
| 0A Bug Kritis | 4 | 0 | 4 |
| 0B Data Cleanup | 7 | 0 | 7 |
| 0C SEO & Meta | 7 | 0 | 7 |
| 0D UI Polish | 8 | 0 | 8 |
| 0E Cleanup Teknis | 6 | 0 | 6 |
| 0F Konten | 4 | 0 | 4 |
| **TOTAL** | **36** | **0** | **36** |

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
