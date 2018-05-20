import { PROPERTY, DATA_TYPE } from '../config/form-const';
import ValidationService from '../service/validation-service';
import validators from './form-validators';
import { __hasValue } from '../../common';

const { FIELD } = PROPERTY;

function __isError(status) {
    return ValidationService.isError(status);
}

export default {
    validate (instance, validationResults) {
        instance.getFields().forEachValue(field => {
            const id = field[FIELD.ID];

            // Get model value
            const value = instance.getModelValue(id);

            let isVisible = false;
            if (field[FIELD.SHOW_CONDITION]) {
                isVisible = instance.evaluateFieldShowCondition(field);
            }

            if (__hasValue(value) || isVisible) {
                // Check required status
                if (field[FIELD.REQUIRED]) {
                    const requiredStatus = validators.checkRequired(field, value);
                    if (__isError(requiredStatus)) {
                        validationResults.addMissingRequired(id, 'Missing required value', 'SUBMIT');
                    }
                }

                // Check numeric validation
                if (field[FIELD.TYPE] === DATA_TYPE.NUMBER) {
                    const numericStatus = validators.checkNumeric(field, value);
                    if (__isError(numericStatus)) {
                        validationResults.addInvalidValue(id, 'Invalid numeric value', 'SUBMIT');
                    }
                }

                // Check regex pattern
                if (field[FIELD.PATTERN]) {
                    const conditionMet = validators.checkPattern(field, value);
                    if (!conditionMet) {
                        validationResults.addInvalidValue(id, 'Value doesn\'t match the supplied pattern', 'SUBMIT');
                    }
                }
            }
        });
    }
};
