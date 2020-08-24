// 'api/hospitales'
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospital, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();



router.get( '/', getHospital);


router.post( '/',
    [
        validarJWT,
        check('nombre', 'el nombre del hospital  es necesario').notEmpty(),
        validarCampos
    ],
    crearHospital
);



router.put( '/:id',
    [
        
    ],
    actualizarHospital
);

router.delete( '/:id',
   
    borrarHospital
);


module.exports = router;