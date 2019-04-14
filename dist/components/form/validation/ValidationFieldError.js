"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormControlHint = _interopRequireDefault(require("../helpers/FormControlHint"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationFieldError = function ValidationFieldError(_ref) {
  var id = _ref.id;
  return _react.default.createElement("span", {
    className: "has-text-danger"
  }, _react.default.createElement(_util.Icon, {
    icon: "exclamation-circle"
  }), "\xA0Error rendering Field with ID: ", id, _react.default.createElement(_FormControlHint.default, {
    text: "Check console for additional details.",
    className: "is-danger"
  }));
};

ValidationFieldError.propTypes = {
  id: _propTypes.default.string.isRequired
};
var _default = ValidationFieldError;
exports.default = _default;