'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _formConst = require('../config/form-const');

var _validationService = require('../service/validation-service');

var _validationService2 = _interopRequireDefault(_validationService);

var _formValidators = require('./form-validators');

var _formValidators2 = _interopRequireDefault(_formValidators);

var _common = require('../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELD = _formConst.PROPERTY.FIELD;


function __isError(status) {
    return _validationService2.default.isError(status);
}

exports.default = {
    validate: function validate(instance, validationResults) {
        instance.getFields().forEachValue(function (field) {
            var id = field[FIELD.ID];

            // Get model value
            var value = instance.getModelValue(id);

            var isVisible = false;
            if (field[FIELD.SHOW_CONDITION]) {
                isVisible = instance.evaluateFieldShowCondition(field);
            }

            if ((0, _common.__hasValue)(value) || isVisible) {
                // Check required status
                if (field[FIELD.REQUIRED]) {
                    var requiredStatus = _formValidators2.default.checkRequired(field, value);
                    if (__isError(requiredStatus)) {
                        validationResults.addMissingRequired(id, 'Missing required value.', 'SUBMIT');
                    }
                }

                // Check numeric validation
                if (field[FIELD.TYPE] === _formConst.DATA_TYPE.NUMBER) {
                    var numericStatus = _formValidators2.default.checkNumeric(field, value);
                    if (__isError(numericStatus)) {
                        validationResults.addInvalidValue(id, 'Invalid numeric value.', 'SUBMIT');
                    }
                }

                // Check regex pattern
                if (field[FIELD.PATTERN]) {
                    var conditionMet = _formValidators2.default.checkPattern(field, value);
                    if (!conditionMet) {
                        validationResults.addInvalidValue(id, 'Value doesn\'t match the supplied pattern.', 'SUBMIT');
                    }
                }
            }
        });
    }
};