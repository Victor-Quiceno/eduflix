const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        // Se intenta conectar a MongoDB usando la variable de entorno
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error('Error conectando a Mongo:', error.message);
        process.exit(1); // Detiene la app si la BD falla
    }
}

module.exports = { getConnection };