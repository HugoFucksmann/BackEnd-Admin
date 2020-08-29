"use strict";

var _require = require('google-auth-library'),
    OAuth2Client = _require.OAuth2Client;

var client = new OAuth2Client(process.env.GOOGLE_ID);

var googleVerify = function googleVerify(token) {
  var ticket, payload, name, email, picture;
  return regeneratorRuntime.async(function googleVerify$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

          }));

        case 2:
          ticket = _context.sent;
          payload = ticket.getPayload();
          name = payload.name, email = payload.email, picture = payload.picture;
          return _context.abrupt("return", {
            name: name,
            email: email,
            picture: picture
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  googleVerify: googleVerify
};