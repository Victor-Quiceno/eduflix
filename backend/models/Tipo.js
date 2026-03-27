const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    nombre: { type: String, required: true }, // Ej: Película o Serie
    descripcion: { type: String },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = model('Tipo', TipoSchema);