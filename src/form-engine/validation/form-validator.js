import isNil from 'lodash/isNil';

import { PROPERTY, DATA_TYPE, VALIDATION_CONST } from '../config/form-const';
import ValidationService from '../service/validation-service';
import Validators from './form-validators';

const { FIELD } = PROPERTY;
const { NUMBER, DATE, BOOLEAN, ARRAY, STRING } = DATA_TYPE;

/**
 * All validation errors are currently tied to
 * the "Submit" button, but this can be extended
 * to tie errors to a possible "Next" button, which
 * would inhibit a user from progressing to the next
 * stage of a form.
 * @type {{SUBMIT: string}}
 */
const ACTIONS = {
    SUBMIT: 'SUBMIT'
};

const isRequired = field => `${field.title} is required.`;

export const VALIDATION_MESSAGE = {
    REQUIRED: {
        [STRING]: isRequired,
        [NUMBER]: isRequired,
        [DATE]: isRequired,
        [ARRAY]: field => `${field.title} requires at least one option be selected`,
        [BOOLEAN]: isRequired
    },
    INVALID_REGEX: field => `The value must match the supplied pattern: ${field[FIELD.PATTERN]}`,
    NUMERIC: field => {
        if (!isNil(field.min) && !isNil(field.max)) {
            return `${field.title} must be between ${field.min} and ${field.max}`;
        }
        if (!isNil(field.min)) return `${field.title} must be greater than ${field.min}`;
        return `${field.title} must be less than ${field.max}`;
    },
    [VALIDATION_CONST.TYPE.MISSING_REQUIRED]: 'This field cannot be empty',
    [VALIDATION_CONST.TYPE.INVALID_NUMERIC]: 'Invalid numeric value'
};

const isError = status => ValidationService.isError(status);

const runValidators = (field, value, validationResults) => {
    const id = field[FIELD.ID];

    // Check required status
    if (field[FIELD.REQUIRED]) {
        if (isError(Validators.checkRequired(field, value))) {
            validationResults.addMissingRequired(
                id,
                ACTIONS.SUBMIT,
                VALIDATION_MESSAGE.REQUIRED[field.type](field)
            );
        } else {
            validationResults.removeMissingRequired(id, ACTIONS.SUBMIT);
        }
    }

    if (field[FIELD.TYPE] === DATA_TYPE.NUMBER) {
        if (isError(Validators.checkNumeric(field, value))) {
            validationResults.addInvalidNumeric(id, ACTIONS.SUBMIT, VALIDATION_MESSAGE.NUMERIC(field));
        } else {
            validationResults.removeInvalidNumeric(id, ACTIONS.SUBMIT);
        }
    }

    if (field[FIELD.PATTERN]) {
        if (isError(Validators.checkPattern(field, value))) {
            validationResults.addInvalidRegex(id, ACTIONS.SUBMIT, VALIDATION_MESSAGE.INVALID_REGEX(field));
        } else {
            validationResults.removeInvalidRegex(id, ACTIONS.SUBMIT);
        }
    }
};

export default {
    /**
     * Validate the form instance
     *
     * When "liveValidation" is enabled on the instance, we perform non-comprehensive
     * validation on all visible fields, that is, those that do not have a "showCondition"
     * and those that do have a "showCondition" and are also visible.
     *
     * When a form is submitted, we perform comprehensive validation on all visible fields.
     *
     * If a form is submitted, but the user returns to the form to fix the validation errors,
     * we continue to perform non-comprehensive validation, but don't append messages to
     * validationResults if the field still fails the validation check.
     *
     * @param instance
     * @param comprehensive
     * @returns {ValidationResults}
     */
    validate(instance, validationResults, comprehensive = false) {
        instance.getFields().forEachValue(field => {
            // If the field isn't dirty (i.e. not touched), and we
            // aren't performing comprehensive validation, just return.
            if (!field.dirty && !comprehensive) {
                return;
            }

            // If the field has a showCondition, but isn't visible
            // then return regardless of whether a comprehensive check.
            if (field[FIELD.SHOW_CONDITION] && instance.isVisible(field)) {
                return;
            }

            // Get the form response
            const value = instance.getModelValue(field[FIELD.ID]);

            runValidators(field, value, validationResults);
        });

        // Determine the most severe status
        validationResults.postProcess();

        return validationResults;
    }
};
