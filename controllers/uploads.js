const fs = require('fs');
const path = require('path');
const { response }  =   require('express');
const { v4: uuidv4 } =  require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-img');



const fileUploads = ( req, res=response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    try {

        //validar tipos
        const tiposValidos = ['hospitales','medicos','usuarios'];
        if( !tiposValidos.includes(tipo) ){
            return res.status(400).json({
                ok: false,
                msg: 'No es un medico, usuario u hospital'
            });
        }

        //validar que exista un archivo
        if ( !req.files || Object.keys(req.files).length === 0 ) {
            return res.status(400).json({
                ok: false,
                msg: 'No files were uploaded.'
            });
        }

        

        //prosesar la img...

        const file = req.files.imagen; //files gracias al middleware
        
        const nombreCortado = file.name.split('.'); //
        
        const extensionArchivo = nombreCortado [nombreCortado.length - 1] ; //capturamos la extencion .jpg .png


        //validar la extension
        const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'png'];
        if( !extensionesValidas.includes(extensionArchivo) ){
            return res.status(400).json({
                ok: false,
                msg: 'No es una extension valida'
            });
        }

        //Generar nombre del archivo
        const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

        //Path para guardar la img
        const path = `./uploads/${ tipo }/${ nombreArchivo }`;

        //Mover la imagen
        file.mv( path, (err) => {
            if (err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la imagen'
                });
            }

            // Actualizar base de datos
            actualizarImagen( tipo, id, path, nombreArchivo );
        
            res.json({
                ok: true,
                msg: 'archivo subido con exito',
                nombreArchivo
            });
        });
        


        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error que no deberia pasar'
        })
    }
}


const retornaImagen = ( req, res=response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    //imagen por defecto
    if ( fs.existsSync( pathImg ) ) {

        res.sendFile( pathImg );
    }else{

        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );

        res.sendFile( pathImg );

    }


}




module.exports = {
    fileUploads,
    retornaImagen
}