"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormControlTitle = function FormControlTitle(_ref) {
  var field = _ref.field,
      decorators = _ref.decorators;
  if (hideTitle(decorators)) return null;
  return _react.default.createElement("div", {
    className: "label",
    htmlFor: field.id
  }, field.title, "\xA0");
};

var hideTitle = function hideTitle(decorators) {
  return _maybeBaby.default.of(decorators).prop('hideControlLabel').isJust();
};

var _default = FormControlTitle;
exports.default = _default;
FormControlTitle.propTypes = {
  field: _propTypes.default.object.isRequired,
  instance: _propTypes.default.object.isRequired,
  decorators: _propTypes.default.object
};