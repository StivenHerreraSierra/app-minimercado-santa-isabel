const express = require('express')

const router = express.Router();

const Producto = require('../../controllers/recursos/producto.controller');

router.get("/all", Producto.getAll);
router.get("/all/:codigoVenta", Producto.getProductosVenta);
router.post("/add", Producto.agregarProductoVenta);

module.exports = router;