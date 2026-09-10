# 🎪 Educamp Interactive Games Hub

Platform game web interaktif untuk acara **Educamp / Outbound / Team Building** kantor. Didesain untuk multi-layar (Layar Arena Utama di Proyektor/TV dan Controller Tablet/HP untuk peserta) dengan dukungan bank soal cerdas berbasis **Google AI Studio (Gemini)**.

### 🎮 Koleksi Game:
1. **🌴 Panjat Pinang Virtual**: Game balapan menara manusia memanjat tiang pinang berpelumas oli dengan aturan dramatis *Total Wipeout* (salah jawab = runtuh semua ke tanah!).
2. *(Coming Soon)*: Berbagai variasi game team-building interaktif lainnya.

---

## 🚀 Panduan Menjalankan Secara Lokal (Lokal Net / LAN / WiFi Kantor)

1. **Buka terminal di folder project**:
   ```bash
   cd e:\SHP\Games\Educamp
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **(Opsional) Setel API Key Google AI Studio**:
   - Salin `.env.example` menjadi `.env`.
   - Masukkan `GEMINI_API_KEY` dari [Google AI Studio](https://aistudio.google.com).
   *(Catatan: API Key juga bisa langsung di-paste lewat browser di Admin Panel).*

4. **Jalankan Server**:
   ```bash
   npm start
   ```

5. **Akses dari Browser**:
   - **Lobby**: `http://localhost:3000/`
   - **Layar Arena (Tampilkan di TV / Proyektor)**: `http://localhost:3000/arena.html`
   - **Tablet Tim 1**: `http://localhost:3000/controller.html?team=team1`
   - **Tablet Tim 2**: `http://localhost:3000/controller.html?team=team2`
   - **Admin / Game Master**: `http://localhost:3000/admin.html`

> 💡 **Tips Akses Tablet via WiFi**:
> Hubungkan laptop dan tablet ke WiFi yang sama (atau Hotspot HP). Di tablet, buka alamat IP laptop, misalnya: `http://192.168.1.15:3000/controller.html`.

---

## ☁️ Panduan Hosting di Google Cloud Platform (GCP Cloud Run)

Project ini sudah dilengkapi dengan `Dockerfile` siap pakai yang dioptimalkan untuk GCP Cloud Run (mendukung WebSocket real-time dan auto-scale ke 0 saat idle).

### Langkah Deploy via Google Cloud CLI:
1. Pastikan Google Cloud SDK terpasang dan login:
   ```bash
   gcloud auth login
   gcloud config set project [NAMA-PROJECT-GCP-ANDA]
   ```

2. Deploy langsung dari source code ke Cloud Run:
   ```bash
   gcloud run deploy educamp-panjat-pinang \
     --source . \
     --region asia-southeast1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY="AIzaSy..."
   ```

3. Cloud Run akan memberikan URL publik HTTPS otomatis (misal: `https://educamp-panjat-pinang-xyz-as.a.run.app`). URL ini bisa langsung dibuka di proyektor dan seluruh tablet peserta melalui internet tanpa perlu setting port forwarding!

---

© 2026 Nandur Studio. All rights reserved.
