# PLAN: OurCode — Community Web App
**Dokumen:** Product & Engineering Plan  
**Versi:** 2.0  
**Tanggal:** 28 Mei 2026  
**Status:** Aktif — berdasarkan code review menyeluruh

---

## VISI

> OurCode adalah **GitHub Showcase + Dev Community versi Indonesia** — tempat developer lokal bisa showcase proyek, temukan kolaborator, dan bangun reputasi lewat karya nyata, bukan CV.

---

## STATUS SEKARANG — HASIL CODE REVIEW

### ✅ Sudah Ada & Berjalan
| Komponen | Status | Catatan |
|---|---|---|
| Frontend Vite + React 19 + TypeScript | ✅ Jalan | Stack solid |
| Tailwind CSS v4 | ✅ | Dengan design system konsisten |
| GSAP animations (hero, scroll, parallax) | ✅ | Sangat polished |
| Dark/Light mode toggle | ✅ | |
| Custom cursor | ✅ | |
| Page transitions | ✅ | |
| Halaman Home | ✅ | Hero, marquee, about, featured projects, CTA |
| Halaman Projects | ✅ | List view + hover image + search + modal submit |
| Halaman ProjectDetail | ✅ | TOC, stats, gallery, tech stack, content blocks |
| Halaman About | ✅ | Manifesto scrub, sticky interactive, parallax |
| Halaman Team | ✅ | Reveal animations, social links |
| Halaman Contact | ✅ | Form UI, social links (WA, Discord, IG) |
| Mobile responsive layout | ✅ | Nav pill desktop, fullscreen menu mobile |
| 5 proyek mock data | ✅ | JSON statis |
| 2 anggota tim data | ✅ | JSON statis |

### ❌ Bug & Technical Debt Ditemukan

| No | Issue | Prioritas | File |
|---|---|---|---|
| 1 | **Submit proyek tidak berfungsi** — modal form langsung tutup tanpa kirim data ke mana pun | 🔴 Kritis | `Projects.tsx:258` |
| 2 | **Contact form fake** — simulasi 1200ms delay, tidak ada backend | 🔴 Kritis | `Contact.tsx:26` |
| 3 | **Stats proyek hardcoded** — stars/forks/contributors tidak real (repo tidak ada) | 🟡 Tinggi | `projects.json` |
| 4 | **Foto Flores placeholder** — menggunakan SVG biru solid, bukan foto asli | 🟡 Tinggi | `team.json:17` |
| 5 | **Social links tim generic** — semua mengarah ke `github.com/`, `linkedin.com/` kosong | 🟡 Tinggi | `team.json` |
| 6 | **Branding mismatch** — navbar logo bertuliskan "OurCreativity" bukan "OurCode" | 🟡 Tinggi | `Layout.tsx:120-121` |
| 7 | **package.json name** masih `"react-example"` | 🟡 Tinggi | `package.json:2` |
| 8 | **Dependensi mati** — `better-sqlite3`, `express`, `@google/genai` terinstall tapi tidak dipakai | 🟡 Tinggi | `package.json` |
| 9 | **SEO kosong** — `index.html` tidak punya meta description, OG tags | 🟡 Tinggi | `index.html` |
| 10 | **Skeleton loading tidak ada** — hanya spinner sederhana, bukan skeleton UI | 🟠 Sedang | `Projects.tsx:172-176` |
| 11 | **Form validation native HTML5** — belum custom validation dengan pesan error Bahasa Indonesia | 🟠 Sedang | `Contact.tsx`, `Projects.tsx` |
| 12 | **Back-to-top button** belum ada di halaman panjang | 🟠 Sedang | Global |
| 13 | **ProjectDetail fallback aneh** — jika ID tidak ketemu, fallback ke proyek `01` tanpa notifikasi | 🟠 Sedang | `projectService.ts:49-50` |
| 14 | **Gambar eksternal (Unsplash)** — semua gambar proyek & about bergantung URL publik | 🟠 Sedang | `projects.json`, `About.tsx` |
| 15 | **haptics.ts** sangat minimal (87 bytes) — perlu dicek kompatibilitas mobile | 🟢 Rendah | `haptics.ts` |
| 16 | **Submit modal fields minimal** — hanya nama, link, deskripsi. Kurang data untuk review | 🟢 Rendah | `Projects.tsx:258-312` |

---

## TECH STACK AKTUAL

```
Frontend:   Vite 6 + React 19 + TypeScript
Styling:    Tailwind CSS v4 (via @tailwindcss/vite plugin)
Animation:  GSAP 3 + ScrollTrigger + Motion
Routing:    React Router DOM v7
Icons:      Lucide React
Data:       JSON statis (src/data/)
Hosting:    Vercel (planned)
Backend:    BELUM ADA — semua masih mock/simulasi
Database:   BELUM ADA — PostgreSQL/Supabase planned
Auth:       BELUM ADA
```

**Dependensi terinstall tapi belum dipakai (perlu cleanup):**
- `better-sqlite3` — mungkin rencana backend lokal
- `express` — backend Express yang belum dibangun
- `@google/genai` — Gemini AI integration yang belum diimplementasi

---

## PHASES

---

### PHASE 0 — Foundation Fix *(AKTIF SEKARANG)*
**Goal:** Beresin semua bug kritis & technical debt sebelum launch

**Scope perbaikan berdasarkan code review:**

**0A — Bug Kritis (lakukan dulu)**
- [ ] Fix submit proyek — koneksikan ke Google Form / Airtable / email sementara
- [ ] Fix contact form — koneksikan ke email/WhatsApp notifikasi nyata
- [ ] Fix branding: ubah "OurCreativity Edisi Koding" di navbar jadi "OurCode"
- [ ] Ganti nama `package.json` dari "react-example" ke "ourkode"

**0B — Data Cleanup**
- [ ] Tambah foto asli Flores di `team.json`
- [ ] Update social links tim ke profil yang benar
- [ ] Tambah field `description` singkat di setiap proyek JSON
- [ ] Fix `ProjectDetail` fallback — redirect ke `/projects` kalau ID tidak ketemu

**0C — SEO & Meta**
- [ ] Tambah meta description per halaman
- [ ] Tambah Open Graph tags (title, description, image) — penting untuk share WA/IG
- [ ] Tambah canonical URL
- [ ] Update `<title>` tag setiap halaman agar spesifik

**0D — UI Polish**
- [ ] Implementasi skeleton loading (ganti spinner biasa)
- [ ] Custom form validation dengan error messages Bahasa Indonesia
- [ ] Tambah back-to-top button
- [ ] Submit modal: tambah field kategori dan tech stack

**0E — Cleanup Teknis**
- [ ] Hapus dependensi tidak terpakai: `better-sqlite3`, `express`, `@google/genai`
- [ ] Tambah `ProjectDetail` 404 redirect yang proper
- [ ] Audit haptics utility

**Deliverable:** Platform yang tidak memalukan kalau di-share ke komunitas

---

### PHASE 1 — Backend & Submit Nyata *(Minggu 3–6)*
**Goal:** Form submit proyek benar-benar terkirim dan tersimpan

**Pilihan implementasi (dari mudah ke susah):**

**Opsi A — No-Code Backend (cepat, gratis):**
- Submit proyek → Google Form embed atau Airtable form
- Contact form → Formspree / EmailJS
- Review proyek secara manual

**Opsi B — Supabase (recommended untuk scale):**
- Setup Supabase project
- Tabel `projects` (id, title, category, summary, repo_url, status, submitted_at)
- Tabel `contact_submissions` (id, name, email, message, created_at)
- `projectService.ts` sudah punya komentar Supabase — tinggal uncomment
- `Contact.tsx` sudah punya komentar Supabase — tinggal uncomment
- Status proyek: `PENDING → REVIEWED → PUBLISHED / REJECTED`
- Email notifikasi via Resend

**Deliverable:** Submit proyek beneran tersimpan, ada notif email ke admin

---

### PHASE 2 — Auth & Profile *(Minggu 7–12)*
**Goal:** User punya identitas di platform

**Fitur:**
- Register / Login (email + Google OAuth via Supabase Auth)
- Profile page: nama, foto, bio, GitHub/LinkedIn/IG
- Dashboard: "Proyek Saya"
- Edit profil
- Public profile page (`/user/username`)

**Tech:**
- Auth: Supabase Auth (terintegrasi dengan DB yang dipilih di Phase 1)
- Storage: Supabase Storage untuk avatar

**Deliverable:** User bisa punya akun dan lihat proyek mereka sendiri

---

### PHASE 3 — Project System Full *(Minggu 13–20)*
**Goal:** Submit proyek jadi fitur fully-functional dengan workflow kurasi

**Fitur:**
- Submit form lebih lengkap (nama, deskripsi, kategori, tags, repo, live demo, screenshot)
- Upload thumbnail proyek (Supabase Storage)
- Admin panel sederhana untuk kurasi
- Edit proyek oleh pemilik
- Delete proyek (soft delete)
- Project detail page versi dinamis (bukan JSON statis lagi)

**Deliverable:** Full submit-to-publish workflow

---

### PHASE 4 — Discovery & Engagement *(Bulan 5–8)*
**Goal:** Visitor bisa explore dan ada alasan untuk balik lagi

**Fitur:**
- Search full-text (PostgreSQL tsvector)
- Filter: kategori, tech stack, tahun
- Sort: terbaru, terpopuler
- Like / Bookmark proyek
- View counter
- "Trending This Week" section
- Tag system (#react #open-source #mobile)
- Analytics: Vercel Analytics

**Deliverable:** Platform yang bisa di-explore dan engaging

---

### PHASE 5 — Community Features *(Bulan 9–12)*
**Goal:** Dari showcase ke komunitas sesungguhnya

**Fitur:**
- Komentar di proyek (threaded)
- Follow developer
- Feed: update dari yang kamu follow
- Notifikasi (in-app + email digest)
- "Cari Kolaborator" tag
- DM atau link ke kontak eksternal

---

### PHASE 6 — Growth & Ecosystem *(Bulan 12+)*
- Blog/Wiki komunitas
- Event showcase (hackathon, demo day)
- OurCode badge untuk proyek featured
- API publik
- Integrasi GitHub lebih dalam (auto-sync stats)
- Leaderboard kontributor

---

## TECH STACK TARGET (FINAL)

```
Frontend:   Vite + React 19 (pertahankan yang ada)
Styling:    Tailwind CSS v4 (pertahankan yang ada)
Animation:  GSAP 3 (pertahankan yang ada)
Backend:    Supabase (DB + Auth + Storage + Realtime)
Email:      Resend (3k email/bulan gratis)
Hosting:    Vercel (sudah ada)
Search:     PostgreSQL full-text → Algolia (kalau scale)
Analytics:  Vercel Analytics
```

---

## METRICS SUKSES

| Phase | KPI | Target |
|---|---|---|
| Phase 0 | Zero bug kritis, meta tags lengkap | 100% |
| Phase 1 | Submit proyek beneran tersimpan | Sebelum launch publik |
| Phase 2 | Registered users | 50+ dalam 1 bulan |
| Phase 3 | Submitted projects | 20+ dalam 2 bulan |
| Phase 4 | Monthly Active Users | 200+ |
| Phase 5 | Return visit rate | >40% |

---

## RISIKO & MITIGASI

| Risiko | Probabilitas | Mitigasi |
|---|---|---|
| Spam submission | Tinggi | Kurasi manual + honeypot field + rate limiting |
| Low retention | Tinggi | Email digest, konten fresh, Discord aktif |
| Scope creep | Tinggi | Phase-based, ship per fase, task.md jadi pegangan |
| Branding confusion (OurCode vs OurCreativity) | Sudah terjadi | Fix di Phase 0 — seragamkan semua copy |
| Data proyek tidak update | Sedang | Migrasi dari JSON statis ke Supabase di Phase 1 |
| Foto tim tidak lengkap | Sudah terjadi | Fix di Phase 0 — minta foto asli dari semua anggota |

---

## COMPETITIVE LANDSCAPE

| Platform | Kelebihan | Kekurangan vs kita |
|---|---|---|
| GitHub | Universal | Bukan Indonesian community, tidak kurated showcase |
| Dev.to | Artikel bagus | Fokus artikel, bukan proyek showcase |
| Showwcase | Mirip konsep | English, bukan lokal |
| Behance | Visual strong | Bukan untuk developer |
| **OurCode** | **Lokal, Bahasa Indonesia, proyek-first** | Masih dibangun |

---

## TIMELINE VISUAL

```
Sekarang    │██ Phase 0 (Fix Bug) ─────────────────────────────│
Bulan 1-2   │              ████ Phase 1 (Backend Submit) ───────│
Bulan 2-3   │                        ████ Phase 2 (Auth) ───────│
Bulan 3-5   │                               ████████ Phase 3 (Projects Full)
Bulan 5-8   │                                          Phase 4 (Discovery)
Bulan 9-12  │                                                   Phase 5 (Community)
Bulan 12+   │                                                             Phase 6
```

---

> **Prinsip Utama:** Ship fast, iterate faster. Jangan tunggu perfect — 10 user aktif lebih berharga dari 1000 user yang cuma lihat-lihat.

> **Prinsip Teknis:** Jangan hapus yang sudah jalan. Semua animasi, layout, dan komponen yang ada sudah polished — tinggal koneksikan ke data nyata dan beresin bug-nya.
