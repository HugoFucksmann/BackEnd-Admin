const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUploads, retornaImagen } = require('../controllers/uploads');


const router = Router();

//implementacion middleware para subir archivos 
router.use(fileUpload());


router.put( '/:tipo/:id', validarJWT, fileUploads );

router.get( '/:tipo/:foto', retornaImagen );




module.exports = router;


