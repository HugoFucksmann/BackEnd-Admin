"use strict";

require('dotenv').config();

var express = require('express'); //equivale a import {} from ''


var cors = require('cors');

var _require = require('./database/config'),
    dbConnection = _require.dbConnection; //kaDTrq6BPiKMHlMt
//mean_user
//* ver orden
// crea el servidor de express, inicialiacion


var app = express(); //config cors

app.use(cors()); //Lectura y parseo del body

app.use(express.json()); //base de datos

dbConnection(); // Directorio publico

app.use(express["static"]('public')); //rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));
app.listen(process.env.PORT, function () {
  console.log('server iniciado en puerto ', process.env.PORT);
});