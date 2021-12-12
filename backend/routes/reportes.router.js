const express = require('express')

const router = express.Router();

const Reporte = require('../controllers/reportes.controller');

router.get("/nomina-cargo", Reporte.nominaPorCargo);

module.exports = router;