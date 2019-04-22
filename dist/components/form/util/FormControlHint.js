"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FormControlHint = function FormControlHint(_ref) {
  var text = _ref.text,
      icon = _ref.icon,
      className = _ref.className;
  var derivedClassName = className || 'has-text-grey-light';
  return _react["default"].createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    },
    className: "help ".concat(derivedClassName)
  }, _react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: icon || 'question-circle'
  }), "\xA0", text);
};

FormControlHint.propTypes = {
  text: _propTypes["default"].string.isRequired,
  icon: _propTypes["default"].string,
  className: _propTypes["default"].string
};
var _default = FormControlHint;
exports["default"] = _default;