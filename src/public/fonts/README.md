# 📁 Folder Font Korporasi Kalbe (Kalbe Corporate Typography)

Folder ini disiapkan khusus untuk file-file **Kalbe Corporate Font**.
Semua file yang diletakkan di folder ini otomatis disajikan oleh server pada URL `/fonts/<nama-file>`.

---

## 🗂️ Daftar File Font yang Dibutuhkan

Silakan upload/letakkan 7 file font berikut ke folder `/src/public/fonts/`:

| Nama File Font | Deskripsi & Kegunaan |
| :--- | :--- |
| `KalbeSystem-Regular.ttf` | **Kalbe System (400)** - Paragraf teks, tabel, input form, dialog |
| `KalbeSystem-Medium.ttf` | **Kalbe System (500)** - Teks keterangan semi-tebal |
| `KalbeSystem-Bold.ttf` | **Kalbe System (700)** - Teks isi tebal & penekanan |
| `KalbeRounded-Regular.ttf` | **Kalbe Rounded (400)** - Subjudul, card title |
| `KalbeRounded-Medium.ttf` | **Kalbe Rounded (500)** - Tombol interaktif & navigasi |
| `KalbeRounded-Bold.ttf` | **Kalbe Rounded (700)** - Header utama (H1, H2, H3), judul modal |
| `KalbeGeometric-Bold.ttf` | **Kalbe Geometric (700)** - Angka statistik, timer, skor, leaderboard badge |

---

## ⚡ Fallback System Otomatis

Aplikasi telah dilengkapi dengan **fallback stack**:
`'Kalbe ...', 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif`
dan webfont **Inter (Google Fonts)**.

Jika file font korporasi belum diunggah, antarmuka web dan arena proyektor akan tetap tampil rapi dan elegan menggunakan *Inter*, lalu secara instan beralih ke tipografi resmi Kalbe begitu file `.ttf` diunggah ke folder ini.

---

## 🎨 Konfigurasi CSS

Konfigurasi `@font-face` dan styling global tersimpan di:
`/src/public/css/fonts.css`
