const express = require('express');

const router = express.Router();

const Venta = require('../../controllers/recursos/venta.controller');

router.post('/add', Venta.add);
router.get('/obtener/:codigo', Venta.getVenta);
router.get('/listar', Venta.getVentas);
router.get('/listar/:filtro', Venta.getVentasFiltro);
router.get('/costo/:codigo', Venta.getCostoVenta);
router.delete('/eliminar/:venta', Venta.eliminarVenta);
router.put("/editar", Venta.editar);

module.exports = router;