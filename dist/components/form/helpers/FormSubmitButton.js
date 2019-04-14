"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormSubmitButton = function FormSubmitButton(_ref) {
  var onSubmit = _ref.onSubmit,
      label = _ref.label;
  return _react.default.createElement("button", {
    className: "button is-link",
    onClick: onSubmit
  }, label || 'Submit');
};

FormSubmitButton.propTypes = {
  onSubmit: _propTypes.default.func.isRequired,
  label: _propTypes.default.string
};
var _default = FormSubmitButton;
exports.default = _default;