const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = (req, res = response, next) => {

    // Leer el token
    const token = req.header('x-token');
    
    if ( !token ){
        return res.status(400).json({
            ok: false,
            msg: 'no se encontro token'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

const validarAdmin = async(req, res=response, next ) => {

    const uid = req.uid;
        
    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }else if( usuarioDB.role !== 'ADMIN_ROLE' ){
            return res.status(403).json({
              ok: false,
              msg: "No tienes privilegios para hacer eso wow",
            });
        }

        next();
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
    }
}


const validarAdmin_o_MismoUsuario = async (req, res = response, next) => {
  const uid = req.uid;
  const id = req.params.id; 

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    } else if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
      
        next();
    }else{
        return res.status(403).json({
          ok: false,
          msg: "No tienes privilegios para hacer eso wow",
        });
    }


  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};




module.exports = {
  validarJWT,
  validarAdmin,
  validarAdmin_o_MismoUsuario,
};