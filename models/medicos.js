const { Schema, model } = require('mongoose');



const MedicosSchema = Schema({

    nombre:{
        required: true,
        type: String,
    },
    img:{
        type: String,
    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,  // type especial que indica que este doc va a tener relacion con otro (ref)
        ref: 'Usuario',
    },
    hospitales:{
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospitales',
    }
},{ colection: 'medicos' });

//para cambiar algun parametro, config global (ej: _id por id)
MedicosSchema.method('toJSON', function(){

   const { __v, ...Object } = this.toObject();
   
   return Object;
})


module.exports = model( 'Medicos', MedicosSchema );