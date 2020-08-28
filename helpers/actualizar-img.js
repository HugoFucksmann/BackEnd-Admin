const fs = require('fs'); //file sistem, de node para verificar si existe el path viejo

const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {

    
    if ( fs.existsSync( path )){
        //borrar la img anterior
        fs.unlinkSync( path );
    }
}

//al ser async devuelve promesa
const actualizarImagen = async ( tipo, id, path, nombreArchivo ) => {

    let pathViejo = '';

    switch( tipo ){
        
        case 'medicos':
            const medico = await Medico.findById(id);
            if ( !medico ){
                console.log('no se encontro medico con esa id');
                return false;

            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
           
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save()
            return true;

        break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if ( !hospital ){
                console.log('no se encontro hospital con esa id');
                return false;

            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
           
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save()
            return true;

        break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ){
                console.log('no se encontro usuario con esa id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ usuario.img }`;
           
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save()
            return true;

        break;
    }
    

}











module.exports = {
    actualizarImagen
}