# OurCode

Platform showcase proyek developer Indonesia, dibuat oleh komunitas [OurCreativity](https://ourcreativity.id).

OurCode bukan job board, bukan portofolio pribadi, dan bukan clone GitHub. Ini tempat developer lokal bisa pajang proyek mereka — dan komunitas bisa menemukannya, mempelajarinya, bahkan berkontribusi ke dalamnya.

---

## Kenapa Ada Platform Ini

Indonesia punya banyak developer bagus. Tapi karya mereka tersebar: ada yang di GitHub yang tidak ada yang tahu, ada yang cuma di-share di grup WA sekali terus tenggelam, ada yang sudah production tapi tidak pernah ditulis dengan proper.

OurCode coba jadi satu tempat yang curated — bukan semua proyek masuk, hanya yang sudah dikurasi tim. Bukan soal kesempurnaan kode, tapi soal ada cerita dan konteks di balik proyeknya.

---

## Tech Stack

| Bagian | Teknologi |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animasi | GSAP 3 + ScrollTrigger |
| Routing | React Router DOM v7 |
| Database | Supabase (PostgreSQL + RLS) |
| Hosting | Vercel |

---

## Cara Jalankan Lokal

Butuh Node.js versi 18 ke atas.

```bash
# Clone repo
git clone https://github.com/ourcreativity/ourkode.git
cd ourkode

# Install dependencies
npm install

# Salin contoh konfigurasi
cp .env.example .env

# Edit .env dan isi variabel Supabase (lihat bagian setup database)
# Kalau belum ada Supabase, biarkan kosong — app akan pakai data JSON lokal sebagai fallback

# Jalankan dev server
npm run dev
```

Buka `http://localhost:3000`.

---

## Setup Database (Supabase)

Kalau mau koneksi ke database beneran (bukan data JSON statis):

1. Buat akun di [supabase.com](https://supabase.com) dan buat project baru
2. Buka **SQL Editor** di dashboard Supabase
3. Salin isi file [`supabase/schema.sql`](supabase/schema.sql) dan jalankan
4. Ambil **Project URL** dan **anon/public key** dari Settings → API
5. Isi ke file `.env`:

```env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"
```

Kalau `.env` tidak diisi, app otomatis fallback ke data JSON di `src/data/` — jadi tetap bisa jalan untuk development.

---

## Struktur Proyek

```
ourkode/
├── docs/               # Dokumen perencanaan dan tracking
│   ├── plan.md         # Roadmap produk jangka panjang
│   └── task.md         # Checklist phase aktif
├── public/             # Aset statis
│   ├── ardellio.webp   # Foto tim
│   ├── flores.png      # Foto tim
│   └── logo.webp       # Logo OurCreativity
├── src/
│   ├── components/     # Komponen UI yang dipakai ulang
│   │   ├── CustomCursor.tsx
│   │   ├── Layout.tsx
│   │   ├── PageTransition.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/           # Data JSON statis (fallback saat Supabase tidak dikonfigurasi)
│   │   ├── projects.json
│   │   └── team.json
│   ├── lib/            # Konfigurasi library pihak ketiga
│   │   └── supabase.ts
│   ├── pages/          # Halaman-halaman aplikasi
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Projects.tsx
│   │   └── Team.tsx
│   ├── services/       # Logika fetch data
│   │   └── projectService.ts
│   ├── types/          # TypeScript type definitions
│   │   └── project.ts
│   └── utils/          # Utility functions
│       ├── cn.ts
│       └── haptics.ts
├── supabase/
│   └── schema.sql      # DDL tabel, RLS policies, dan seed data
├── .env.example        # Template variabel lingkungan
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Mau Ikut Berkontribusi?

Baca [`CONTRIBUTING.md`](CONTRIBUTING.md) dulu — ada panduan singkat cara submit bug, request fitur, atau kirim pull request.

Komunitas OurCreativity ada di beberapa tempat:

- **WhatsApp** — [Form registrasi komunitas](https://docs.google.com/forms/d/e/1FAIpQLSfMjeDv5PiKi97U9UaN-UmuhJLeJySpPDBDJET7xlKyVu_ZqA/viewform)
- **Discord** — [discord.gg/PvRSUHVaa9](https://discord.gg/PvRSUHVaa9)
- **Instagram** — [@oc.koding](https://instagram.com/oc.koding)

---

## Lisensi

Belum ditentukan secara resmi. Semua kode di repo ini dibuat oleh tim OurCreativity. Kalau mau pakai untuk proyek lain, tanya dulu ke tim.
