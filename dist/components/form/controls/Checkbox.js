"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function Checkbox(_ref) {
  var id = _ref.id,
      field = _ref.field,
      option = _ref.option,
      value = _ref.value,
      onUpdate = _ref.onUpdate;
  var icon = "".concat(value ? 'check-' : '', "square");
  return _react.default.createElement("div", {
    id: id,
    className: "control"
  }, _react.default.createElement("div", {
    className: "checkbox",
    onClick: function onClick() {
      return onUpdate(!value, id);
    }
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', icon]
  }), "\xA0", _react.default.createElement("span", null, _getTitle(option, field))));
};

function _getTitle(option, field) {
  if (option) return option.title;
  return field.title;
}

Checkbox.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object,
  option: _propTypes.default.object,
  value: _propTypes.default.bool,
  onUpdate: _propTypes.default.func.isRequired
};
var _default = Checkbox;
exports.default = _default;