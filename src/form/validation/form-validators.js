import _isEmpty from 'lodash/isEmpty';
import { __hasValue, __isBlank } from '../../common';
import { DATA_TYPE, VALIDATION_CONST } from '../config/form-const';

function _getStatus(errorCondition) {
    return errorCondition ? VALIDATION_CONST.STATUS.ERROR : VALIDATION_CONST.STATUS.OK;
}

/**
 * Available VALIDATORS keyed by validation type. Each validation type
 * may contain one or more data types.
 * @type {{REQUIRED: {}, NUMERIC: {}}}
 */
const VALIDATORS = {
    REQUIRED: {
        [DATA_TYPE.ARRAY]: (field, value) => _getStatus(_isEmpty(value)),
        [DATA_TYPE.BOOLEAN]: () => VALIDATION_CONST.STATUS.OK,
        [DATA_TYPE.DATE]: (field, value) => _getStatus(__isBlank(value)),
        [DATA_TYPE.NUMBER]: (field, value) => _getStatus(Number.isNaN(value)),
        [DATA_TYPE.STRING]: (field, value) => _getStatus(__isBlank(value))
    },
    NUMERIC: {
        [DATA_TYPE.NUMBER]: (field, value) => {
            if (__hasValue(field.min) && value < field.min) return VALIDATION_CONST.STATUS.ERROR;
            if (__hasValue(field.max) && value > field.max) return VALIDATION_CONST.STATUS.ERROR;
        }
    }
};

export default {
    /**
     * Invoke a validator based on field data type
     * @param validators
     * @param field
     * @param value
     * @returns {*}
     */
    validate(validators, field, value) {
        const validator = validators[field.type];
        if (validator) {
            return validator(field, value);
        }
        console.warn(`No type validator found for type: ${field.type}`);
    },
    /**
     * Determine if the model value exists
     * @param value
     * @returns {*}
     */
    checkRequired(field, value) {
        return this.validate(VALIDATORS.REQUIRED, field, value);
    },
    /**
     * Determine if the model value passes the min/max check
     * @param field
     * @param value
     * @returns {*}
     */
    checkNumeric(field, value) {
        return this.validate(VALIDATORS.NUMERIC, field, value);
    },
    /**
     * Determine if the model value matches the regex pattern
     * @param field
     * @param value
     * @returns {boolean}
     */
    checkPattern(field, value) {
        return field.pattern.test(value);
    }
};
