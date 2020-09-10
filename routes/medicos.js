// '/api/medicos'
// 'api/hospitales'
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos, getMedicoById } = require('../controllers/medicos');

const router = Router();



router.get( '/',validarJWT, getMedicos);


router.post( '/',
    [
        validarJWT,
        check('hospitales', 'el id del hospital debe ser valido').isMongoId(),
        check('nombre', 'el nombre del medico es obligatorio').notEmpty(),
        validarCampos
    ],
    crearMedicos
);



router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'el nombre del medico es obligatorio').notEmpty(),
        check('hospitales', 'el id del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedicos
);

router.delete( '/:id',
    validarJWT,
    borrarMedicos
);

router.get( '/:id',
    validarJWT,
    getMedicoById
);


module.exports = router;
