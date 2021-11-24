const express = require('express');

const router = express.Router();

const TiposDocumento = require('../../controllers/tipos/tipoDocumento.controller');

router.get('/all', TiposDocumento.obtenerTiposDocumento);

module.exports = router;