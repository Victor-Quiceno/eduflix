# Imagen base ligera de Node.js sobre Alpine Linux
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero solo los archivos de dependencias para aprovechar la caché de Docker
COPY package*.json ./

# Instalamos solo las dependencias de producción (sin devDependencies como nodemon)
RUN npm install --omit=dev

# Copiamos el resto del código fuente del backend
COPY . .

# Exponemos el puerto donde Express escucha
EXPOSE 4000

# Comando para arrancar el servidor
CMD ["node", "index.js"]
