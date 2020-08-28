const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospitales = require('../models/hospital');
const Medicos = require('../models/medicos');

const getTodo = async ( req, res=response ) => {


    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' ); // RegExp: ver, hace fleccible la busqueda 


    const [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospitales.find({ nombre: regex }),
        Medicos.find({ nombre: regex })
    ]);

    try {

        res.json({
            ok: true,
            usuarios,
            hospitales,
            medicos
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error getTodo"
        });
    }

   
}

const getDocumentosColeccion = async (req, res=response ) => {

    const tabla     = req.params.tabla;
    const busqueda  = req.params.busqueda;
    const regex     = new RegExp( busqueda, 'i' ); // RegExp: ver, hace fleccible la busqueda 

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medicos.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;

        case 'hospitales':
            data = await Hospitales.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;
            
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
                                
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })
    }

    res.status(400).json({
        ok: false,
        resultado: data
    });


}

module.exports = {
   getTodo,
   getDocumentosColeccion
}