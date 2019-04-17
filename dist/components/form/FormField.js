"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormControl = _interopRequireDefault(require("./FormControl"));

var _FormChildren = _interopRequireDefault(require("./FormChildren"));

var _util = require("../util");

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _formConst = require("../../form-engine/config/form-const");

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

var _PROPERTY$FIELD = _formConst.PROPERTY.FIELD,
    ID = _PROPERTY$FIELD.ID,
    FIELDS = _PROPERTY$FIELD.FIELDS,
    OPTIONS = _PROPERTY$FIELD.OPTIONS;

var FormField =
/*#__PURE__*/
function (_Component) {
  _inherits(FormField, _Component);

  function FormField() {
    _classCallCheck(this, FormField);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormField).apply(this, arguments));
  }

  _createClass(FormField, [{
    key: "hasFieldChildren",

    /**
     * Check for child fields, or option fields with children
     * @param field
     * @returns {boolean}
     */
    value: function hasFieldChildren(field) {
      if (!(0, _isEmpty.default)(field[FIELDS])) {
        return true;
      }

      if (!(0, _isEmpty.default)(field[OPTIONS])) {
        return field[OPTIONS].some(function (option) {
          return !(0, _isEmpty.default)(option[FIELDS]);
        });
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var field = this.props.field;
      console.log('Rendering FormField', field.id);
      return _react.default.createElement(_util.Flex, {
        column: true,
        className: "field",
        id: "field-".concat(field[ID])
      }, _react.default.createElement(_FormControl.default, this.props), this.hasFieldChildren(field) ? _react.default.createElement(_FormChildren.default, this.props) : null);
    }
  }]);

  return FormField;
}(_react.Component);

FormField.propTypes = {
  fieldId: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  onUpdate: _propTypes.default.func.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool, _propTypes.default.array, _propTypes.default.object])
};
var _default = FormField;
exports.default = _default;