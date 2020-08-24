"use strict";

var jwt = require('jsonwebtoken');

var generarJWT = function generarJWT(uid) {
  return new Promise(function (res, rej) {
    var payload = {
      uid: uid
    };
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '12h'
    }, function (err, token) {
      if (err) {
        console.log(err);
        reject('no se pudo generar el JWT');
      } else {
        res(token);
      }
    });
  });
};

module.exports = {
  generarJWT: generarJWT
};