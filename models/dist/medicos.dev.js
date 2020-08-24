"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var MedicosSchema = Schema({
  nombre: {
    required: true,
    type: String
  },
  img: {
    type: String
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    // type especial que indica que este doc va a tener relacion con otro (ref)
    ref: 'Usuario'
  },
  hospitales: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Hospitales'
  }
}, {
  colection: 'medicos'
}); //para cambiar algun parametro, config global (ej: _id por id)

MedicosSchema.method('toJSON', function () {
  var _this$toObject = this.toObject(),
      __v = _this$toObject.__v,
      Object = _objectWithoutProperties(_this$toObject, ["__v"]);

  return Object;
});
module.exports = model('Medicos', MedicosSchema);