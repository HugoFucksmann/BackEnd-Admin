"use strict";

// '/api/medicos'
// 'api/hospitales'
var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var _require3 = require('../middlewares/validar-campos'),
    validarCampos = _require3.validarCampos;

var _require4 = require('../middlewares/validar-jwt'),
    validarJWT = _require4.validarJWT;

var _require5 = require('../controllers/medicos'),
    getMedicos = _require5.getMedicos,
    crearMedicos = _require5.crearMedicos,
    actualizarMedicos = _require5.actualizarMedicos,
    borrarMedicos = _require5.borrarMedicos;

var router = Router();
router.get('/', getMedicos);
router.post('/', [validarJWT, check('nombre', 'el nombre del medico es obligatorio').notEmpty(), check('hospitales', 'el id del hospital debe ser valido').isMongoId(), validarCampos], crearMedicos);
router.put('/:id', [], actualizarMedicos);
router["delete"]('/:id', borrarMedicos);
module.exports = router;