"use strict";

var fs = require('fs'); //file sistem, de node para verificar si existe el path viejo


var Usuario = require('../models/usuario');

var Medico = require('../models/medicos');

var Hospital = require('../models/hospital');

var borrarImagen = function borrarImagen(path) {
  if (fs.existsSync(path)) {
    //borrar la img anterior
    fs.unlinkSync(path);
  }
}; //al ser async devuelve promesa


var actualizarImagen = function actualizarImagen(tipo, id, path, nombreArchivo) {
  var pathViejo, medico, hospital, usuario;
  return regeneratorRuntime.async(function actualizarImagen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pathViejo = '';
          _context.t0 = tipo;
          _context.next = _context.t0 === 'medicos' ? 4 : _context.t0 === 'hospitales' ? 17 : _context.t0 === 'usuarios' ? 30 : 43;
          break;

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(Medico.findById(id));

        case 6:
          medico = _context.sent;

          if (medico) {
            _context.next = 10;
            break;
          }

          console.log('no se encontro medico con esa id');
          return _context.abrupt("return", false);

        case 10:
          pathViejo = "./uploads/medicos/".concat(medico.img);
          borrarImagen(pathViejo);
          medico.img = nombreArchivo;
          _context.next = 15;
          return regeneratorRuntime.awrap(medico.save());

        case 15:
          return _context.abrupt("return", true);

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(Hospital.findById(id));

        case 19:
          hospital = _context.sent;

          if (hospital) {
            _context.next = 23;
            break;
          }

          console.log('no se encontro hospital con esa id');
          return _context.abrupt("return", false);

        case 23:
          pathViejo = "./uploads/hospitales/".concat(hospital.img);
          borrarImagen(pathViejo);
          hospital.img = nombreArchivo;
          _context.next = 28;
          return regeneratorRuntime.awrap(hospital.save());

        case 28:
          return _context.abrupt("return", true);

        case 30:
          _context.next = 32;
          return regeneratorRuntime.awrap(Usuario.findById(id));

        case 32:
          usuario = _context.sent;

          if (usuario) {
            _context.next = 36;
            break;
          }

          console.log('no se encontro usuario con esa id');
          return _context.abrupt("return", false);

        case 36:
          pathViejo = "./uploads/hospitales/".concat(usuario.img);
          borrarImagen(pathViejo);
          usuario.img = nombreArchivo;
          _context.next = 41;
          return regeneratorRuntime.awrap(usuario.save());

        case 41:
          return _context.abrupt("return", true);

        case 43:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  actualizarImagen: actualizarImagen
};