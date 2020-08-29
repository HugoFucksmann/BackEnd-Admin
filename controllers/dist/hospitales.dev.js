"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('express'),
    response = _require.response;

var Hospital = require('../models/hospital');

var hospital = require('../models/hospital');

var getHospital = function getHospital(req) {
  var res,
      hospitales,
      _args = arguments;
  return regeneratorRuntime.async(function getHospital$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : response;
          _context.next = 3;
          return regeneratorRuntime.awrap(Hospital.find().populate('usuario', 'nombre img'));

        case 3:
          hospitales = _context.sent;
          res.json({
            ok: true,
            hospitales: hospitales
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var crearHospital = function crearHospital(req) {
  var res,
      uid,
      hospital,
      hospitalDB,
      _args2 = arguments;
  return regeneratorRuntime.async(function crearHospital$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : response;
          uid = req.uid; // se extrae del middleware validarToken

          hospital = new Hospital(_objectSpread({
            usuario: uid
          }, req.body));
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(hospital.save());

        case 6:
          hospitalDB = _context2.sent;
          res.json({
            ok: true,
            hospital: hospitalDB
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

var actualizarHospital = function actualizarHospital(req) {
  var res,
      hospitalId,
      uid,
      hospitalDB,
      cambiosHospital,
      hospitalActualizado,
      _args3 = arguments;
  return regeneratorRuntime.async(function actualizarHospital$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : response;
          hospitalId = req.params.id;
          uid = req.uid;
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Hospital.findById(hospitalId));

        case 6:
          hospitalDB = _context3.sent;

          if (hospitalDB) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            ok: false,
            msg: 'hospital no encontrado'
          }));

        case 9:
          //hospitalDB.nombre = req.body.nombre;
          cambiosHospital = _objectSpread({}, req.body, {
            usuario: uid
          });
          _context3.next = 12;
          return regeneratorRuntime.awrap(Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, {
            "new": true
          }));

        case 12:
          hospitalActualizado = _context3.sent;
          res.json({
            ok: true,
            hospitalActualizado: hospitalActualizado
          });
          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](3);
          console.log(_context3.t0);
          res.status(500).json({
            ok: false,
            msg: 'Error hsble con el admin'
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 16]]);
};

var borrarHospital = function borrarHospital(req) {
  var res,
      hospitalId,
      hospitalDB,
      _args4 = arguments;
  return regeneratorRuntime.async(function borrarHospital$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : response;
          hospitalId = req.params.id;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Hospital.findById(hospitalId));

        case 5:
          hospitalDB = _context4.sent;

          if (hospitalDB) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            ok: false,
            msg: 'hospital no encontrado'
          }));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(Hospital.findByIdAndDelete(hospitalId));

        case 10:
          res.json({
            ok: true,
            msg: 'hospital eliminado'
          });
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0);
          res.status(500).json({
            ok: false,
            msg: 'Error hsble con el admin'
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 13]]);
};

module.exports = {
  getHospital: getHospital,
  crearHospital: crearHospital,
  actualizarHospital: actualizarHospital,
  borrarHospital: borrarHospital
};