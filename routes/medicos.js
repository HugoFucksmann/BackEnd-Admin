// '/api/medicos'
// 'api/hospitales'
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controllers/medicos');

const router = Router();



router.get( '/', getMedicos);


router.post( '/',
    [
        validarJWT,
        check('nombre', 'el nombre del medico es obligatorio').notEmpty(),
        check('hospitales', 'el id del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedicos
);



router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'el nombre del medico es obligatorio').notEmpty(),
        //check('hospital', 'el id del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedicos
);

router.delete( '/:id',
    validarJWT,
    borrarMedicos
);


module.exports = router;
