"use strict";

// 'api/hospitales'
var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var _require3 = require('../middlewares/validar-campos'),
    validarCampos = _require3.validarCampos;

var _require4 = require('../middlewares/validar-jwt'),
    validarJWT = _require4.validarJWT;

var _require5 = require('../controllers/hospitales'),
    getHospital = _require5.getHospital,
    crearHospital = _require5.crearHospital,
    actualizarHospital = _require5.actualizarHospital,
    borrarHospital = _require5.borrarHospital;

var router = Router();
router.get('/', getHospital);
router.post('/', [validarJWT, check('nombre', 'el nombre del hospital  es necesario').notEmpty(), validarCampos], crearHospital);
router.put('/:id', [], actualizarHospital);
router["delete"]('/:id', borrarHospital);
module.exports = router;