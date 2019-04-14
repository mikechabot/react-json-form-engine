"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _util = require("../util");

var _FormSubsectionTitle = _interopRequireDefault(require("./helpers/FormSubsectionTitle"));

var _FormField = _interopRequireDefault(require("./FormField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FormSubsection =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FormSubsection, _React$Component);

  function FormSubsection() {
    _classCallCheck(this, FormSubsection);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormSubsection).apply(this, arguments));
  }

  _createClass(FormSubsection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          subsection = _this$props.subsection,
          instance = _this$props.instance;
      console.log('Render FormSubsection');
      var hasError = instance.subsectionHasError(subsection);
      return _react.default.createElement(_util.Flex, {
        column: true,
        flex: 1,
        className: "panel",
        flexShrink: 0
      }, _react.default.createElement(_FormSubsectionTitle.default, {
        hasError: hasError,
        subsection: subsection,
        instance: instance,
        hideTitle: this.props.hideTitle,
        hideSubtitle: this.props.hideSubtitle
      }), _react.default.createElement("div", {
        className: "panel-block"
      }, _react.default.createElement("div", {
        style: {
          width: '100%',
          height: '100%'
        }
      }, this.renderSubsectionFields(subsection.fields))), this._maybeRenderSubmitButton());
    }
  }, {
    key: "renderSubsectionFields",
    value: function renderSubsectionFields() {
      var _this = this;

      var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return fields.map(function (fieldDefinition) {
        return _this._renderSubsectionField(fieldDefinition, _this.props.instance, _this.props.onUpdate);
      });
    }
  }, {
    key: "_renderSubsectionField",
    value: function _renderSubsectionField(fieldDef, instance, onUpdate) {
      var field = instance.getField(fieldDef.id);

      if (instance.isVisible(field)) {
        return _react.default.createElement("div", {
          key: field.id,
          style: {
            paddingBottom: '.75rem'
          }
        }, _react.default.createElement(_FormField.default, {
          id: field.id,
          field: field,
          onUpdate: onUpdate,
          instance: instance,
          hasError: instance.fieldHasError(field.id),
          value: instance.getModelValue(field.id)
        }));
      }
    }
  }, {
    key: "_maybeRenderSubmitButton",
    value: function _maybeRenderSubmitButton() {
      if (this.props.submitButton) {
        return _react.default.createElement("div", {
          className: "panel-block"
        }, this.props.submitButton);
      }
    }
  }]);

  return FormSubsection;
}(_react.default.Component);

FormSubsection.propTypes = {
  instance: _propTypes.default.object.isRequired,
  subsection: _propTypes.default.object.isRequired,
  hasSiblings: _propTypes.default.bool,
  hideTitle: _propTypes.default.bool,
  hideSubtitle: _propTypes.default.bool,
  submitButton: _propTypes.default.node,
  onUpdate: _propTypes.default.func.isRequired
};
var _default = FormSubsection;
exports.default = _default;