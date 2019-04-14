"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TYPE = 'text';

var Text = function Text(_ref) {
  var id = _ref.id,
      field = _ref.field,
      value = _ref.value,
      onUpdate = _ref.onUpdate,
      uiDecorators = _ref.uiDecorators,
      hasError = _ref.hasError;
  return _react.default.createElement("input", {
    name: id,
    id: id,
    className: "input ".concat(hasError ? 'is-danger' : ''),
    type: __getInputType(uiDecorators),
    value: value || '',
    onChange: onUpdate,
    placeholder: field.placeholder
  });
};

var __getInputType = function __getInputType(uiDecorators) {
  return _maybeBaby.default.of(uiDecorators).prop('component').prop('type').orElse(DEFAULT_TYPE).join();
};

Text.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  hasError: _propTypes.default.bool.isRequired,
  onUpdate: _propTypes.default.func.isRequired,
  value: _propTypes.default.string,
  uiDecorators: _propTypes.default.object
};
var _default = Text;
exports.default = _default;