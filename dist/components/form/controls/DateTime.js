"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));

require("react-datepicker/dist/react-datepicker.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT = {
  TIME_FORMAT: 'h:mm aa',
  DATE_FORMAT: 'MMMM d, yyyy h:mm aa',
  TIME_INTERVAL: 15
};

var DateTime =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateTime, _React$Component);

  function DateTime(props) {
    var _this;

    _classCallCheck(this, DateTime);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateTime).call(this, props));
    _this.onUpdate = _this.onUpdate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DateTime, [{
    key: "onUpdate",
    value: function onUpdate(dateTime) {
      this.props.onUpdate(dateTime, this.props.id);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          id = _this$props.id,
          value = _this$props.value,
          field = _this$props.field;

      var decorators = _maybeBaby.default.of(field).prop('uiDecorators');

      var newProps = {
        value: value,
        timeFormat: decorators.prop('timeFormat').orElse(DEFAULT.TIME_FORMAT).join(),
        dateFormat: decorators.prop('dateFormat').orElse(DEFAULT.DATE_FORMAT).join(),
        timeIntervals: decorators.prop('timeInterval').orElse(DEFAULT.TIME_INTERVAL).join()
      };

      if (decorators.isNothing()) {
        newProps = _objectSpread({}, getDefaultProps(), newProps);
      } else {
        var options = decorators.join();

        if (options.hideCalendar) {
          newProps = _objectSpread({}, newProps, getDefaultProps(), {
            showTimeSelectOnly: true,
            dateFormat: newProps.timeFormat
          });
        }
      }

      console.log(id, decorators.join(), newProps);
      console.log(value);
      return _react.default.createElement(_reactDatepicker.default, _extends({
        id: id,
        selected: value,
        onChange: this.onUpdate
      }, newProps));
    }
  }]);

  return DateTime;
}(_react.default.Component);

var getDefaultProps = function getDefaultProps() {
  return {
    showTimeSelect: true,
    timeCaption: 'Time'
  };
};

DateTime.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  onUpdate: _propTypes.default.func.isRequired,
  value: _propTypes.default.object
};
var _default = DateTime;
exports.default = _default;