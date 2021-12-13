const express = require('express')

const router = express.Router();

const Reporte = require('../controllers/reportes.controller');

router.get("/nomina-cargo", Reporte.nominaPorCargo);
router.get("/pedidos-estado", Reporte.cantidadPedidosEstado);
router.get("/compras-cliente", Reporte.totalCompradoPorClientes);
router.get("/ventas-mes", Reporte.ventasPorMes);
router.get("/medios-registro", Reporte.mediosFrecuentesRegistroPedidos);
router.get("/gastos-mes", Reporte.gastosPorMes);
router.get("/productos-categoria", Reporte.productosPorCategoria);

module.exports = router;