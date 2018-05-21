'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _REQUIRED;

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _common = require('../../common');

var _formConst = require('../config/form-const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _getStatus(errorCondition) {
    return errorCondition ? _formConst.VALIDATION_CONST.STATUS.ERROR : _formConst.VALIDATION_CONST.STATUS.OK;
}

/**
 * Available VALIDATORS keyed by validation type. Each validation type
 * may contain one or more data types.
 * @type {{REQUIRED: {}, NUMERIC: {}}}
 */
var VALIDATORS = {
    REQUIRED: (_REQUIRED = {}, _defineProperty(_REQUIRED, _formConst.DATA_TYPE.ARRAY, function (field, value) {
        return _getStatus((0, _isEmpty3.default)(value));
    }), _defineProperty(_REQUIRED, _formConst.DATA_TYPE.BOOLEAN, function () {
        return _formConst.VALIDATION_CONST.STATUS.OK;
    }), _defineProperty(_REQUIRED, _formConst.DATA_TYPE.DATE, function (field, value) {
        return _getStatus((0, _common.__blank)(value));
    }), _defineProperty(_REQUIRED, _formConst.DATA_TYPE.NUMBER, function (field, value) {
        return _getStatus(Number.isNaN(value));
    }), _defineProperty(_REQUIRED, _formConst.DATA_TYPE.STRING, function (field, value) {
        return _getStatus((0, _common.__blank)(value));
    }), _REQUIRED),
    NUMERIC: _defineProperty({}, _formConst.DATA_TYPE.NUMBER, function (field, value) {
        if ((0, _common.__hasValue)(field.min) && value < field.min) return _formConst.VALIDATION_CONST.STATUS.ERROR;
        if ((0, _common.__hasValue)(field.max) && value > field.max) return _formConst.VALIDATION_CONST.STATUS.ERROR;
    })
};

exports.default = {
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
        console.warn('No type validator found for type: ' + field.type);
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
        return field.pattern.test(value);
    }
};