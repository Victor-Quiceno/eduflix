const Director = require('../models/Director');
const { request, response } = require('express');

const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const createDirector = async (req = request, res = response) => {
    try {
        const { nombre, estado } = req.body;
        let director = new Director({ nombre, estado });
        director = await director.save();
        res.status(201).json(director);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const updateDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        datos.fechaActualizacion = new Date();

        const director = await Director.findByIdAndUpdate(id, datos, { new: true });
        if (!director) return res.status(404).json({ msg: 'Director no encontrado' });
        res.json(director);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const director = await Director.findByIdAndDelete(id);
        if (!director) return res.status(404).json({ msg: 'Director no encontrado' });
        res.json({ msg: 'Director eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { getDirectores, createDirector, updateDirector, deleteDirector };