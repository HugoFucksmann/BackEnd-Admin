"use strict";

// path: '/api/login'
var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/auth'),
    login = _require2.login,
    googleSignIn = _require2.googleSignIn,
    renewToken = _require2.renewToken;

var _require3 = require('express-validator'),
    check = _require3.check;

var _require4 = require('../middlewares/validar-campos'),
    validarCampos = _require4.validarCampos;

var _require5 = require('../middlewares/validar-jwt'),
    validarJWT = _require5.validarJWT;

var router = Router();
router.post('/', [check('email', 'El email es obligatorio').isEmail(), check('password', 'El password es obligatorio').not().isEmpty(), validarCampos], login);
router.post('/google', [check('token', 'El token de Google es obligatorio').notEmpty(), validarCampos], googleSignIn);
router.get('/renew', validarJWT, renewToken);
module.exports = router;