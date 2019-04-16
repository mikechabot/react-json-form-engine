"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _util = require("../../util");

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _FormChildren = _interopRequireDefault(require("../FormChildren"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxGroup = function CheckboxGroup(_ref) {
  var id = _ref.id,
      field = _ref.field,
      value = _ref.value,
      onUpdate = _ref.onUpdate;
  return _react.default.createElement(_util.Flex, {
    column: true
  }, field.options.map(_renderOption.bind(_this, id, value, onUpdate)));
};

var _renderOption = function _renderOption(id, value, _onUpdate, option, index) {
  return _react.default.createElement(_util.Flex, {
    column: true,
    key: index,
    style: index > 0 ? {
      marginTop: '0.25rem'
    } : {}
  }, _react.default.createElement(_Checkbox.default, {
    id: option.id,
    option: option,
    onUpdate: function onUpdate() {
      return _onUpdate(option.id, id);
    },
    value: !value ? false : value.includes(option.id)
  }), _react.default.createElement(_FormChildren.default, {
    field: option,
    onUpdate: _onUpdate
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