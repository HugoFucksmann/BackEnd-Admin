const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospital = async ( req, res=response ) => {

    

    const hospitales = await Hospital.find().populate( 'usuario', 'nombre img' );
    const total = await Hospital.countDocuments();

    res.json({
        ok: true,
        hospitales,
        total
    })
}

const crearHospital = async ( req, res=response ) => {


    const uid = req.uid; // se extrae del middleware validarToken
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    } );
    


    try {

        const hospitalDB = await hospital.save();



        res.json({
            ok: true,
            hospital: hospitalDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error inesperado, hable con el administrador"
        })
    }


    
}

const actualizarHospital = async( req, res=response ) => {

    const hospitalId = req.params.id;
    
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById( hospitalId );

        if( !hospitalDB ){
            return res.status(404).json({
                ok: false,
                msg: 'hospital no encontrado'
            });
        }

        //hospitalDB.nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalId, cambiosHospital, {new: true} );
        
        res.json({
            ok: true,
            hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error hsble con el admin'
        })
    }

}

const borrarHospital = async( req, res=response ) => {

    const hospitalId = req.params.id;

    try {

        const hospitalDB = await Hospital.findById( hospitalId );

        if( !hospitalDB ){
            return res.status(404).json({
                ok: false,
                msg: 'hospital no encontrado'
            });
        }

        await Hospital.findByIdAndDelete( hospitalId );
        
        res.json({
            ok: true,
            msg: 'hospital eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error hsble con el admin'
        })
    }
}



module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}