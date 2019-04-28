"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mobxReact = require("mobx-react");

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _formConst = require("../../form-engine/config/form-const");

var _FormConsumer = _interopRequireDefault(require("./FormConsumer"));

var _ValidationAPIError = _interopRequireDefault(require("../validation/ValidationAPIError"));

var _ValidationGenericError = _interopRequireDefault(require("../validation/ValidationGenericError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.onUpdate = _this.onUpdate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var instance = this.props.instance;

      if (instance.isValidDefinition()) {
        instance.validate();
      }
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var _this$props = this.props,
          instance = _this$props.instance,
          onSubmit = _this$props.onSubmit;
      var hasErrors = instance.validateOnSubmit();
      if (onSubmit) onSubmit(hasErrors);
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(event, id) {
      var _this$props2 = this.props,
          instance = _this$props2.instance,
          onUpdate = _this$props2.onUpdate;
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
      var instance = this.props.instance; // No instance

      if (!instance || (0, _isEmpty["default"])(instance)) {
        return _react["default"].createElement(_ValidationGenericError["default"], {
          message: _formConst.ERROR_MESSAGE.NO_INSTANCE
        });
      } // Invalid definition


      if (!instance.isValidDefinition()) {
        return _react["default"].createElement(_ValidationAPIError["default"], {
          error: instance.getError()
        });
      }

      if ((0, _isEmpty["default"])(instance.getSections())) {
        return _react["default"].createElement(_ValidationGenericError["default"], {
          message: _formConst.ERROR_MESSAGE.NO_SECTIONS
        });
      }

      return _react["default"].createElement(_mobxReact.Provider, {
        instance: instance,
        onSubmit: this.onSubmit,
        onUpdate: this.onUpdate,
        hideFormTitle: this.props.hideFormTitle,
        hideFormBorder: this.props.hideFormBorder,
        hideSubsectionTitles: this.props.hideSubsectionTitles,
        hideSubsectionSubtitles: this.props.hideSubsectionSubtitles,
        submitButtonLabel: this.props.submitButtonLabel
      }, _react["default"].createElement(_FormConsumer["default"], {
        width: this.props.width
      }));
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  instance: _propTypes["default"].object.isRequired,
  submitButtonLabel: _propTypes["default"].string,
  hideFormTitle: _propTypes["default"].bool,
  hideFormBorder: _propTypes["default"].bool,
  hideSubsectionTitles: _propTypes["default"].bool,
  hideSubsectionSubtitles: _propTypes["default"].bool,
  disableSubmitOnValidationError: _propTypes["default"].bool,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  onSubmit: _propTypes["default"].func.isRequired,
  onUpdate: _propTypes["default"].func
};
var _default = Form;
exports["default"] = _default;