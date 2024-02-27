const express = require('express');
const RegistroModel = require('../models/registro');

const router = express.Router();

router.post('/registro', async (req, res) => {
    try {
        const { Idusuario, email, password, idrol } = req.body;
        const response = await RegistroModel.registrarUsuario(Idusuario, email, password, idrol);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al registrar el usuario' });
    }
});

module.exports = router;
