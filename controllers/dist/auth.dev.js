"use strict";

var _require = require('express'),
    response = _require.response;

var bcrypt = require('bcryptjs');

var Usuario = require('../models/usuario');

var _require2 = require('../helpers/jwt'),
    generarJWT = _require2.generarJWT;

var _require3 = require('../helpers/googleVerify'),
    googleVerify = _require3.googleVerify;

var usuario = require('../models/usuario');

var login = function login(req) {
  var res,
      _req$body,
      email,
      password,
      usuarioDB,
      validPassword,
      token,
      _args = arguments;

  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : response;
          //extraer email y pass
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(Usuario.findOne({
            email: email
          }));

        case 5:
          usuarioDB = _context.sent;

          if (usuarioDB) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            ok: false,
            msg: 'email noo encontrado'
          }));

        case 8:
          //verificar password
          validPassword = bcrypt.compareSync(password, usuarioDB.password);

          if (validPassword) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            ok: false,
            msg: 'password no valido'
          }));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(generarJWT(usuarioDB.id));

        case 13:
          token = _context.sent;
          res.json({
            ok: true,
            msg: 'todo ok!',
            token: token
          });
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 17]]);
};

var googleSignIn = function googleSignIn(req) {
  var res,
      googleToken,
      _ref,
      name,
      email,
      picture,
      usuarioDB,
      usuario,
      token,
      _args2 = arguments;

  return regeneratorRuntime.async(function googleSignIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : response;
          googleToken = req.body.token;
          _context2.next = 4;
          return regeneratorRuntime.awrap(googleVerify(googleToken));

        case 4:
          _ref = _context2.sent;
          name = _ref.name;
          email = _ref.email;
          picture = _ref.picture;
          _context2.next = 10;
          return regeneratorRuntime.awrap(Usuario.findOne({
            email: email
          }));

        case 10:
          usuarioDB = _context2.sent;

          if (!usuarioDB) {
            //si no existe el usuario en BD
            usuario = new Usuario({
              nombre: name,
              email: email,
              password: '@@@',
              img: picture,
              google: true
            });
          } else {
            //existe usuario
            usuario = usuarioDB;
            usuarioDB.google = true;
          } //guarda en BBDD


          _context2.next = 14;
          return regeneratorRuntime.awrap(usuario.save());

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(generarJWT(usuario.id));

        case 16:
          token = _context2.sent;

          //-------------------------------------------------
          try {
            res.json({
              ok: true,
              msj: 'Google!',
              token: token
            });
          } catch (error) {
            res.status(401).json({
              ok: false,
              msj: 'token no es correcto o...'
            });
          }

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var renewToken = function renewToken(req) {
  var res,
      uid,
      token,
      _args3 = arguments;
  return regeneratorRuntime.async(function renewToken$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : response;
          uid = req.uid; //generar el TOKEN JWT

          _context3.next = 4;
          return regeneratorRuntime.awrap(generarJWT(uid));

        case 4:
          token = _context3.sent;
          res.json({
            ok: true,
            token: token
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  login: login,
  googleSignIn: googleSignIn,
  renewToken: renewToken
};