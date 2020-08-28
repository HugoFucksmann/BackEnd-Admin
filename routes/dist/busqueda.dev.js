"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var _require3 = require('../middlewares/validar-campos'),
    validarCampos = _require3.validarCampos;

var _require4 = require('../middlewares/validar-jwt'),
    validarJWT = _require4.validarJWT;

var _require5 = require('../controllers/busqueda'),
    getTodo = _require5.getTodo,
    getDocumentosColeccion = _require5.getDocumentosColeccion;

var router = Router();
router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);
module.exports = router;