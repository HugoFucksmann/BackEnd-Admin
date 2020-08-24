const { Schema, model } = require('mongoose');



const HospitalSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    usuario:{
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
        // type especial que indica que este doc va a tener relacion con otro (ref)
    }
},{ collection: 'hospitales' });

//para cambiar algun parametro, config global (ej: _id por id)
HospitalSchema.method('toJSON', function(){

   const { __v, ...Object } = this.toObject();
   
   return Object;
})


module.exports = model( 'Hospitales', HospitalSchema );