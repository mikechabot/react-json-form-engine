import VALIDATION_CONST from './validation-const';
import { __hasValue, __blank } from '../../common/common';
import _ from 'lodash';

function commonCheck (field, value) {
    return __blank(value)
        ? VALIDATION_CONST.STATUS.ERROR
        : VALIDATION_CONST.STATUS.OK;
}

/**
 * Map keyed by validator type. Each entry is a map
 * of validation function keyed by field type
 * @type
 */
const validators = {
    REQUIRED: {
        'string' : commonCheck,
        'date'   : commonCheck,
        'boolean': () => {
            return VALIDATION_CONST.STATUS.OK;
        },
        'number': (field, value) => {
            if (Number.isNaN(value)) return VALIDATION_CONST.STATUS.ERROR;
            return VALIDATION_CONST.STATUS.OK;
        },
        'array': (field, value) => {
            if (_.isEmpty(value)) return VALIDATION_CONST.STATUS.ERROR;
            return VALIDATION_CONST.STATUS.OK;
        }
    },
    NUMERIC: {
        'number': (field, value) => {
            if (__hasValue(field.min) && value < field.min) return VALIDATION_CONST.STATUS.ERROR;
            if (__hasValue(field.max) && value > field.max) return VALIDATION_CONST.STATUS.ERROR;
        }
    }
};

export default {
    /**
     * Return a validation error if the field doesn't pass the
     * required value check
     * @param field
     * @param value
     */
    checkRequired (field, value) {
        return this.validate(validators.REQUIRED, field, value);
    },
    /**
     * Return a validation error if the field doesn't pass the
     * numeric validation check
     * @param field
     * @param value
     */
    checkNumeric (field, value) {
        return this.validate(validators.NUMERIC, field, value);
    },
    /**
     * Return a validation error if the field doesn't pass the
     * regular expression validation check
     * @param field
     * @param value
     */
    checkPattern (field, value) {
        return field.pattern.test(value);
    },
    validate (validators, field, value) {
        const validator = validators[field.type];
        if (validator) {
            return validator(field, value);
        }
        console.warn(`No type validator found for type: ${field.type}`);
    }
};
