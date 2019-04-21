"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _FormChildren = _interopRequireDefault(require("../FormChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexColumn = {
  display: 'flex',
  flexDirection: 'column'
};

var checkbox = _objectSpread({}, flexColumn, {
  marginTop: '0.25rem'
});

function getStyle(index) {
  if (index === 0) return {};
  return checkbox;
}

var CheckboxGroup = function CheckboxGroup(_ref) {
  var id = _ref.id,
      field = _ref.field,
      value = _ref.value,
      _onUpdate = _ref.onUpdate;
  return _react.default.createElement("div", {
    style: flexColumn
  }, field.options.map(function (option, index) {
    return _react.default.createElement("div", {
      key: index,
      style: getStyle(index)
    }, _react.default.createElement(_Checkbox.default, {
      id: option.id,
      option: option,
      onUpdate: function onUpdate() {
        return _onUpdate(option.id, id);
      },
      value: !value ? false : value.includes(option.id)
    }), _react.default.createElement(_FormChildren.default, {
      field: option
    }));
  }));
};

CheckboxGroup.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  value: _propTypes.default.array,
  onUpdate: _propTypes.default.func.isRequired
};
var _default = CheckboxGroup;
exports.default = _default;