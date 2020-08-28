const { response } = require('express'); //! para acceder al autocompletado de VScode, igualamos res a response
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



 //para usar el await hay que estar en una funcion async
const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    console.log(desde);
    // {} para aplicar filtros
    /*const usuarios = await Usuario
                            .find( {}, 'nombre email role google' )
                            .skip( desde )
                            .limit( 5 );

    const total = await Usuario.count();*/
    //otra forma propia de js
    const [usuarios, total] = await Promise.all([
        Usuario
            .find( {}, 'nombre email role google img' )
            .skip( desde )
            .limit( 5 ),
        
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
        //uid: req.uid //id del usuario que realiza la peticion
    });

} 



const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    
    try{

        const existeEmail = await Usuario.findOne({ email }); //* promesa

        if ( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);


        //* Encriptar contrasegna
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);

        
        //* guarda usuario
        await usuario.save();

        //Generar TOKEN - JWT
        const  token = await generarJWT( usuario.id );



        //! en express, .json() se puede llamar solo una vez en el bloque de codigo
        res.json({
          ok: true,
          usuario,
          //token
        });

    }catch(er){
        console.log(er);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

    

} 


const actualizarUsuario = async (req, res = response) => {

    //TODO Validar token y comprobar si es el usuari ocorrecto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario para ese id'
            });
        }

        //* Actualizaciones
        //?F1 ------------------------------------------
        /*const campos = req.body;
        delete campos.password;
        delete campos.google;

        if ( usuarioDB === req.body.email ){
            delete campos.email;
            //* en caso de que no se quiera actualizar el email, para que no choque la validacion
        }else{

            const existeEmail = await Usuario.findOne({ email: req.body.email });

            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'

                })
            }
        }*/
        //?F2 -------------------------------------------
        const {password, google, email, ...campos} = req.body;

        if( usuarioDB.email !== email ){

            const existeEmail = await Usuario.findOne({ email });

            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'

                })
            }
        }

        campos.email = email;

        //?--------------------------------------------
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true } ); //* {new:} para que siempre regrese el nuevo resultado, en mongoo



        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperadoo'
        })
    }
}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario para ese id'
            });
        }

        await Usuario.findOneAndDelete( uid );
        
        res.json({
            ok: true,
            msg: 'usuario borrado'
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'error al elimiar usuario'
            
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}