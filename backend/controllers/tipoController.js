const Tipo = require('../models/Tipo');
const { request, response } = require('express');

const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await Tipo.find();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const createTipo = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;
        let tipo = new Tipo({ nombre, descripcion });
        tipo = await tipo.save();
        res.status(201).json(tipo);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const updateTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        datos.fechaActualizacion = new Date();

        const tipo = await Tipo.findByIdAndUpdate(id, datos, { new: true });
        if (!tipo) return res.status(404).json({ msg: 'Tipo no encontrado' });
        res.json(tipo);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findByIdAndDelete(id);
        if (!tipo) return res.status(404).json({ msg: 'Tipo no encontrado' });
        res.json({ msg: 'Tipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { getTipos, createTipo, updateTipo, deleteTipo };