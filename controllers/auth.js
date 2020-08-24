const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {

    //extraer email y pass
    const { email, password } = req.body;

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({ email });
        
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'email noo encontrado'
            })
        }


        //verificar password
        const validPassword = bcrypt.compareSync(  password, usuarioDB.password );
        if( !validPassword ){
            return res.status(404).json({
                ok: false,
                msg: 'password no valido'
            })
        }


        //Generar TOKEN - JWT
        const  token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            msg: 'todo ok!',
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    login
}