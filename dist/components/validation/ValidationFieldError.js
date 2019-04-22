"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormControlHint = _interopRequireDefault(require("../form/util/FormControlHint"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ValidationFieldError = function ValidationFieldError(_ref) {
  var id = _ref.id;
  return _react["default"].createElement("span", {
    className: "has-text-danger"
  }, _react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "exclamation-triangle"
  }), "\xA0There was an error rendering field: \"", id, "\"", _react["default"].createElement(_FormControlHint["default"], {
    text: "Check console for additional details.",
    className: "is-danger"
  }));
};

ValidationFieldError.propTypes = {
  id: _propTypes["default"].string.isRequired
};
var _default = ValidationFieldError;
exports["default"] = _default;