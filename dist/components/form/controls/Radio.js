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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  containerInline: {
    display: 'flex'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'
  },
  optionInline: {
    marginLeft: '0.5rem'
  },
  optionLabel: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  }
};

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

  var style = _objectSpread({}, styles.optionContainer, index === 0 ? {} : field.inline ? styles.optionInline : {});

  return _react["default"].createElement("div", {
    key: index,
    style: style,
    onClick: function onClick() {
      return onUpdate(option.id || isEven, field.id);
    }
  }, _react["default"].createElement("div", {
    style: styles.optionLabel
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
  var containerStyle = field.inline ? styles.containerInline : styles.container;
  return _react["default"].createElement("div", {
    id: id,
    style: containerStyle
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