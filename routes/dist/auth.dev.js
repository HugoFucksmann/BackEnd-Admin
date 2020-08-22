"use strict";

// path: '/api/login'
var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/auth'),
    login = _require2.login;

var _require3 = require('express-validator'),
    check = _require3.check;

var _require4 = require('../middlewares/validar-campos'),
    validarCampos = _require4.validarCampos;

var router = Router();
router.post('/', [check('email', 'El email es obligatorio').isEmail(), check('password', 'El password es obligatorio').not().isEmpty(), validarCampos], login);
module.exports = router;