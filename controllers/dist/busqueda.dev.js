"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('express'),
    response = _require.response;

var Usuario = require('../models/usuario');

var Hospitales = require('../models/hospital');

var Medicos = require('../models/medicos');

var getTodo = function getTodo(req) {
  var res,
      busqueda,
      regex,
      _ref,
      _ref2,
      usuarios,
      hospitales,
      medicos,
      _args = arguments;

  return regeneratorRuntime.async(function getTodo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : response;
          busqueda = req.params.busqueda;
          regex = new RegExp(busqueda, 'i'); // RegExp: ver, hace fleccible la busqueda 

          _context.next = 5;
          return regeneratorRuntime.awrap(Promise.all([Usuario.find({
            nombre: regex
          }), Hospitales.find({
            nombre: regex
          }), Medicos.find({
            nombre: regex
          })]));

        case 5:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 3);
          usuarios = _ref2[0];
          hospitales = _ref2[1];
          medicos = _ref2[2];

          try {
            res.json({
              ok: true,
              usuarios: usuarios,
              hospitales: hospitales,
              medicos: medicos
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              ok: false,
              msg: "error getTodo"
            });
          }

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getDocumentosColeccion = function getDocumentosColeccion(req) {
  var res,
      tabla,
      busqueda,
      regex,
      data,
      _args2 = arguments;
  return regeneratorRuntime.async(function getDocumentosColeccion$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : response;
          tabla = req.params.tabla;
          busqueda = req.params.busqueda;
          regex = new RegExp(busqueda, 'i'); // RegExp: ver, hace fleccible la busqueda 

          data = [];
          _context2.t0 = tabla;
          _context2.next = _context2.t0 === 'medicos' ? 8 : _context2.t0 === 'hospitales' ? 12 : _context2.t0 === 'usuarios' ? 16 : 20;
          break;

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Medicos.find({
            nombre: regex
          }).populate('usuario', 'nombre img').populate('hospital', 'nombre img'));

        case 10:
          data = _context2.sent;
          return _context2.abrupt("break", 21);

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(Hospitales.find({
            nombre: regex
          }).populate('usuario', 'nombre img'));

        case 14:
          data = _context2.sent;
          return _context2.abrupt("break", 21);

        case 16:
          _context2.next = 18;
          return regeneratorRuntime.awrap(Usuario.find({
            nombre: regex
          }));

        case 18:
          data = _context2.sent;
          return _context2.abrupt("break", 21);

        case 20:
          return _context2.abrupt("return", res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
          }));

        case 21:
          res.status(400).json({
            ok: false,
            resultado: data
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  getTodo: getTodo,
  getDocumentosColeccion: getDocumentosColeccion
};