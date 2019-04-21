import isEmpty from 'lodash/isEmpty';

import ValidationService from '../service/validation-service';
import { VALIDATION_CONST } from '../config/form-const';

const {
    TYPE: { MISSING_REQUIRED, INVALID_NUMERIC, INVALID_REGEX },
    STATUS: { OK, ERROR }
} = VALIDATION_CONST;

class ValidationResults {
    constructor() {
        this.validationMap = {}; // Map keyed by tag; each entry is an array of validation messages
        this.validationStateMap = {}; // Map keyed by tag; each entry is the most severe status for the tag
        this.actionMap = {}; // Map keyed by action; each entry is the most severe status for that action
        this.overallStatus = {}; // Holds the aggregated status of the results
    }

    /**
     * Add a validation message to the results object. Validation messages
     * are associated to form fields via the tag property.
     * @param tag
     * @param type
     * @param status
     * @param message
     * @param actions
     */
    addValidationMessage(tag, type, status, message, actions) {
        // Create a messages list if it doesn't exist
        let messages = this.validationMap[tag];
        if (!messages) {
            messages = {};
            this.validationMap[tag] = messages;
        }

        // Create the validation message
        const validationMessage = {
            tag,
            type,
            status,
            message,
            rank: VALIDATION_CONST.STATUS_RANKS[status]
        };

        messages[type] = validationMessage;

        // Handle actions
        if (actions) {
            // Force to array if single value
            if (!Array.isArray(actions)) {
                actions = [actions];
            }

            // Add actions to message
            validationMessage.actions = actions;

            // Update the actions with the most severe error
            actions.forEach(action => {
                const currentStatus = this.actionMap[action] || OK;
                if (ValidationService.isMoreSevereStatus(status, currentStatus)) {
                    this.actionMap[action] = status;
                }
            });
        }
    }

    removeValidationMessage(tag, type) {
        const messages = this.validationMap[tag];

        delete messages[type];

        if (isEmpty(messages)) {
            delete this.validationMap[tag];
            delete this.validationStateMap[tag];

            // Reset the overallStatus if no errors are detected
            if (isEmpty(this.validationMap) && isEmpty(this.validationStateMap)) {
                this.overallStatus = OK;
            }
        }
    }

    /**
     * Create results object that contains the most severe status for the tag and
     * and array of validation messages
     * @param tag
     * @returns {{status: (*|string), messages: (*|Array)}}
     */
    getResults(tag) {
        return {
            status: this.validationStateMap[tag] || OK,
            messages: this.validationMap[tag] || {}
        };
    }

    getMessagesByTag(tag) {
        return this.getResults(tag).messages;
    }

    hasMessageType(tag, type) {
        return Boolean(this.getMessagesByTag(tag)[type]);
    }

    hasExistingMessage(tag, message) {
        return Boolean(this.getMessagesByTag(tag).find(m => m.message === message));
    }

    /**
     * Perform some post-processing on the validation results. This is
     * where we determine the most severe status per tag, along with
     * setting the overall status of the validation results.
     */
    postProcess() {
        let overallStatus = OK;
        Object.keys(this.validationMap).forEach(key => {
            const messages = this.validationMap[key];
            // Get most severe status for tag
            const status = ValidationService.getMostSevereStatus(messages);
            this.validationStateMap[key] = status;

            // Update overall status of more severe
            if (ValidationService.isMoreSevereStatus(status, overallStatus)) {
                this.overallStatus = status;
            }
        });
    }

    /**
     * Convenience function for adding a "Missing Required" validation message
     * @param tag
     * @param message
     * @param actions
     */
    addMissingRequired(tag, actions, message) {
        if (!this.hasMessageType(tag, MISSING_REQUIRED)) {
            this.addValidationMessage(tag, MISSING_REQUIRED, ERROR, message, actions);
        }
    }

    /**
     * Remove a MISSING_REQUIRED error from a tag if it exists
     * @param tag
     * @param actions
     */
    removeMissingRequired(tag, actions) {
        if (this.hasMessageType(tag, MISSING_REQUIRED)) {
            this.removeValidationMessage(tag, MISSING_REQUIRED, ERROR, actions);
        }
    }

    /**
     * Convenience function for adding an "Invalid Numeric" validation message
     * @param tag
     * @param message
     * @param actions
     */
    addInvalidNumeric(tag, actions, message) {
        if (!this.hasMessageType(tag, INVALID_NUMERIC)) {
            this.addValidationMessage(tag, INVALID_NUMERIC, ERROR, message, actions);
        }
    }

    /**
     * Remove an INVALID_NUMERIC error from a tag if it exists
     * @param tag
     * @param actions
     */
    removeInvalidNumeric(tag, actions) {
        if (this.hasMessageType(tag, INVALID_NUMERIC)) {
            this.removeValidationMessage(tag, INVALID_NUMERIC, ERROR, actions);
        }
    }

    /**
     * Convenience function for adding an "Invalid Regex" validation message
     * @param tag
     * @param message
     * @param actions
     */
    addInvalidRegex(tag, actions, message) {
        if (!this.hasMessageType(tag, INVALID_REGEX)) {
            this.addValidationMessage(tag, INVALID_REGEX, ERROR, message, actions);
        }
    }

    /**
     * Remove an INVALID_REGEX error from a tag if it exists
     * @param tag
     * @param actions
     */
    removeInvalidRegex(tag, actions) {
        if (this.hasMessageType(tag, INVALID_REGEX)) {
            this.removeValidationMessage(tag, INVALID_REGEX, ERROR, actions);
        }
    }

    /**
     * Return the aggregated validation results status
     * @returns {boolean}
     */
    hasError() {
        return this.overallStatus === ERROR;
    }
}

export default ValidationResults;
