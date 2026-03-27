# ====== ETAPA 1: Compilación (Build Stage) ======
# Usamos Node.js para instalar dependencias y compilar React con Vite
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos archivos de dependencias y las instalamos
COPY package*.json ./
RUN npm install

# Copiamos todo el código fuente y compilamos para producción
COPY . .
RUN npm run build

# ====== ETAPA 2: Servidor de producción (Serve Stage) ======
# Usamos Nginx (servidor web ultraligero) para servir los archivos estáticos generados
FROM nginx:alpine

# Copiamos los archivos compilados de la etapa anterior al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos nuestra configuración personalizada de Nginx (con proxy reverso)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 (HTTP estándar)
EXPOSE 80

# Nginx se auto-arranca con su propio comando
CMD ["nginx", "-g", "daemon off;"]
