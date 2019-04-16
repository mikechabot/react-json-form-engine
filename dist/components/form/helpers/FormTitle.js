"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_THEME = 'is-dark';
var className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-5-mobile';

var FormTitle =
/*#__PURE__*/
function (_Component) {
  _inherits(FormTitle, _Component);

  function FormTitle() {
    _classCallCheck(this, FormTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormTitle).apply(this, arguments));
  }

  _createClass(FormTitle, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.label !== this.props.label;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          id = _this$props.id,
          theme = _this$props.theme,
          iconPrefix = _this$props.iconPrefix,
          icon = _this$props.icon,
          label = _this$props.label,
          controlsRight = _this$props.controlsRight;
      console.log('Rendering FormTitle', id);
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
      }, maybeRenderIcon(icon, iconPrefix), _react.default.createElement("span", {
        key: "label"
      }, label))), controlsRight ? _react.default.createElement("div", {
        className: "navbar-item"
      }, controlsRight) : null);
    }
  }]);

  return FormTitle;
}(_react.Component);

var maybeRenderIcon = function maybeRenderIcon(icon, iconPrefix) {
  if (icon) {
    return _react.default.createElement("span", {
      key: "icon"
    }, _react.default.createElement(_util.Icon, {
      icon: icon,
      prefix: iconPrefix
    }), "\xA0");
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