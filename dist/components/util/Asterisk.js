"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Asterisk = function Asterisk(_ref) {
  var size = _ref.size,
      message = _ref.message;
  return _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "asterisk",
    title: message || 'Validation Error',
    className: "has-text-danger"
  });
};

Asterisk.propTypes = {
  size: _propTypes.default.string,
  message: _propTypes.default.string
};
var _default = Asterisk;
exports.default = _default;