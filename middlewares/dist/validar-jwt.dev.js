"use strict";

var _require = require('express'),
    response = _require.response;

var jwt = require('jsonwebtoken');

var validarJWT = function validarJWT(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  var next = arguments.length > 2 ? arguments[2] : undefined;
  // Leer el token
  var token = req.header('x-token');

  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: 'no se encontro token'
    });
  }

  try {
    var _jwt$verify = jwt.verify(token, process.env.JWT_SECRET),
        uid = _jwt$verify.uid;

    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido'
    });
  }
};

module.exports = {
  validarJWT: validarJWT
};