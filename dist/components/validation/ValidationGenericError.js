"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationGenericError = function ValidationGenericError(_ref) {
  var message = _ref.message;
  return _react.default.createElement("div", {
    className: "__rjfe__"
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "exclamation-triangle",
    className: "has-text-danger"
  }), "\xA0", _react.default.createElement("strong", {
    className: "has-text-danger"
  }, message));
};

ValidationGenericError.propTypes = {
  message: _propTypes.default.string.isRequired
};
var _default = ValidationGenericError;
exports.default = _default;