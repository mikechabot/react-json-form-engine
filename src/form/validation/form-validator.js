import { FIELD_TYPE_KEYS } from '../config/form-const';
import validators from './form-validators';
import { __hasValue } from '../../common/common';
import _ from 'lodash';

export default {
    validate (instance, validationResults) {
        const { fields } = instance;
        _.forEach(fields, (field, tag) => {
            // Get model value
            const value = instance.getModelValue(tag);

            let isVisible = false;
            if (field.showCondition) {
                isVisible = instance.evaluateShowCondition(field, tag);
            }

            if (__hasValue(value) || isVisible) {
                // Check required status
                if (field.required) {
                    const requiredStatus = validators.checkRequired(field, value);
                    if (instance.isError(requiredStatus)) {
                        validationResults.addMissingRequired(tag, 'Missing required value', 'SUBMIT');
                    }
                }

                // Check numeric validation
                if (field.type === FIELD_TYPE_KEYS.NUMBER) {
                    const numericStatus = validators.checkNumeric(field, value);
                    if (instance.isError(numericStatus)) {
                        validationResults.addInvalidValue(tag, 'Invalid numeric value', 'SUBMIT');
                    }
                }

                // Check regex pattern
                if (field.pattern) {
                    const conditionMet = validators.checkPattern(field, value);
                    if (!conditionMet) {
                        validationResults.addInvalidValue(tag, 'Value doesn\'t match the supplied pattern', 'SUBMIT');
                    }
                }
            }
        });
    }
};
