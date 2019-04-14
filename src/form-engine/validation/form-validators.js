import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { isBlank } from '../../common';
import { DATA_TYPE, VALIDATION_CONST } from '../config/form-const';

const {
    STATUS: { OK, ERROR }
} = VALIDATION_CONST;

const { ARRAY, BOOLEAN, DATE, NUMBER, STRING } = DATA_TYPE;

function getStatus(errorCondition) {
    return errorCondition ? ERROR : OK;
}

/**
 * Available VALIDATORS keyed by validation type. Each validation type
 * may contain one or more data types.
 * @type {{REQUIRED: {}, NUMERIC: {}}}
 */
const VALIDATORS = {
    REQUIRED: {
        [ARRAY]: (field, value) => getStatus(isEmpty(value)),
        [BOOLEAN]: (field, value) => {
            if (!field.options) return OK;
            return getStatus(isNil(value));
        },
        [DATE]: (field, value) => getStatus(isBlank(value)),
        [NUMBER]: (field, value) => {
            return field.dirty ? getStatus(Number.isNaN(value)) : getStatus(isNil(value));
        },
        [STRING]: (field, value) => getStatus(isBlank(value))
    },
    NUMERIC: {
        [NUMBER]: (field, value) => {
            if (isNil(field.min) && isNil(field.max)) return OK;
            if (!field.dirty) return getStatus(isNil(value));
            return getStatus(value < field.min || value > field.max);
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
        return getStatus(!field.pattern.test(value));
    }
};
