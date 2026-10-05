# 🚀 Panduan Deploy Meridian BI Dashboard ke Vercel

Dashboard Business Intelligence ini dibangun dengan Next.js 16 (App Router), TypeScript, Tailwind CSS, dan Recharts.

---

## 💻 Cara Menjalankan Lokal

Di terminal Mac:
```bash
cd "/Users/ares/Res Agent (Pers)/meridian-dashboard"
npm run dev
```
Buka browser di: [http://localhost:3000](http://localhost:3000)

---

## ☁️ Cara Deploy ke Vercel

### Opsi 1: Deploy Langsung via Vercel CLI (Paling Cepat)
1. Buka terminal di folder project:
   ```bash
   cd "/Users/ares/Res Agent (Pers)/meridian-dashboard"
   npx vercel
   ```
2. Ikuti instruksi login Vercel di terminal.
3. Saat ditanya `Set up and deploy?`, ketik `y`.
4. Untuk deploy ke production:
   ```bash
   npx vercel --prod
   ```

---

### Opsi 2: Deploy via GitHub (Auto-Deploy)
1. Buat repository baru di GitHub kamu (misal: `meridian-bi-dashboard`).
2. Hubungkan dan push kode:
   ```bash
   cd "/Users/ares/Res Agent (Pers)/meridian-dashboard"
   git add .
   git commit -m "feat: initial Meridian BI dashboard for Vercel"
   git remote add origin https://github.com/restaji/meridian-bi-dashboard.git
   git push -u origin main
   ```
3. Buka [vercel.com/new](https://vercel.com/new), pilih repository `meridian-bi-dashboard`, lalu klik **Deploy**.

---

## 🔒 Environment Variables (Opsional)
Jika ingin menghubungkan langsung dashboard Vercel ke API live VPS bot:
* `VPS_API_URL`: `http://43.173.33.248:3001` (jika VPS API aktif)
* `VPS_API_TOKEN`: `your-secret-token`

*Catatan: Tanpa environment variables sekalipun, dashboard sudah dilengkapi data snapshot riil dan berfungsi 100% out-of-the-box di Vercel.*
