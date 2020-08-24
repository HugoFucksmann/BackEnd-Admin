require('dotenv').config();
const express = require('express'); //equivale a import {} from ''
const cors = require('cors');
const { dbConnection } = require('./database/config');

//kaDTrq6BPiKMHlMt
//mean_user


//* ver orden
// crea el servidor de express, inicialiacion
const app = express();


//config cors
app.use(cors());


//Lectura y parseo del body
app.use( express.json() );


//base de datos
dbConnection();


//rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/login', require('./routes/auth') );


app.listen( process.env.PORT, () => {
    console.log( 'server iniciado en puerto ', process.env.PORT );
})
