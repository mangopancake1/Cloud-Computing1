# Gunakan image ringan
FROM node:20-alpine

# Set direktori kerja
WORKDIR /app

# Salin file dan install dependencies
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# EXPOSE port sesuai yang digunakan app.listen
EXPOSE 5010

# Jalankan aplikasi
CMD ["node", "index.js"]