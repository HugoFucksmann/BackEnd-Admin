const jwt = require('jsonwebtoken');


const generarJWT = ( uid ) => {

    return new Promise( (res, rej) => {

        const payload = {
            uid,
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) =>{
    
            if (err){
                console.log(err);
                reject ( 'no se pudo generar el JWT' );
            }else {

                res( token )
            }
        });
    });

    
}



module.exports = {
    generarJWT
}