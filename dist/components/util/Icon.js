"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(_ref) {
  var icon = _ref.icon,
      prefix = _ref.prefix,
      title = _ref.title,
      className = _ref.className;
  var iconPrefix = prefix || 'fas';
  return _react.default.createElement("span", {
    title: title
  }, _react.default.createElement("i", {
    className: "".concat(iconPrefix, " fa-").concat(icon, " ").concat(className || '')
  }));
};

Icon.propTypes = {
  icon: _propTypes.default.string.isRequired,
  classname: _propTypes.default.string
};
var _default = Icon;
exports.default = _default;