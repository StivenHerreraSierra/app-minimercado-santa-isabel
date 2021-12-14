const express = require('express');

const router = express.Router();

const Contrato = require('../../controllers/recursos/contrato.controller');

router.post('/add', Contrato.add);
router.get('/cargos', Contrato.getCargos);
router.get('/estados', Contrato.getEstados);
router.get('/obtener/:codigo', Contrato.getContrato);
router.get('/listar', Contrato.getContratos);
router.get('/listar/:filtro', Contrato.getContratosFiltro);
router.delete('/eliminar/:contrato', Contrato.eliminarContrato);
router.put("/editar", Contrato.editar);

module.exports = router;