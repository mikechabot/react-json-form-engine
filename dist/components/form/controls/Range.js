"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Range = function Range(_ref) {
  var id = _ref.id,
      field = _ref.field,
      value = _ref.value,
      onUpdate = _ref.onUpdate;
  return _react.default.createElement(_util.Flex, {
    column: true,
    flexShrink: 0
  }, _react.default.createElement(_util.Flex, {
    hAlignCenter: true
  }, !(0, _isNil.default)(value) ? value : 'No Value'), _react.default.createElement(_util.Flex, {
    flex: 1
  }, _react.default.createElement(MinMaxLabel, {
    value: field.min,
    style: {
      marginRight: '0.25rem'
    }
  }), _react.default.createElement(_util.Flex, {
    flex: 1
  }, _react.default.createElement("input", {
    style: {
      width: '100%'
    },
    name: id,
    id: id,
    type: "range",
    value: !(0, _isNil.default)(value) ? value : '',
    max: field.max,
    min: field.min,
    onChange: onUpdate
  })), _react.default.createElement(MinMaxLabel, {
    value: field.max,
    style: {
      marginLeft: '0.25rem'
    }
  })));
};

var MinMaxLabel = function MinMaxLabel(_ref2) {
  var value = _ref2.value,
      style = _ref2.style;
  return _react.default.createElement("div", {
    style: style,
    className: "is-size-7"
  }, value);
};

MinMaxLabel.propTypes = {
  value: _propTypes.default.number.isRequired
};
Range.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  value: _propTypes.default.number,
  onUpdate: _propTypes.default.func.isRequired
};
var _default = Range;
exports.default = _default;