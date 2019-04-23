"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Textarea = function Textarea(_ref) {
  var id = _ref.id,
      field = _ref.field,
      value = _ref.value,
      onUpdate = _ref.onUpdate,
      hasError = _ref.hasError;
  return _react["default"].createElement("textarea", {
    name: id,
    id: id,
    className: "textarea ".concat(hasError ? 'is-danger' : ''),
    type: "textarea",
    value: value || '',
    onChange: onUpdate,
    placeholder: field.placeholder
  });
};

Textarea.propTypes = {
  id: _propTypes["default"].string.isRequired,
  field: _propTypes["default"].object.isRequired,
  hasError: _propTypes["default"].bool.isRequired,
  value: _propTypes["default"].string,
  onUpdate: _propTypes["default"].func.isRequired
};
var _default = Textarea;
exports["default"] = _default;