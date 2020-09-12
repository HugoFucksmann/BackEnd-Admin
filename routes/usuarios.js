/*
Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  validarJWT,
  validarAdmin,
  validarAdmin_o_MismoUsuario,
} = require("../middlewares/validar-jwt");

const router = Router();


router.get( '/', validarJWT, getUsuarios);


router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email','El Email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
); //* path, middleware( validaciones ), controlador



router.put(
  "/:id",
  [
    validarJWT,
    validarAdmin_o_MismoUsuario,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El Email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete( '/:id',
    validarJWT, 
    validarAdmin,
    borrarUsuario
);


module.exports = router;