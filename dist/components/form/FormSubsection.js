"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _util = require("../util");

var _FormSubsectionTitle = _interopRequireDefault(require("./helpers/FormSubsectionTitle"));

var _FormField = _interopRequireDefault(require("./FormField"));

var _context = require("../../context");

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

var FormSubsection =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(FormSubsection, _PureComponent);

  function FormSubsection() {
    _classCallCheck(this, FormSubsection);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormSubsection).apply(this, arguments));
  }

  _createClass(FormSubsection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          subsection = _this$props.subsection,
          submitButton = _this$props.submitButton,
          onUpdate = _this$props.onUpdate;
      var instance = this.context.instance;

      var renderSubsectionFields = function renderSubsectionFields() {
        var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return fields.map(function (fieldDefinition) {
          var field = instance.getField(fieldDefinition.id);
          if (!instance.isVisible(field)) return null;
          return _react.default.createElement(_FormField.default, {
            key: field.id,
            fieldId: field.id,
            field: field,
            onUpdate: onUpdate,
            hasError: instance.fieldHasError(field.id),
            value: instance.getModelValue(field.id)
          });
        });
      };

      console.log('Rendering FormSubsection', subsection.id);
      return _react.default.createElement(_util.Flex, {
        column: true,
        flex: 1,
        className: "panel",
        flexShrink: 0,
        height: "100%"
      }, _react.default.createElement(_FormSubsectionTitle.default, {
        subsection: subsection
      }), _react.default.createElement("div", {
        style: {
          width: '100%',
          height: '100%',
          padding: '.5em .75em'
        }
      }, renderSubsectionFields(subsection.fields)), submitButton ? _react.default.createElement("div", {
        className: "panel-block"
      }, submitButton) : null);
    }
  }]);

  return FormSubsection;
}(_react.PureComponent);

FormSubsection.contextType = _context.FormContext;
FormSubsection.propTypes = {
  subsection: _propTypes.default.object.isRequired,
  submitButton: _propTypes.default.node,
  onUpdate: _propTypes.default.func.isRequired
};
var _default = FormSubsection;
exports.default = _default;