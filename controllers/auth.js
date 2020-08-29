const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');
const usuario = require('../models/usuario');



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

const googleSignIn = async( req, res=response ) => {

    const googleToken = req.body.token;

    const { name, email, picture } = await googleVerify( googleToken );

    //crear usuario a partir de googleSingIn
    const usuarioDB = await Usuario.findOne({email});
    let usuario;

    if (!usuarioDB){
        //si no existe el usuario en BD
        usuario = new Usuario({
            nombre: name,
            email,
            password: '@@@',
            img: picture,
            google: true
        });
    }else{
        //existe usuario
        usuario = usuarioDB;
        usuarioDB.google = true;
    }

    //guarda en BBDD
    await usuario.save();

    //Generar TOKEN - JWT
    const token = await generarJWT( usuario.id );
//-------------------------------------------------
    try {
        

        res.json({
            ok: true,
            msj: 'Google!',
            token
        })
        
    } catch (error) {

        res.status(401).json({
            ok: false,
            msj: 'token no es correcto o...'
            
        })
    }
}


const renewToken = async(req, res=response ) => {

    const uid = req.uid;

    //generar el TOKEN JWT
    const token = await generarJWT( uid );

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}