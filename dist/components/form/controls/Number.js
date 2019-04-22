"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Number = function Number(_ref) {
  var id = _ref.id,
      field = _ref.field,
      value = _ref.value,
      onUpdate = _ref.onUpdate,
      hasError = _ref.hasError;
  return _react.default.createElement("input", {
    className: "input ".concat(hasError ? 'is-danger' : ''),
    name: id,
    id: id,
    type: "number",
    value: value || '',
    max: field.max,
    min: field.min,
    onChange: onUpdate,
    placeholder: field.placeholder
  });
};

Number.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  onUpdate: _propTypes.default.func.isRequired,
  hasError: _propTypes.default.bool.isRequired,
  value: _propTypes.default.number
};
var _default = Number;
exports.default = _default;