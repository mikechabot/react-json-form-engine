"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTabify = require("react-tabify");

var _context = require("../../context");

var _util = require("../util");

var _FormSubsection = _interopRequireDefault(require("./FormSubsection"));

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

var FormSection =
/*#__PURE__*/
function (_Component) {
  _inherits(FormSection, _Component);

  function FormSection() {
    _classCallCheck(this, FormSection);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormSection).apply(this, arguments));
  }

  _createClass(FormSection, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      debugger;
      var ise = nextProps.section.title !== this.props.section.title;
      console.log('SCU', ise);
      return ise;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log('DidUpdate FormSection', this.props.section.title);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          section = _this$props.section,
          onUpdate = _this$props.onUpdate,
          submitButton = _this$props.submitButton;
      var subsections = section.subsections;
      console.log('Rendering FormSection', section.title);

      var getDerivedSubsectionTitle = function getDerivedSubsectionTitle(subsection) {
        return _react.default.createElement("span", null, subsection.title, " ", _react.default.createElement(_util.Asterisk, null));
      };

      var renderSingleSubsection = function renderSingleSubsection(subsection, isTabbed) {
        return _react.default.createElement(_FormSubsection.default, {
          isTabbed: isTabbed,
          subsection: subsection,
          onUpdate: onUpdate,
          submitButton: submitButton
        });
      };

      return _react.default.createElement("div", {
        style: {
          display: 'flex',
          height: '100%',
          flexShrink: 0
        }
      }, subsections.length === 1 ? renderSingleSubsection(subsections[0]) : _react.default.createElement(_reactTabify.Tabs, {
        id: "".concat(section.id, "-subsection-tabs"),
        defaultActiveKey: 0
      }, subsections.map(function (subsection, index) {
        return _react.default.createElement(_reactTabify.Tab, {
          key: index,
          eventKey: index,
          label: getDerivedSubsectionTitle(subsection)
        }, renderSingleSubsection(subsection, true));
      })));
    }
  }]);

  return FormSection;
}(_react.Component);

FormSection.contextType = _context.FormContext;
FormSection.propTypes = {
  section: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired,
    subsections: _propTypes.default.array.isRequired
  }),
  submitButton: _propTypes.default.node,
  onUpdate: _propTypes.default.func.isRequired
};
var _default = FormSection;
exports.default = _default;