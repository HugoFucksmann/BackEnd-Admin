const { response } = require('express');
const Medicos = require('../models/medicos');

const getMedicos = async( req, res=response ) => {

    const medicos = await Medicos.find().populate( 'usuario', 'nombre img' ).populate('hospitales','nombre img');
    
    res.json({
        ok: true,
        medicos
    })
}

const crearMedicos = async ( req, res=response ) => {

    const uid = req.uid; // se extrae del middleware validarToken
    const medicos = new Medicos({
        usuario: uid,
        ...req.body
    });


    try {
        const medicosDB = await medicos.save();


        res.json({
            ok: true,
            medicos: medicosDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error inesperado, hable con el administrador"
        })
    }
}

const actualizarMedicos = async( req, res=response ) => {

    const medicoId = req.params.id;
    //const uid = req.uid;

    try {

        const medicoDB = await Medicos.findById( medicoId );

        if( !medicoDB ){
            return res.status(404).json({
                ok: false,
                msg: 'medico no encontrado'
            });
        }

        //hospitalDB.nombre = req.body.nombre;
        const cambiosMedico = {
            ...req.body,
           // usuario: uid
        }

        const medicoActualizado = await Medicos.findByIdAndUpdate( medicoId, cambiosMedico, {new: true} );
        
        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error hsble con el admin'
        })
    }
}

const borrarMedicos = async( req, res=response ) => {

    const medicoId = req.params.id;

    try {

        const medicosDB = await Medicos.findById( medicoId );

        if( !medicosDB ){
            return res.status(404).json({
                ok: false,
                msg: 'medico no encontrado'
            });
        }

        await Medicos.findByIdAndDelete( medicoId );
        
        res.json({
            ok: true,
            msg: 'medico eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        })
    }
}





module.exports = {
    getMedicos, 
    crearMedicos, 
    actualizarMedicos, 
    borrarMedicos
}