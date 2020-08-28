"use strict";

var _require = require('express'),
    Router = _require.Router;

var fileUpload = require('express-fileupload');

var _require2 = require('../middlewares/validar-jwt'),
    validarJWT = _require2.validarJWT;

var _require3 = require('../controllers/uploads'),
    fileUploads = _require3.fileUploads,
    retornaImagen = _require3.retornaImagen;

var router = Router(); //implementacion middleware para subir archivos 

router.use(fileUpload());
router.put('/:tipo/:id', validarJWT, fileUploads);
router.get('/:tipo/:foto', retornaImagen);
module.exports = router;