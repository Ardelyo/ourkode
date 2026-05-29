# Berkontribusi ke OurCode

Makasih udah mau bantu! Sebelum mulai, baca ini dulu biar waktumu tidak kebuang sia-sia.

---

## Sebelum Submit Apapun

Cek dulu issues dan pull request yang sudah ada. Mungkin yang mau kamu kerjakan sudah ada yang bahas atau sedang dikerjakan orang lain.

---

## Melaporkan Bug

Kalau nemu sesuatu yang rusak, buka issue baru. Tulis:

- Apa yang kamu lakukan
- Apa yang kamu harapkan terjadi
- Apa yang sebenarnya terjadi
- Browser dan OS yang kamu pakai

Tidak perlu format panjang-panjang. Yang penting cukup jelas buat tim bisa reproduce-nya.

---

## Request Fitur

Buka issue dengan label `enhancement`. Ceritakan:

- Masalah apa yang mau diselesaikan (bukan langsung solusinya)
- Kenapa fitur ini penting buat komunitas

Fitur yang terlalu kompleks atau menyimpang dari arah platform mungkin tidak akan diambil, tapi tetap akan dibaca dan didiskusikan.

---

## Kontribusi Kode

### Setup Awal

```bash
git clone https://github.com/ourcreativity/ourkode.git
cd ourkode
npm install
cp .env.example .env
npm run dev
```

### Alur Kerja

1. Fork repo ini ke akun GitHub kamu
2. Buat branch baru dari `main` dengan nama yang deskriptif:
   ```bash
   git checkout -b fix/project-detail-link
   git checkout -b feat/search-by-tech-stack
   ```
3. Kerjakan perubahanmu
4. Pastikan tidak ada TypeScript error:
   ```bash
   npm run lint
   ```
5. Commit dengan pesan yang jelas (lihat panduan commit di bawah)
6. Push dan buka pull request ke branch `main`

### Panduan Commit

Pakai format singkat tapi deskriptif:

```
fix: tombol kunjungi website di ProjectDetail sekarang dinamis
feat: tambah honeypot di form kontak untuk cegah spam
chore: pindahkan supabase_schema.sql ke folder supabase/
```

Prefix yang dipakai:
- `fix` — perbaikan bug
- `feat` — fitur baru
- `chore` — perapihan, refactor, update dependency
- `docs` — perubahan dokumentasi saja
- `style` — perubahan UI/CSS tanpa logika

### Hal yang Perlu Diperhatikan

- Jaga konsistensi gaya kode dengan yang sudah ada. Kalau ada komponen serupa, lihat dulu cara menulisnya sebelum bikin baru.
- Jangan sentuh `.env` — file itu diabaikan git dan tidak boleh di-commit.
- Animasi GSAP ada di dalam `useEffect` dengan cleanup `ctx.revert()`. Ikuti pola yang sama.
- Data proyek yang tampil di halaman diambil dari Supabase (kalau dikonfigurasi) atau dari `src/data/projects.json` sebagai fallback. Jangan hardcode data baru langsung di komponen.

---

## Menambah atau Mengedit Data Proyek

Data proyek ada di dua tempat:

1. **`src/data/projects.json`** — data statis untuk development lokal
2. **Tabel `projects` di Supabase** — data production

Kalau mau tambah proyek ke platform, jangan langsung edit file JSON atau insert ke database — kirim melalui form submit di halaman `/projects`. Tim akan mereview dan mempublikasikannya.

---

## Ada Pertanyaan?

Gabung ke Discord komunitas: [discord.gg/PvRSUHVaa9](https://discord.gg/PvRSUHVaa9)

Atau kirim pesan ke Instagram: [@oc.koding](https://instagram.com/oc.koding)
