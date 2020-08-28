"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('express'),
    response = _require.response; //! para acceder al autocompletado de VScode, igualamos res a response


var bcrypt = require('bcryptjs');

var Usuario = require('../models/usuario');

var _require2 = require('../helpers/jwt'),
    generarJWT = _require2.generarJWT; //para usar el await hay que estar en una funcion async


var getUsuarios = function getUsuarios(req, res) {
  var desde, _ref, _ref2, usuarios, total;

  return regeneratorRuntime.async(function getUsuarios$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          desde = Number(req.query.desde) || 0;
          console.log(desde); // {} para aplicar filtros

          /*const usuarios = await Usuario
                                  .find( {}, 'nombre email role google' )
                                  .skip( desde )
                                  .limit( 5 );
            const total = await Usuario.count();*/
          //otra forma propia de js

          _context.next = 4;
          return regeneratorRuntime.awrap(Promise.all([Usuario.find({}, 'nombre email role google img').skip(desde).limit(5), Usuario.countDocuments()]));

        case 4:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 2);
          usuarios = _ref2[0];
          total = _ref2[1];
          res.json({
            ok: true,
            usuarios: usuarios,
            total: total //uid: req.uid //id del usuario que realiza la peticion

          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

var crearUsuario = function crearUsuario(req) {
  var res,
      _req$body,
      email,
      password,
      existeEmail,
      usuario,
      salt,
      token,
      _args2 = arguments;

  return regeneratorRuntime.async(function crearUsuario$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : response;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Usuario.findOne({
            email: email
          }));

        case 5:
          existeEmail = _context2.sent;

          if (!existeEmail) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            ok: false,
            msg: 'El correo ya esta registrado'
          }));

        case 8:
          usuario = new Usuario(req.body); //* Encriptar contrasegna

          salt = bcrypt.genSaltSync(10);
          usuario.password = bcrypt.hashSync(password, salt); //* guarda usuario

          _context2.next = 13;
          return regeneratorRuntime.awrap(usuario.save());

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(generarJWT(usuario.id));

        case 15:
          token = _context2.sent;
          //! en express, .json() se puede llamar solo una vez en el bloque de codigo
          res.json({
            ok: true,
            usuario: usuario //token

          });
          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](2);
          console.log(_context2.t0);
          res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 19]]);
};

var actualizarUsuario = function actualizarUsuario(req) {
  var res,
      uid,
      usuarioDB,
      _req$body2,
      password,
      google,
      email,
      campos,
      existeEmail,
      usuarioActualizado,
      _args3 = arguments;

  return regeneratorRuntime.async(function actualizarUsuario$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : response;
          //TODO Validar token y comprobar si es el usuari ocorrecto
          uid = req.params.id;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Usuario.findById(uid));

        case 5:
          usuarioDB = _context3.sent;

          if (usuarioDB) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            ok: false,
            msg: 'No existe un usuario para ese id'
          }));

        case 8:
          //* Actualizaciones
          //?F1 ------------------------------------------

          /*const campos = req.body;
          delete campos.password;
          delete campos.google;
            if ( usuarioDB === req.body.email ){
              delete campos.email;
              //* en caso de que no se quiera actualizar el email, para que no choque la validacion
          }else{
                const existeEmail = await Usuario.findOne({ email: req.body.email });
                if( existeEmail ){
                  return res.status(400).json({
                      ok: false,
                      msg: 'Ya existe un usuario con ese email'
                    })
              }
          }*/
          //?F2 -------------------------------------------
          _req$body2 = req.body, password = _req$body2.password, google = _req$body2.google, email = _req$body2.email, campos = _objectWithoutProperties(_req$body2, ["password", "google", "email"]);

          if (!(usuarioDB.email !== email)) {
            _context3.next = 15;
            break;
          }

          _context3.next = 12;
          return regeneratorRuntime.awrap(Usuario.findOne({
            email: email
          }));

        case 12:
          existeEmail = _context3.sent;

          if (!existeEmail) {
            _context3.next = 15;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con ese email'
          }));

        case 15:
          campos.email = email; //?--------------------------------------------

          _context3.next = 18;
          return regeneratorRuntime.awrap(Usuario.findByIdAndUpdate(uid, campos, {
            "new": true
          }));

        case 18:
          usuarioActualizado = _context3.sent;
          //* {new:} para que siempre regrese el nuevo resultado, en mongoo
          res.json({
            ok: true,
            usuario: usuarioActualizado
          });
          _context3.next = 26;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0);
          res.status(500).json({
            ok: false,
            msg: 'Error inesperadoo'
          });

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 22]]);
};

var borrarUsuario = function borrarUsuario(req) {
  var res,
      uid,
      usuarioDB,
      _args4 = arguments;
  return regeneratorRuntime.async(function borrarUsuario$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : response;
          uid = req.params.id;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Usuario.findById(uid));

        case 5:
          usuarioDB = _context4.sent;

          if (usuarioDB) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            ok: false,
            msg: 'No existe un usuario para ese id'
          }));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(Usuario.findOneAndDelete(uid));

        case 10:
          res.json({
            ok: true,
            msg: 'usuario borrado'
          });
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0);
          res.status(500).json({
            ok: false,
            msg: 'error al elimiar usuario'
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 13]]);
};

module.exports = {
  getUsuarios: getUsuarios,
  crearUsuario: crearUsuario,
  actualizarUsuario: actualizarUsuario,
  borrarUsuario: borrarUsuario
};