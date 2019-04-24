"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0
  }
};

var Range = function Range(_ref) {
  var id = _ref.id,
      field = _ref.field,
      value = _ref.value,
      onUpdate = _ref.onUpdate;
  return _react["default"].createElement("div", {
    style: styles.container
  }, _react["default"].createElement("div", {
    className: "is-size-7 has-text-weight-bold range-no-value"
  }, !(0, _isNil["default"])(value) ? value : 'No Value'), _react["default"].createElement("div", {
    className: "range-slider-container"
  }, _react["default"].createElement(MinMaxLabel, {
    value: field.min,
    className: "m-r-xs"
  }), _react["default"].createElement("div", {
    className: "range-slider-container"
  }, _react["default"].createElement("input", {
    className: "range-slider",
    name: id,
    id: id,
    type: "range",
    value: !(0, _isNil["default"])(value) ? value : '',
    max: field.max,
    min: field.min,
    onChange: onUpdate
  })), _react["default"].createElement(MinMaxLabel, {
    value: field.max,
    className: "m-l-xs"
  })));
};

var MinMaxLabel = function MinMaxLabel(_ref2) {
  var value = _ref2.value,
      className = _ref2.className;
  return _react["default"].createElement("div", {
    className: "is-size-7 ".concat(className)
  }, value);
};

MinMaxLabel.propTypes = {
  value: _propTypes["default"].number.isRequired
};
Range.propTypes = {
  id: _propTypes["default"].string.isRequired,
  field: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].number,
  onUpdate: _propTypes["default"].func.isRequired
};
var _default = Range;
exports["default"] = _default;