const express = require('express');

const router = express.Router();

const Contrato = require('../../controllers/recursos/contrato.controller');

router.post('/add', Contrato.add);
router.get('/cargos', Contrato.getCargos);
router.get('/listar', Contrato.getContratos);
router.delete('/eliminar/:contrato/:empleado', Contrato.eliminarContrato);

module.exports = router;