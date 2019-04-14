"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTabify = require("react-tabify");

var _FormSubsection = _interopRequireDefault(require("./FormSubsection"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FormSection =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FormSection, _React$Component);

  function FormSection(props) {
    var _this;

    _classCallCheck(this, FormSection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormSection).call(this, props));
    _this._renderSubsectionTab = _this._renderSubsectionTab.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormSection, [{
    key: "render",
    value: function render() {
      var section = this.props.section;
      var subsections = section.subsections;
      console.log('Render FormSection');
      return _react.default.createElement(_util.Flex, {
        id: section.id,
        flexShrink: 0,
        height: "100%"
      }, this._renderSubsections(section, subsections));
    }
  }, {
    key: "_renderSubsections",
    value: function _renderSubsections(section, subsections) {
      return subsections.length > 1 ? this._renderTabbedSubsections(section, subsections) : this._renderSingleSubsection(subsections[0]);
    }
  }, {
    key: "_renderTabbedSubsections",
    value: function _renderTabbedSubsections(section, subsections) {
      return _react.default.createElement(_reactTabify.Tabs, {
        id: "".concat(section.id, "-subsection-tabs"),
        defaultActiveKey: 0
      }, subsections.map(this._renderSubsectionTab));
    }
  }, {
    key: "_renderSubsectionTab",
    value: function _renderSubsectionTab(subsection, index) {
      return _react.default.createElement(_reactTabify.Tab, {
        key: index,
        eventKey: index,
        label: this._getDerivedSubsectionTitle(subsection)
      }, this._renderSingleSubsection(subsection, true));
    }
  }, {
    key: "_renderSingleSubsection",
    value: function _renderSingleSubsection(subsection, hasSiblings) {
      return _react.default.createElement(_FormSubsection.default, {
        hideTitle: hasSiblings || this.props.hideTitle,
        hideSubtitle: this.props.hideSubtitle,
        subsection: subsection,
        instance: this.props.instance,
        onUpdate: this.props.onUpdate,
        submitButton: this.props.submitButton
      });
    }
  }, {
    key: "_getDerivedSubsectionTitle",
    value: function _getDerivedSubsectionTitle(subsection) {
      var label = subsection.title;
      console.log('_getDerivedSubsectionTitle', subsection.id);

      if (this.props.instance.subsectionHasError(subsection)) {
        label = _react.default.createElement("span", null, label, " ", _react.default.createElement(_util.Asterisk, null));
      }

      return label;
    }
  }]);

  return FormSection;
}(_react.default.Component);

FormSection.propTypes = {
  instance: _propTypes.default.object.isRequired,
  section: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired,
    subsections: _propTypes.default.array.isRequired
  }),
  hideTitle: _propTypes.default.bool,
  hideSubtitle: _propTypes.default.bool,
  submitButton: _propTypes.default.node,
  onUpdate: _propTypes.default.func.isRequired
};
var _default = FormSection;
exports.default = _default;