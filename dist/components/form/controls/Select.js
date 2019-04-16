"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formConst = require("../../../form-engine/config/form-const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function Select(_ref) {
  var id = _ref.id,
      value = _ref.value,
      field = _ref.field,
      onUpdate = _ref.onUpdate,
      hasError = _ref.hasError;

  var isMultiple = __isFieldTypeArray(field);

  return _react.default.createElement("div", {
    className: "select ".concat(isMultiple ? 'is-multiple' : '', " ").concat(hasError ? 'is-danger' : '')
  }, _react.default.createElement("select", {
    value: value,
    id: id,
    name: id,
    onChange: function onChange(_ref2) {
      var target = _ref2.target;
      return onUpdate(target.options);
    },
    multiple: isMultiple
  }, _maybeRenderPlaceholder(field, value), _renderOptions(field)));
};

var _maybeRenderPlaceholder = function _maybeRenderPlaceholder(field, value) {
  if (!value && !__isFieldTypeArray(field)) {
    return _react.default.createElement("option", {
      value: ""
    }, field.placeholder || '-- select value --');
  }
};

var _renderOptions = function _renderOptions(field) {
  return field.options.map(function (option, index) {
    return _react.default.createElement("option", {
      key: index,
      value: option.id
    }, option.title);
  });
};

var __isFieldTypeArray = function __isFieldTypeArray(field) {
  return field.type === _formConst.DATA_TYPE.ARRAY;
};

Select.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.string]),
  hasError: _propTypes.default.bool.isRequired,
  onUpdate: _propTypes.default.func.isRequired,
  uiField: _propTypes.default.object
};
var _default = Select;
exports.default = _default;