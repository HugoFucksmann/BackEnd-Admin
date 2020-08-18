const mongoose = require('mongoose');

//resuelve una promesa (async propio de js para tratar promesas de forma asincronica)
const dbConnection = async() => {

    try{
        
        await mongoose.connect( process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB online');

    }catch(error){

        console.log(error);
        throw Error('error a la hora de iniciar la bbdd');
    }


}


module.exports = {
    dbConnection
}