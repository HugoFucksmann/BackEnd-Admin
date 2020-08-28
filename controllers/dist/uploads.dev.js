"use strict";

var fs = require('fs');

var path = require('path');

var _require = require('express'),
    response = _require.response;

var _require2 = require('uuid'),
    uuidv4 = _require2.v4;

var _require3 = require('../helpers/actualizar-img'),
    actualizarImagen = _require3.actualizarImagen;

var fileUploads = function fileUploads(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  var tipo = req.params.tipo;
  var id = req.params.id;

  try {
    //validar tipos
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        ok: false,
        msg: 'No es un medico, usuario u hospital'
      });
    } //validar que exista un archivo


    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: 'No files were uploaded.'
      });
    } //prosesar la img...


    var file = req.files.imagen; //files gracias al middleware

    var nombreCortado = file.name.split('.'); //

    var extensionArchivo = nombreCortado[nombreCortado.length - 1]; //capturamos la extencion .jpg .png
    //validar la extension

    var extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'png'];

    if (!extensionesValidas.includes(extensionArchivo)) {
      return res.status(400).json({
        ok: false,
        msg: 'No es una extension valida'
      });
    } //Generar nombre del archivo


    var nombreArchivo = "".concat(uuidv4(), ".").concat(extensionArchivo); //Path para guardar la img

    var _path = "./uploads/".concat(tipo, "/").concat(nombreArchivo); //Mover la imagen


    file.mv(_path, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: 'Error al mover la imagen'
        });
      } // Actualizar base de datos


      actualizarImagen(tipo, id, _path, nombreArchivo);
      res.json({
        ok: true,
        msg: 'archivo subido con exito',
        nombreArchivo: nombreArchivo
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error que no deberia pasar'
    });
  }
};

var retornaImagen = function retornaImagen(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  var tipo = req.params.tipo;
  var foto = req.params.foto;
  var pathImg = path.join(__dirname, "../uploads/".concat(tipo, "/").concat(foto)); //imagen por defecto

  if (fs.existsSync(pathImg)) {
    res.sendfile(pathImg);
  } else {
    var _pathImg = path.join(__dirname, "../uploads/no-img.jpg");

    res.sendFile(_pathImg);
  }
};

module.exports = {
  fileUploads: fileUploads,
  retornaImagen: retornaImagen
};