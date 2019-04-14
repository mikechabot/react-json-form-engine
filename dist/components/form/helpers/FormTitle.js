"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_THEME = 'is-dark';
var className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-5-mobile';

var FormTitle = function FormTitle(_ref) {
  var id = _ref.id,
      label = _ref.label,
      icon = _ref.icon,
      iconPrefix = _ref.iconPrefix,
      theme = _ref.theme,
      controlsRight = _ref.controlsRight;
  return _react.default.createElement(_util.Flex, {
    id: id,
    vAlignCenter: true,
    flexShrink: 0,
    justifyContent: "space-between",
    className: "navbar ".concat(theme || DEFAULT_THEME)
  }, _react.default.createElement("div", {
    className: "navbar-brand"
  }, _react.default.createElement("span", {
    className: className
  }, _maybeRenderIcon(icon, iconPrefix), _renderLabel(label))), _maybeRenderControlsRight(controlsRight));
};

var _maybeRenderIcon = function _maybeRenderIcon(icon, iconPrefix) {
  if (icon) {
    return _react.default.createElement("span", {
      key: "icon"
    }, _react.default.createElement(_util.Icon, {
      icon: icon,
      prefix: iconPrefix
    }), "\xA0");
  }
};

var _renderLabel = function _renderLabel(label) {
  return _react.default.createElement("span", {
    key: "label"
  }, label);
};

var _maybeRenderControlsRight = function _maybeRenderControlsRight(controls) {
  if (controls) {
    return _react.default.createElement("div", {
      className: "navbar-item"
    }, controls);
  }
};

FormTitle.propTypes = {
  id: _propTypes.default.string.isRequired,
  label: _propTypes.default.node.isRequired,
  icon: _propTypes.default.string,
  iconPrefix: _propTypes.default.string,
  theme: _propTypes.default.string,
  controlsRight: _propTypes.default.node
};
var _default = FormTitle;
exports.default = _default;