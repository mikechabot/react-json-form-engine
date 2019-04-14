"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _FormChildren = _interopRequireDefault(require("../FormChildren"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function Radio(_ref) {
  var id = _ref.id,
      value = _ref.value,
      field = _ref.field,
      instance = _ref.instance,
      onUpdate = _ref.onUpdate;

  if (!field.options) {
    console.warn("".concat(field.type, " is missing required \"options\" (id: ").concat(id, ")"));
    return _react.default.createElement("span", null);
  }

  return _react.default.createElement(_util.Flex, {
    column: !field.inline,
    id: id
  }, _renderOptions(field, value, instance, onUpdate));
};

var _renderOptions = function _renderOptions(field, value, instance, onUpdate) {
  return field.options.map(_renderOption.bind(null, field, value, instance, onUpdate));
};

var _renderOption = function _renderOption(field, value, instance, onUpdate, option, index) {
  var isEven = index % 2 === 0;
  return _react.default.createElement(_util.Flex, {
    key: index,
    style: index === 0 ? {} : field.inline ? {
      marginLeft: '0.5rem'
    } : {
      marginTop: '0.25rem'
    },
    column: true,
    vAlignCenter: true
  }, _react.default.createElement(_util.Flex, {
    cursor: "pointer",
    vAlignCenter: true,
    onClick: _handleOnClick.bind(null, field, option, onUpdate, isEven)
  }, _renderOptionIcon(option, value, isEven), "\xA0", _react.default.createElement("div", null, option.title)), _react.default.createElement(_FormChildren.default, {
    field: option,
    instance: instance,
    onUpdate: onUpdate
  }));
};

var _renderOptionIcon = function _renderOptionIcon(option, value, isEven) {
  return _isChecked(option, value, isEven) ? _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'dot-circle']
  }) : _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'circle']
  });
};

var _handleOnClick = function _handleOnClick(field, option, onUpdate, isEven) {
  onUpdate(option.id || isEven, field.id);
};

var _isChecked = function _isChecked(option, value, isEven) {
  if ((0, _isNil.default)(value)) return false;
  if (option.id) return option.id === value;
  return isEven ? value : !value;
};

Radio.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  onUpdate: _propTypes.default.func.isRequired,
  instance: _propTypes.default.object.isRequired,
  uiField: _propTypes.default.object
};
var _default = Radio;
exports.default = _default;