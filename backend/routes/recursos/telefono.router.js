const express = require('express');

const router = express.Router();

const Telefono = require('../../controllers/recursos/empleados/telefonoEmpleado.controller');

router.post('/add/:empleado', Telefono.addTelefono);
router.get('/listar/:empleado', Telefono.getTelefonosEmpleado);
router.put('/editar', Telefono.editarTelefono);

module.exports = router;