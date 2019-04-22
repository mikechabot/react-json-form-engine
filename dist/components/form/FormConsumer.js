"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mobxReact = require("mobx-react");

var _FormTitle = _interopRequireDefault(require("./util/FormTitle"));

var _FormSection = _interopRequireDefault(require("./FormSection/"));

var _TabbedSections = _interopRequireDefault(require("./FormSection/TabbedSections"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FormConsumer = (_dec = (0, _mobxReact.inject)('instance', 'hideFormTitle', 'hideFormBorder', 'hideSubsectionTitles', 'hideSubsectionSubtitles', 'submitButtonLabel'), _dec(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  _inherits(FormConsumer, _Component);

  function FormConsumer() {
    _classCallCheck(this, FormConsumer);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormConsumer).apply(this, arguments));
  }

  _createClass(FormConsumer, [{
    key: "renderSections",
    value: function renderSections(sections) {
      if (sections.length > 1) {
        return _react["default"].createElement(_TabbedSections["default"], null);
      }

      return _react["default"].createElement(_FormSection["default"], {
        section: sections[0]
      });
    }
  }, {
    key: "getDerivedStyles",
    value: function getDerivedStyles(hideFormBorder) {
      return {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        flexShrink: 0,
        border: hideFormBorder ? 'none' : '1px solid #dbdbdb'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          instance = _this$props.instance,
          hideFormBorder = _this$props.hideFormBorder;
      return _react["default"].createElement("div", {
        className: "__rjfe__",
        style: this.getDerivedStyles(hideFormBorder)
      }, _react["default"].createElement(_FormTitle["default"], null), this.renderSections(instance.getSections()));
    }
  }]);

  return FormConsumer;
}(_react.Component), _class2.propTypes = {
  instance: _propTypes["default"].instanceOf(Object).isRequired,
  hideFormBorder: _propTypes["default"].bool
}, _temp)) || _class) || _class);
var _default = FormConsumer;
exports["default"] = _default;