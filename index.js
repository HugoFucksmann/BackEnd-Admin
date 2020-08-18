require('dotenv').config();
const express = require('express'); //equivale a import {} from ''
const cors = require('cors');
const { dbConnection } = require('./database/config');

//kaDTrq6BPiKMHlMt
//mean_user



// crea el servidor de express, inicialiacion
const app = express();

//config cors
app.use(cors());

//base de datos
dbConnection();




//rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'hola mundo'
    })

} );




app.listen( process.env.PORT, () => {
    console.log( 'server iniciado en puerto ', process.env.PORT );
})
