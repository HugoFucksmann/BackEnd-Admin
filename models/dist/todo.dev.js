"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var TodoSchema = Schema({
  usuario: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario' // type especial que indica que este doc va a tener relacion con otro (ref)

  },
  hospitales: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Hospitales' // type especial que indica que este doc va a tener relacion con otro (ref)

  },
  Medicos: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Medicos' // type especial que indica que este doc va a tener relacion con otro (ref)

  }
}, {
  collection: 'todo'
}); //para cambiar algun parametro, config global (ej: _id por id)

TodoSchema.method('toJSON', function () {
  var _this$toObject = this.toObject(),
      __v = _this$toObject.__v,
      Object = _objectWithoutProperties(_this$toObject, ["__v"]);

  return Object;
});
module.exports = model('Todo', TodoSchema);