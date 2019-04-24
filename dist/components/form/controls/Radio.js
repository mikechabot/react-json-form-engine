"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _FormChildren = _interopRequireDefault(require("../FormField/FormChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isChecked(option, value, isEven) {
  if ((0, _isNil["default"])(value)) return false;
  if (option.id) return option.id === value;
  return isEven ? value : !value;
}

function getIcon(option, value, isEven) {
  return isChecked(option, value, isEven) ? 'dot-circle' : 'circle';
}

function renderOption(field, value, option, index, onUpdate) {
  var isEven = index % 2 === 0;
  return _react["default"].createElement("div", {
    key: index,
    className: "radio-option-container ".concat(index === 0 ? '' : field.inline ? 'm-l-sm' : ''),
    onClick: function onClick() {
      return onUpdate(option.id || isEven, field.id);
    }
  }, _react["default"].createElement("div", {
    className: "radio-option-label"
  }, _react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', getIcon(option, value, isEven)]
  }), "\xA0", _react["default"].createElement("div", null, option.title)), _react["default"].createElement(_FormChildren["default"], {
    field: option
  }));
}

var Radio = function Radio(_ref) {
  var id = _ref.id,
      value = _ref.value,
      field = _ref.field,
      onUpdate = _ref.onUpdate;
  return _react["default"].createElement("div", {
    id: id,
    className: field.inline ? 'flex-box' : 'flex-column'
  }, field.options.map(function (option, index) {
    return renderOption(field, value, option, index, onUpdate);
  }));
};

Radio.propTypes = {
  id: _propTypes["default"].string.isRequired,
  field: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].bool]),
  onUpdate: _propTypes["default"].func.isRequired,
  uiField: _propTypes["default"].object
};
var _default = Radio;
exports["default"] = _default;