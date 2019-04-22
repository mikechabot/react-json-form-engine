"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var style = {
  display: 'flex',
  alignItems: 'center'
};
var regex = /^Error: (.+)$/m;

function parseAPICheckErrorMessage(error) {
  if (!error) return null;

  if (regex.test(error)) {
    var matches = regex.exec(error);

    if (matches) {
      return matches[1];
    }
  }

  return null;
}

var ValidationAPIError = function ValidationAPIError(_ref) {
  var error = _ref.error;
  var message = parseAPICheckErrorMessage(error);
  return _react["default"].createElement("div", {
    className: "__rjfe__ panel"
  }, _react["default"].createElement("div", {
    className: "panel-heading"
  }, _react["default"].createElement("div", {
    style: style
  }, _react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "exclamation-triangle",
    className: "has-text-danger"
  }), "\xA0", _react["default"].createElement("h3", null, message || 'Error initializing FormEngine'))));
};

ValidationAPIError.propTypes = {
  error: _propTypes["default"].object.isRequired
};
var _default = ValidationAPIError;
exports["default"] = _default;