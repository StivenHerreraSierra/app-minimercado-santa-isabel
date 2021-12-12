const express = require('express')

const router = express.Router();

const Cliente = require('../../controllers/recursos/clientes.controller');

//End points de Clientes.
router.post("/add", Cliente.add);
router.get("/all", Cliente.getAll);
router.get("/all/:filtro", Cliente.getAllFiltered);
router.get("/obtener/:numeroDocumento", Cliente.get);
router.put("/editar", Cliente.update);
router.delete("/delete/:numeroDocumento", Cliente.delete);

module.exports = router;