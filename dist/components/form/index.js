"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _reactTabify = require("react-tabify");

var _util = require("../util");

var _FormSubmitButton = _interopRequireDefault(require("./helpers/FormSubmitButton"));

var _ValidationAPIError = _interopRequireDefault(require("./validation/ValidationAPIError"));

var _FormSection = _interopRequireDefault(require("./FormSection"));

var _FormTitle = _interopRequireDefault(require("./helpers/FormTitle"));

var _mobxReact = require("mobx-react");

var _mobx = require("mobx");

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

// if (process.env.NODE_ENV !== 'production') {
//     const { whyDidYouUpdate } = require('why-did-you-update');
//     whyDidYouUpdate(React);
// }
var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));
    _this.state = {
      instance: props.instance
    };
    _this.onUpdate = _this.onUpdate.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.renderSectionTabPane = _this.renderSectionTabPane.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var instance = this.state.instance;

      if (instance.isValid()) {
        instance.validate();
      }
    }
  }, {
    key: "renderFormTitle",
    value: function renderFormTitle() {
      var instance = this.state.instance;

      if (!this.props.hideTitle) {
        return _react.default.createElement(_FormTitle.default, {
          id: "form-title-".concat(instance.getId()),
          iconPrefix: instance.getFormIconPrefix(),
          icon: instance.getFormIcon(),
          label: instance.getFormTitle(),
          controlsRight: this.renderSubmitButton()
        });
      }
    }
  }, {
    key: "renderTabbedSections",
    value: function renderTabbedSections(sections) {
      return _react.default.createElement(_reactTabify.Tabs, {
        stacked: true,
        id: "form-tabs-".concat(this.props.instance.getId()),
        defaultActiveKey: 0
      }, this.renderSectionContent(sections));
    }
  }, {
    key: "renderSectionContent",
    value: function renderSectionContent(sections) {
      return sections.map(this.renderSectionTabPane);
    }
  }, {
    key: "renderSectionTabPane",
    value: function renderSectionTabPane(section, index) {
      return _react.default.createElement(_reactTabify.Tab, {
        key: index,
        eventKey: index,
        label: this.getDerivedSectionTitle(section)
      }, this.renderSingleSection(section));
    }
  }, {
    key: "renderSingleSection",
    value: function renderSingleSection(section) {
      return _react.default.createElement(_FormSection.default, {
        section: section,
        onUpdate: this.onUpdate,
        submitButton: this.props.hideTitle ? this.renderSubmitButton() : null
      });
    }
  }, {
    key: "getDerivedSectionTitle",
    value: function getDerivedSectionTitle(section) {
      if (!this.state.instance.sectionHasError(section)) return section.title;
      return _react.default.createElement("span", null, section.title, " ", _react.default.createElement(_util.Asterisk, null));
    }
  }, {
    key: "renderSubmitButton",
    value: function renderSubmitButton() {
      return _react.default.createElement(_FormSubmitButton.default, {
        onSubmit: this.onSubmit,
        label: this.props.submitButtonLabel
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var instance = this.state.instance;
      var onSubmit = this.props.onSubmit;
      instance.validateOnSubmit();
      if (onSubmit) onSubmit();
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      // You can also log the error to an error reporting service
      console.log(error);
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(event, id) {
      var instance = this.state.instance;
      var onUpdate = this.props.onUpdate;
      id = id || event.target.id;
      var field = instance.getField(id);
      var value = field.actions.onUpdate(event, field, instance.getModelValue(id));
      instance.setModelValue(id, value, field);
      instance.validate();

      if (onUpdate) {
        onUpdate({
          id: id,
          value: value
        }); // Notify parent
      }
    }
  }, {
    key: "render",
    value: function render() {
      var instance = this.state.instance;
      var _this$props = this.props,
          hideTitle = _this$props.hideTitle,
          hideSectionTitles = _this$props.hideSectionTitles,
          hideSectionSubtitles = _this$props.hideSectionSubtitles;
      console.log('Rendering Form');

      if (this.state.hasError) {
        // You can render any custom fallback UI
        return _react.default.createElement("h1", null, "Something went wrong.");
      } // No instance


      if (!instance || (0, _isEmpty.default)(instance)) {
        return _react.default.createElement("em", {
          className: "has-text-danger"
        }, "No form instance");
      } // Invalid definition


      if (!instance.isValid()) {
        return _react.default.createElement(_ValidationAPIError.default, {
          error: instance.error
        });
      }

      var sections = instance.getSections(); // No sections

      if ((0, _isEmpty.default)(sections)) {
        return _react.default.createElement("em", {
          className: "has-text-danger"
        }, "No sections");
      }

      return _react.default.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          flexShrink: 0,
          border: '1px solid #dbdbdb'
        }
      }, this.renderFormTitle(instance), _react.default.createElement(_mobxReact.Provider, {
        instance: instance,
        color: "red"
      }, sections.length > 1 ? this.renderTabbedSections(sections) : this.renderSingleSection(sections[0])));
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      console.log(error);
      return {
        hasError: true
      };
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