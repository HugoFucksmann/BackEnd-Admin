"use strict";

/*
Ruta: /api/usuarios
*/
var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var _require3 = require('../controllers/usuarios'),
    getUsuarios = _require3.getUsuarios,
    crearUsuario = _require3.crearUsuario,
    actualizarUsuario = _require3.actualizarUsuario,
    borrarUsuario = _require3.borrarUsuario;

var _require4 = require('../middlewares/validar-campos'),
    validarCampos = _require4.validarCampos;

var _require5 = require('../middlewares/validar-jwt'),
    validarJWT = _require5.validarJWT;

var router = Router();
router.get('/', validarJWT, getUsuarios);
router.post('/', [check('nombre', 'El nombre es obligatorio').not().isEmpty(), check('password', 'El password es obligatorio').not().isEmpty(), check('email', 'El Email es obligatorio').isEmail(), validarCampos], crearUsuario); //* path, middleware( validaciones ), controlador

router.put('/:id', [validarJWT, check('nombre', 'El nombre es obligatorio').not().isEmpty(), check('email', 'El Email es obligatorio').isEmail(), check('role', 'El role es obligatorio').not().isEmpty(), validarCampos], actualizarUsuario);
router["delete"]('/:id', validarJWT, borrarUsuario);
module.exports = router;