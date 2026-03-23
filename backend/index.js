const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga las variables del .env
const { getConnection } = require('./config/db');

const app = express();

// Middlewares básicos
app.use(cors()); // Permite peticiones cruzadas
app.use(express.json()); // Esto permite recibir JSON en el cuerpo de las solicitudes

// Conexión a BD
getConnection();

// Rutas de la API
app.use('/api/generos', require('./routes/genero'));
app.use('/api/directores', require('./routes/director'));
app.use('/api/productoras', require('./routes/productora'));
app.use('/api/tipos', require('./routes/tipo'));
app.use('/api/media', require('./routes/media'));

// Levantar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});