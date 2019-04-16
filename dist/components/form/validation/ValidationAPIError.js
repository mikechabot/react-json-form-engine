"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regex = /^Error: (.+)$/m;

var ValidationAPIError = function ValidationAPIError(_ref) {
  var error = _ref.error;
  var message = parseAPICheckErrorMessage(error);
  return _react.default.createElement("div", {
    className: "panel"
  }, _react.default.createElement("div", {
    className: "panel-heading"
  }, _react.default.createElement(_util.Flex, {
    alignItems: "center"
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "exclamation-triangle",
    className: "has-text-danger"
  }), "\xA0", _react.default.createElement("h3", null, message || 'Error initializing FormEngine'))));
};

var parseAPICheckErrorMessage = function parseAPICheckErrorMessage(error) {
  if (!error) return null;

  if (regex.test(error)) {
    var matches = regex.exec(error);

    if (matches) {
      return matches[1];
    }
  }

  return null;
};

ValidationAPIError.propTypes = {
  error: _propTypes.default.object.isRequired
};
var _default = ValidationAPIError;
exports.default = _default;