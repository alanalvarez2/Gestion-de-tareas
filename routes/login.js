const express = require('express');
const router = express.Router();
const Login = require('../models/login'); // Cambiar la ruta para retroceder un nivel y entrar en la carpeta models
const connection = require('../config/database'); // Importar la conexión desde la carpeta config

router.post('/login', (req, res) => {
    Login.login(connection, req, res); // Pasar la conexión, req y res como parámetros
});

module.exports = router;

