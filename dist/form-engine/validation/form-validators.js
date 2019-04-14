"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _common = require("../../common");

var _formConst = require("../config/form-const");

var _REQUIRED;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _VALIDATION_CONST$STA = _formConst.VALIDATION_CONST.STATUS,
    OK = _VALIDATION_CONST$STA.OK,
    ERROR = _VALIDATION_CONST$STA.ERROR;
var ARRAY = _formConst.DATA_TYPE.ARRAY,
    BOOLEAN = _formConst.DATA_TYPE.BOOLEAN,
    DATE = _formConst.DATA_TYPE.DATE,
    NUMBER = _formConst.DATA_TYPE.NUMBER,
    STRING = _formConst.DATA_TYPE.STRING;

function _getStatus(errorCondition) {
  return errorCondition ? ERROR : OK;
}
/**
 * Available VALIDATORS keyed by validation type. Each validation type
 * may contain one or more data types.
 * @type {{REQUIRED: {}, NUMERIC: {}}}
 */


var VALIDATORS = {
  REQUIRED: (_REQUIRED = {}, _defineProperty(_REQUIRED, ARRAY, function (field, value) {
    return _getStatus((0, _isEmpty.default)(value));
  }), _defineProperty(_REQUIRED, BOOLEAN, function (field, value) {
    if (!field.options) return OK;
    return _getStatus((0, _isNil.default)(value));
  }), _defineProperty(_REQUIRED, DATE, function (field, value) {
    return _getStatus((0, _common.__isBlank)(value));
  }), _defineProperty(_REQUIRED, NUMBER, function (field, value) {
    return field.dirty ? _getStatus(Number.isNaN(value)) : _getStatus((0, _isNil.default)(value));
  }), _defineProperty(_REQUIRED, STRING, function (field, value) {
    return _getStatus((0, _common.__isBlank)(value));
  }), _REQUIRED),
  NUMERIC: _defineProperty({}, NUMBER, function (field, value) {
    if (!(0, _isNil.default)(field.min) && value < field.min) return ERROR;
    if (!(0, _isNil.default)(field.max) && value > field.max) return ERROR;
  })
};
var _default = {
  /**
   * Invoke a validator based on field data type
   * @param validators
   * @param field
   * @param value
   * @returns {*}
   */
  validate: function validate(validators, field, value) {
    var validator = validators[field.type];

    if (validator) {
      return validator(field, value);
    }

    console.warn("No type validator found for type: ".concat(field.type));
  },

  /**
   * Determine if the model value exists
   * @param value
   * @returns {*}
   */
  checkRequired: function checkRequired(field, value) {
    return this.validate(VALIDATORS.REQUIRED, field, value);
  },

  /**
   * Determine if the model value passes the min/max check
   * @param field
   * @param value
   * @returns {*}
   */
  checkNumeric: function checkNumeric(field, value) {
    return this.validate(VALIDATORS.NUMERIC, field, value);
  },

  /**
   * Determine if the model value matches the regex pattern
   * @param field
   * @param value
   * @returns {boolean}
   */
  checkPattern: function checkPattern(field, value) {
    return _getStatus(!field.pattern.test(value));
  }
};
exports.default = _default;