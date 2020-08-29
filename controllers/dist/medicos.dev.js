"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('express'),
    response = _require.response;

var Medicos = require('../models/medicos');

var getMedicos = function getMedicos(req) {
  var res,
      medicos,
      _args = arguments;
  return regeneratorRuntime.async(function getMedicos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : response;
          _context.next = 3;
          return regeneratorRuntime.awrap(Medicos.find().populate('usuario', 'nombre img').populate('hospitales', 'nombre img'));

        case 3:
          medicos = _context.sent;
          res.json({
            ok: true,
            medicos: medicos
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var crearMedicos = function crearMedicos(req) {
  var res,
      uid,
      medicos,
      medicosDB,
      _args2 = arguments;
  return regeneratorRuntime.async(function crearMedicos$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : response;
          uid = req.uid; // se extrae del middleware validarToken

          medicos = new Medicos(_objectSpread({
            usuario: uid
          }, req.body));
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(medicos.save());

        case 6:
          medicosDB = _context2.sent;
          res.json({
            ok: true,
            medicos: medicosDB
          });
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);
          res.status(500).json({
            ok: false,
            msg: "error inesperado, hable con el administrador"
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

var actualizarMedicos = function actualizarMedicos(req) {
  var res,
      medicoId,
      medicoDB,
      cambiosMedico,
      medicoActualizado,
      _args3 = arguments;
  return regeneratorRuntime.async(function actualizarMedicos$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : response;
          medicoId = req.params.id; //const uid = req.uid;

          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Medicos.findById(medicoId));

        case 5:
          medicoDB = _context3.sent;

          if (medicoDB) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            ok: false,
            msg: 'medico no encontrado'
          }));

        case 8:
          //hospitalDB.nombre = req.body.nombre;
          cambiosMedico = _objectSpread({}, req.body);
          _context3.next = 11;
          return regeneratorRuntime.awrap(Medicos.findByIdAndUpdate(medicoId, cambiosMedico, {
            "new": true
          }));

        case 11:
          medicoActualizado = _context3.sent;
          res.json({
            ok: true,
            medico: medicoActualizado
          });
          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0);
          res.status(500).json({
            ok: false,
            msg: 'Error hsble con el admin'
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 15]]);
};

var borrarMedicos = function borrarMedicos(req) {
  var res,
      medicoId,
      medicosDB,
      _args4 = arguments;
  return regeneratorRuntime.async(function borrarMedicos$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : response;
          medicoId = req.params.id;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Medicos.findById(medicoId));

        case 5:
          medicosDB = _context4.sent;

          if (medicosDB) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            ok: false,
            msg: 'medico no encontrado'
          }));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(Medicos.findByIdAndDelete(medicoId));

        case 10:
          res.json({
            ok: true,
            msg: 'medico eliminado'
          });
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0);
          res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 13]]);
};

module.exports = {
  getMedicos: getMedicos,
  crearMedicos: crearMedicos,
  actualizarMedicos: actualizarMedicos,
  borrarMedicos: borrarMedicos
};