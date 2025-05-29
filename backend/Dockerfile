# Gunakan image ringan
FROM node:20-alpine

# Set direktori kerja
WORKDIR /app

# Salin file dan install dependencies
COPY package*.json ./
RUN npm install --production

COPY . .

# EXPOSE port sesuai yang digunakan app.listen
EXPOSE 5005

# Jalankan aplikasi
CMD ["node", "index.js"]