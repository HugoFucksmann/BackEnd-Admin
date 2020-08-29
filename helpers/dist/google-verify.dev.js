"use strict";

var _require = require('google-auth-library'),
    OAuth2Client = _require.OAuth2Client;

var client = new OAuth2Client(process.env.GOOGLE_ID);

var googleVerify = function googleVerify(token) {
  var ticket, payload, userid, name, email, picture;
  return regeneratorRuntime.async(function googleVerify$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

          }));

        case 3:
          ticket = _context.sent;
          payload = ticket.getPayload();
          userid = payload['sub'];
          console.log(payload);
          name = payload.name, email = payload.email, picture = payload.picture;
          return _context.abrupt("return", {
            name: name,
            email: email,
            picture: picture
          });

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 14:
          module.exports = {
            googleVerify: googleVerify
          };

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};