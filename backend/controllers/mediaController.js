const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');
const { request, response } = require('express');

// GET - Listar películas con sus relaciones usando populate() para traer los datos completos de género, director, etc.
const getMedia = async (req = request, res = response) => {
    try {
        // En MongoDB se usa populate() para hacer el equivalente a un JOIN de SQL.
        // Esto trae los datos completos del género, director, etc., y no solo su ID.
        const medias = await Media.find()
            .populate('genero', 'nombre estado')
            .populate('director', 'nombre estado')
            .populate('productora', 'nombre estado')
            .populate('tipo', 'nombre');

        res.json(medias);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// POST - Crear una película aplicando reglas de negocio
const createMedia = async (req = request, res = response) => {
    try {
        const { serial, url, genero, director, productora, tipo } = req.body;

        // 1. Validar unicidad (Requisito del PDF)
        const mediaExiste = await Media.findOne({ $or: [{ serial }, { url }] });
        if (mediaExiste) {
            return res.status(400).json({ msg: 'El serial o la URL ya están registrados.' });
        }

        // 2. Validar que el Género exista y esté ACTIVO
        const generoDB = await Genero.findById(genero);
        if (!generoDB || generoDB.estado !== 'Activo') {
            return res.status(400).json({ msg: 'El género no existe o está inactivo.' });
        }

        // 3. Validar que el Director exista y esté ACTIVO
        const directorDB = await Director.findById(director);
        if (!directorDB || directorDB.estado !== 'Activo') {
            return res.status(400).json({ msg: 'El director no existe o está inactivo.' });
        }

        // 4. Validar que la Productora exista y esté ACTIVA
        const productoraDB = await Productora.findById(productora);
        if (!productoraDB || productoraDB.estado !== 'Activo') {
            return res.status(400).json({ msg: 'La productora no existe o está inactiva.' });
        }

        // 5. Validar que el Tipo exista
        const tipoDB = await Tipo.findById(tipo);
        if (!tipoDB) {
            return res.status(400).json({ msg: 'El tipo no existe.' });
        }

        // Si pasa todas las validaciones, guardamos
        const media = new Media(req.body);
        await media.save();

        res.status(201).json(media);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// PUT - Editar una película
const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        datosActualizados.fechaActualizacion = new Date();

        const media = await Media.findByIdAndUpdate(id, datosActualizados, { new: true });

        if (!media) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }
        res.json(media);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// DELETE - Borrar una película
const deleteMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const media = await Media.findByIdAndDelete(id);

        if (!media) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }
        res.json({ msg: 'Película eliminada correctamente', media });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { getMedia, createMedia, updateMedia, deleteMedia };