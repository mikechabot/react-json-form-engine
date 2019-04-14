"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _reactTabify = require("react-tabify");

var _util = require("../util");

var _Asterisk = _interopRequireDefault(require("../util/Asterisk"));

var _FormSubmitButton = _interopRequireDefault(require("./helpers/FormSubmitButton"));

var _ValidationAPIError = _interopRequireDefault(require("./validation/ValidationAPIError"));

var _FormSection = _interopRequireDefault(require("./FormSection"));

var _FormTitle = _interopRequireDefault(require("./helpers/FormTitle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));
    _this.onUpdate = _this.onUpdate.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this._renderSectionTabPane = _this._renderSectionTabPane.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var instance = this.props.instance;

      if (instance.isValid()) {
        instance.validate();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var instance = this.props.instance; // No instance

      if (!instance || (0, _isEmpty2.default)(instance)) {
        return _react.default.createElement("em", {
          className: "has-text-danger"
        }, "No form instance");
      } // Invalid definition


      if (!instance.isValid()) {
        return _react.default.createElement(_ValidationAPIError.default, {
          error: instance.error
        });
      } // No sections


      if (instance.getSections().isEmpty()) {
        return _react.default.createElement("em", {
          className: "has-text-danger"
        }, "No sections");
      }

      console.log('Rendering Form');
      return _react.default.createElement(_util.Flex, {
        width: this.props.width,
        id: "form-".concat(instance.getId()),
        column: true,
        flex: 1,
        flexShrink: 0,
        overflow: "auto"
      }, this._renderFormTitle(instance), this._renderForm(instance.getSections()));
    }
  }, {
    key: "_renderFormTitle",
    value: function _renderFormTitle(instance) {
      if (!this.props.hideTitle) {
        return _react.default.createElement(_FormTitle.default, {
          id: "form-title-".concat(instance.getId()),
          iconPrefix: instance.getFormIconPrefix(),
          icon: instance.getFormIcon(),
          label: instance.getFormTitle(),
          controlsRight: this._renderSubmitButton()
        });
      }
    }
  }, {
    key: "_renderForm",
    value: function _renderForm(sections) {
      return sections.count() > 1 ? this._renderTabbedSections(sections) : this._renderSingleSection(sections.values()[0]);
    }
  }, {
    key: "_renderTabbedSections",
    value: function _renderTabbedSections(sections) {
      return _react.default.createElement(_reactTabify.Tabs, {
        stacked: true,
        id: "form-tabs-".concat(this.props.instance.getId()),
        defaultActiveKey: 0
      }, this._renderSectionContent(sections));
    }
  }, {
    key: "_renderSectionContent",
    value: function _renderSectionContent(sections) {
      return sections.values().map(this._renderSectionTabPane);
    }
  }, {
    key: "_renderSectionTabPane",
    value: function _renderSectionTabPane(section, index) {
      return _react.default.createElement(_reactTabify.Tab, {
        key: index,
        eventKey: index,
        label: this._getDerivedSectionTitle(section)
      }, this._renderSingleSection(section));
    }
  }, {
    key: "_renderSingleSection",
    value: function _renderSingleSection(section) {
      return _react.default.createElement(_FormSection.default, {
        section: section,
        instance: this.props.instance,
        onUpdate: this.onUpdate,
        hideTitle: this.props.hideSectionTitles,
        hideSubtitle: this.props.hideSectionSubtitles,
        submitButton: this.props.hideTitle ? this._renderSubmitButton() : null
      });
    }
  }, {
    key: "_getDerivedSectionTitle",
    value: function _getDerivedSectionTitle(section) {
      var label = section.title;

      if (this.props.instance.sectionHasError(section)) {
        label = _react.default.createElement("span", null, label, " ", _react.default.createElement(_Asterisk.default, null));
      }

      return label;
    }
  }, {
    key: "_renderSubmitButton",
    value: function _renderSubmitButton() {
      return _react.default.createElement(_FormSubmitButton.default, {
        onSubmit: this.onSubmit,
        label: this.props.submitButtonLabel
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var _this$props = this.props,
          instance = _this$props.instance,
          onSubmit = _this$props.onSubmit;
      instance.validateOnSubmit();
      this.forceUpdate();
      if (onSubmit) onSubmit();
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(event, id) {
      var _this$props2 = this.props,
          instance = _this$props2.instance,
          onUpdate = _this$props2.onUpdate;
      id = id || event.target.id;
      var field = instance.getField(id);
      var value = field.actions.onUpdate(event, field, instance.getModelValue(id)); // Set model value

      instance.setModelValue(id, value, field);
      instance.validate();

      if (!onUpdate) {
        this.forceUpdate();
      } else {
        onUpdate({
          id: id,
          value: value
        }); // Notify parent
      }
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  instance: _propTypes.default.object.isRequired,
  submitButtonLabel: _propTypes.default.string,
  hideTitle: _propTypes.default.bool,
  hideSectionTitles: _propTypes.default.bool,
  hideSectionSubtitles: _propTypes.default.bool,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  onSubmit: _propTypes.default.func.isRequired,
  onUpdate: _propTypes.default.func
};
var _default = Form;
exports.default = _default;