require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const path = require('path');

//kaDTrq6BPiKMHlMt
//mean_user


//* ver orden
// crea el servidor de express, inicialiacion
const app = express();


//config cors
app.use( cors() );


//Lectura y parseo del body
app.use( express.json() );


//base de datos
dbConnection();


// Directorio publico
app.use( express.static('public') );


//rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busqueda') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/upload', require('./routes/uploads') );

//ultimo para desplegar
app.get("*"),
  (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
  };

app.listen( process.env.PORT, () => {
    console.log( 'server iniciado en puerto ', process.env.PORT );
})
