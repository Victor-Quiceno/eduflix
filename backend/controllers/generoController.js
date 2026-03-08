const Genero = require('../models/Genero');
const { request, response } = require('express');

// GET - Listar todos los géneros
const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.find();
        res.json(generos);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// POST - Crear un nuevo género
const createGenero = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;

        let genero = new Genero();
        genero.nombre = nombre;
        genero.descripcion = descripcion;
        genero.fechaCreacion = new Date();
        genero.fechaActualizacion = new Date();

        genero = await genero.save();
        res.status(201).json(genero);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// PUT - Editar
const updateGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        datos.fechaActualizacion = new Date();

        const genero = await Genero.findByIdAndUpdate(id, datos, { new: true });
        if (!genero) return res.status(404).json({ msg: 'Género no encontrado' });
        res.json(genero);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// DELETE - Borrar
const deleteGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByIdAndDelete(id);
        if (!genero) return res.status(404).json({ msg: 'Género no encontrado' });
        res.json({ msg: 'Género eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { getGeneros, createGenero, updateGenero, deleteGenero };