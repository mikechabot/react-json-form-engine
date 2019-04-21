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

var styles = {
  container: {
    display: 'flex'
  },
  containerInline: {
    display: 'flex',
    flexDirection: 'column'
  }
};

var Radio = function Radio(_ref) {
  var id = _ref.id,
      value = _ref.value,
      field = _ref.field,
      onUpdate = _ref.onUpdate;
  return _react.default.createElement("div", {
    styles: field.inline ? styles.containerInline : styles.container,
    id: id
  }, field.options.map(_renderOption.bind(null, field, value, onUpdate)));
};

var _renderOption = function _renderOption(field, value, onUpdate, option, index) {
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
    onClick: function onClick() {
      return onUpdate(option.id || isEven, field.id);
    }
  }, _renderOptionIcon(option, value, isEven), "\xA0", _react.default.createElement("div", null, option.title)), _react.default.createElement(_FormChildren.default, {
    field: option
  }));
};

var _renderOptionIcon = function _renderOptionIcon(option, value, isEven) {
  return isChecked(option, value, isEven) ? _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'dot-circle']
  }) : _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'circle']
  });
};

var isChecked = function isChecked(option, value, isEven) {
  if ((0, _isNil.default)(value)) return false;
  if (option.id) return option.id === value;
  return isEven ? value : !value;
};

Radio.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  onUpdate: _propTypes.default.func.isRequired,
  uiField: _propTypes.default.object
};
var _default = Radio;
exports.default = _default;