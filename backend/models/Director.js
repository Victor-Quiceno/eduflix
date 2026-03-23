const { Schema, model } = require('mongoose'); // Esto es desestructuración para importar solo lo necesario de mongoose (Schema y model)

const DirectorSchema = Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    fechaCreacion: { type: Date, default: new Date() },
    fechaActualizacion: { type: Date, default: new Date() }
});

module.exports = model('Director', DirectorSchema);