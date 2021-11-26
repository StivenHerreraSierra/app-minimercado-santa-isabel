const express = require('express');

const router = express.Router();

const Telefono = require('../../controllers/recursos/empleados/telefonoEmpleado.controller');

router.post('/add', Telefono.addTelefono);

module.exports = router;