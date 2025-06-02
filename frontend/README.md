# Concert Ticket App — React.js

Aplikasi pembelian tiket konser dengan **React.js**. Pengguna dapat **register**, **login**, **logout**, melihat daftar konser, membeli tiket, dan admin dapat mengelola konser serta user.

## 🚀 Features

- 🎤 Lihat Daftar Konser
- ➕ Tambah/Edit/Hapus Konser (Admin)
- 🎫 Beli Tiket Konser (User)
- 👤 Register & Login User
- 🔐 Token-based Authentication (JWT)
- HTTP request handled using **Axios**

## 🛠️ Tech Stack

- **React.js**
- **Axios** for HTTP requests to REST API
- **RESTful API** (Node.js/Express)

## 📦 Install & Run

### 📥 Clone this repo:

```bash
git clone https://github.com/mangopancake1/Cloud-Computing.git
cd Cloud-Computing
```

### ▶️ Jalankan Backend:

```bash
cd backend
npm install
npm run dev
```

### ▶️ Jalankan Frontend:

```bash
cd ../frontend
npm install
npm start
```

# Cara Deploy Frontend ke Google App Engine

## 1. Build Project

Pastikan sudah berada di folder `frontend`:

```sh
npm install
npm run build
```

## 2. Siapkan file `app.yaml`

Pastikan file `app.yaml` sudah ada di folder ini (lihat contoh di repo).

## 3. Deploy ke App Engine

Login ke Google Cloud:

```sh
gcloud auth login
```

Set project:

```sh
gcloud config set project [PROJECT_ID]
```

Deploy:

```sh
gcloud app deploy
```

## 4. Akses aplikasi

Setelah deploy selesai, akses aplikasi di:

```
https://[PROJECT_ID].appspot.com
```

**Catatan:**

- Pastikan sudah mengaktifkan App Engine di Google Cloud Console.
- Jika ada perubahan, ulangi langkah build dan deploy.
