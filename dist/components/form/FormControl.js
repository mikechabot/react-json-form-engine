"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _FormControlTitle = _interopRequireDefault(require("./helpers/FormControlTitle"));

var _FormControlHint = _interopRequireDefault(require("./helpers/FormControlHint"));

var _ValidationFieldError = _interopRequireDefault(require("./validation/ValidationFieldError"));

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

var FormControl =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FormControl, _React$Component);

  function FormControl() {
    _classCallCheck(this, FormControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormControl).apply(this, arguments));
  }

  _createClass(FormControl, [{
    key: "shouldComponentUpdate",

    /**
     * Determine if the component should call render() to update itself.
     *
     * Right now, we'll always re-render the component if it contains
     * children. Those components themselves will call this method to
     * determine if they should re-render themselves. If this becomes
     * a performance issue, we could potentially before a deep comparison
     * between the prop trees, but that seems excessive right now.
     *
     * @param nextProps
     * @returns {boolean} true if the component should call render()
     */
    value: function shouldComponentUpdate(nextProps) {
      if (!this._hasFieldChildren(nextProps.field)) {
        return nextProps.value !== this.props.value || nextProps.hasError !== this.props.hasError;
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          id = _this$props.id,
          value = _this$props.value,
          field = _this$props.field,
          instance = _this$props.instance,
          onUpdate = _this$props.onUpdate;
      var component = field.component,
          uiDecorators = field.uiDecorators;

      if (!component || !component.element) {
        console.error("Field of type \"".concat(field.type, "\" is missing required \"component\" (id: ").concat(id, ")"));
        return _react.default.createElement(_ValidationFieldError.default, {
          id: field.id
        });
      }

      console.log('Render FormControl', id);
      var Control = component.element;
      var hasError = instance.fieldHasError(id);
      return _react.default.createElement("span", null, _react.default.createElement(_FormControlTitle.default, {
        field: field,
        decorators: uiDecorators
      }), _react.default.createElement("div", {
        className: "control"
      }, _react.default.createElement(Control, {
        id: id,
        value: value,
        field: field,
        hasError: hasError,
        uiDecorators: uiDecorators,
        onUpdate: onUpdate,
        instance: instance
      })), this._maybeRenderHint(uiDecorators), hasError ? this._maybeRenderError(id, instance) : null);
    }
  }, {
    key: "_maybeRenderHint",
    value: function _maybeRenderHint(uiDecorators) {
      if (_maybeBaby.default.of(uiDecorators).prop('hint').isJust()) {
        return _react.default.createElement(_FormControlHint.default, {
          text: uiDecorators.hint
        });
      }
    }
  }, {
    key: "_maybeRenderError",
    value: function _maybeRenderError(id, instance) {
      var _instance$getValidati = instance.getValidationResultByTag(id),
          messages = _instance$getValidati.messages;

      return Object.keys(messages).map(function (key) {
        return _react.default.createElement(_FormControlHint.default, {
          key: key,
          icon: "exclamation-triangle",
          className: "is-danger",
          text: messages[key].message
        });
      });
    }
    /**
     * Check for child fields, or option fields with children
     * @param field
     * @returns {boolean}
     */

  }, {
    key: "_hasFieldChildren",
    value: function _hasFieldChildren(field) {
      if (!(0, _isEmpty2.default)(field.fields)) {
        return true;
      }

      if (!(0, _isEmpty2.default)(field.options)) {
        return field.options.some(function (option) {
          return !(0, _isEmpty2.default)(option.fields);
        });
      }

      return false;
    }
  }]);

  return FormControl;
}(_react.default.Component);

FormControl.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  onUpdate: _propTypes.default.func.isRequired,
  hasError: _propTypes.default.bool.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool, _propTypes.default.array, _propTypes.default.object]),
  instance: _propTypes.default.object.isRequired
};
var _default = FormControl;
exports.default = _default;