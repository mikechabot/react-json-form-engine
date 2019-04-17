"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

var _FormControlTitle = _interopRequireDefault(require("./helpers/FormControlTitle"));

var _FormControlHint = _interopRequireDefault(require("./helpers/FormControlHint"));

var _ValidationFieldError = _interopRequireDefault(require("./validation/ValidationFieldError"));

var _mobxReact = require("mobx-react");

var _dec, _class;

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

var FormControl = (_dec = (0, _mobxReact.inject)('instance'), _dec(_class = (0, _mobxReact.observer)(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(FormControl, _Component);

  function FormControl() {
    _classCallCheck(this, FormControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormControl).apply(this, arguments));
  }

  _createClass(FormControl, [{
    key: "maybeRenderHint",
    value: function maybeRenderHint(uiDecorators) {
      if (_maybeBaby.default.of(function () {
        return uiDecorators.hint;
      }).isJust()) {
        return _react.default.createElement(_FormControlHint.default, {
          text: uiDecorators.hint
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          field = _this$props.field,
          fieldId = _this$props.fieldId,
          onUpdate = _this$props.onUpdate,
          instance = _this$props.instance;
      var component = field.component,
          uiDecorators = field.uiDecorators;

      if (!component || !component.element) {
        console.error("Field of type \"".concat(field.type, "\" is missing required \"component\" (id: ").concat(field.id, ")"));
        return _react.default.createElement(_ValidationFieldError.default, {
          id: field.id
        });
      }

      var hasError = instance.fieldHasError(fieldId);
      var value = instance.modelValue(fieldId);
      console.log('Render FormControl', field.id);
      var Control = component.element;

      var renderErrors = function renderErrors(id) {
        var _instance$getValidati = instance.getValidationResultByTag(id),
            messages = _instance$getValidati.messages;

        return Object.keys(messages).map(function (key) {
          return _react.default.createElement(_FormControlHint.default, {
            key: key,
            icon: "asterisk",
            className: "is-danger",
            text: messages[key].message
          });
        });
      };

      return _react.default.createElement("span", null, _react.default.createElement(_FormControlTitle.default, {
        field: field,
        decorators: uiDecorators
      }), _react.default.createElement("div", {
        className: "control"
      }, _react.default.createElement(Control, {
        id: fieldId,
        value: value,
        field: field,
        hasError: hasError,
        uiDecorators: uiDecorators,
        onUpdate: onUpdate
      })), this.maybeRenderHint(uiDecorators), hasError ? renderErrors(fieldId) : null);
    }
  }]);

  return FormControl;
}(_react.Component)) || _class) || _class);
FormControl.propTypes = {
  fieldId: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  onUpdate: _propTypes.default.func.isRequired,
  hasError: _propTypes.default.bool.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool, _propTypes.default.array, _propTypes.default.object])
};
var _default = FormControl;
exports.default = _default;