"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('express'),
    response = _require.response;

var Hospital = require('../models/hospital');

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
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  res.json({
    ok: true,
    msg: 'actualizarHospital'
  });
};

var borrarHospital = function borrarHospital(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  res.json({
    ok: true,
    msg: 'borrarHospital'
  });
};

module.exports = {
  getHospital: getHospital,
  crearHospital: crearHospital,
  actualizarHospital: actualizarHospital,
  borrarHospital: borrarHospital
};