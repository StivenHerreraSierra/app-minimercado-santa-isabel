const express = require('express')

const router = express.Router();

const Empleado = require('../../controllers/recursos/empleados/empleados.controller');

//End points de Empleados.
router.get("/all", Empleado.getAll);
router.get("/:cedula", (req, res) => {
    res.send("Obtener empleado por cédula");
});
router.post("/add", Empleado.add);
router.put("/update/:cedula", Empleado.update);
router.delete("/delete/:cedula", Empleado.delete);

module.exports = router;