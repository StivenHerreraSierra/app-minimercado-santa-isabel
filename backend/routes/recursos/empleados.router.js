const express = require('express')

const router = express.Router();

const Empleado = require('../../controllers/recursos/empleados/empleados.controller');

//End points de Empleados.
router.post("/add", Empleado.add);
router.get("/all", Empleado.getAll);
router.get("/:numeroDocumento", (req, res) => {
    res.send("Obtener empleado por numero de documento");
});
router.put("/update/:numeroDocumento", Empleado.update);
router.delete("/delete/:numeroDocumento", Empleado.delete);

module.exports = router;