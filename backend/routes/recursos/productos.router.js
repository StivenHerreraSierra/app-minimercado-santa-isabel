const express = require('express')

const router = express.Router();

const Producto = require('../../controllers/recursos/producto.controller');

router.get("/all", Producto.getAll);
router.post("/add", Producto.agregarProductoVenta);

module.exports = router;