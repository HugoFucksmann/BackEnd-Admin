const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospital = async ( req, res=response ) => {

    const hospitales = await Hospital.find().populate( 'usuario', 'nombre img' );

    res.json({
        ok: true,
        hospitales
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

const actualizarHospital = ( req, res=response ) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

const borrarHospital = ( req, res=response ) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}





module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}