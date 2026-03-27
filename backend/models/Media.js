const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: {
        type: String,
        required: [true, 'El serial es obligatorio'],
        unique: [true, 'El serial debe ser único']
    },
    titulo: { type: String, required: true },
    sinopsis: { type: String, required: true },
    url: {
        type: String,
        required: true,
        unique: true // La URL de la película debe ser única
    },
    imagen: { type: String, required: true }, // URL de la portada
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now },
    anhioEstreno: { type: Number, required: true },

    // RELACIONES (Foreign Keys estilo NoSQL) 
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    }
});

module.exports = model('Media', MediaSchema);