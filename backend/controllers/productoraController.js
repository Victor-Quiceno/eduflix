const Productora = require('../models/Productora');
const { request, response } = require('express');

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find();
        res.json(productoras);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const createProductora = async (req = request, res = response) => {
    try {
        const { nombre, estado, slogan, descripcion } = req.body;
        let productora = new Productora({ nombre, estado, slogan, descripcion });
        productora = await productora.save();
        res.status(201).json(productora);

        const existeProductora = await Productora.findOne({ nombre: req.body.nombre });
        if (existeProductora) {
            return res.status(400).json({ msg: 'Ya existe una productora con ese nombre' });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// PUT - Editar una productora existente
const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params; // Capturar el ID de la URL
        const datosActualizados = req.body;
        datosActualizados.fechaActualizacion = new Date(); // Actualizar la fecha

        // Esta parte lo que hace es buscar la productora por su ID y actualizarla con los nuevos datos, devolviendo el documento actualizado
        const productora = await Productora.findByIdAndUpdate(id, datosActualizados, { new: true });

        if (!productora) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        res.json(productora);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { getProductoras, createProductora, updateProductora };