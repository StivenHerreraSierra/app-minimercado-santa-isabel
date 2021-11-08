const express = require('express')

const router = express.Router();

const Empleado = require('../controllers/recursos/empleados/empleados.controller');

//End points de Empleados.
router.get("/empleados/all", Empleado.getAll);
router.get("/empleados/:cedula", (req, res) => {
    res.send("Obtener empleado por cédula");
});
router.post("/empleados/add", Empleado.add);
router.put("/empleados/update/:cedula", Empleado.update);
router.delete("/empleados/delete/:cedula", Empleado.delete);

module.exports = router;