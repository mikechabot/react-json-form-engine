import VALIDATION_CONST from './validation-const';
import ValidationService from './form-validation-service';
import _ from 'lodash';

class ValidationResults {
    constructor () {
        this.validationMap = {};   // Map keyed by tag; each entry is an array of validation messages
        this.validationStateMap = {};   // Map keyed by tag; each entry is the most severe status for the tag
        this.actionMap = {};   // Map keyed by action; each entry is the most severe status for that action
        this.overallStatus = {};   // Holds the aggregated status of the results
    }

    /**
     * Clear validation results
     */
    clear () {
        this.validationMap = {};
        this.validationStateMap = {};
        this.actionMap = {};
        this.overallStatus = VALIDATION_CONST.STATUS.OK;
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
    addValidationMessage (tag, type, status, message, actions) {
        // Create a messages list if it doesn't exist
        let messages = this.validationMap[tag];
        if (!messages) {
            messages = [];
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

        messages.push(validationMessage);

        // Handle actions
        if (actions) {
            // Force to array if single value
            if (!_.isArray(actions)) {
                actions = [actions];
            }

            // Add actions to message
            validationMessage.actions = actions;

            // Update the actions with the most severe error
            _.forEach(actions, action => {
                const currentStatus = this.actionMap[action] || VALIDATION_CONST.STATUS.OK;
                if (ValidationService.isMoreSevereStatus(status, currentStatus)) {
                    this.actionMap[action] = status;
                }
            });
        }
    }

    /**
     * Create results object that contains the most severe status for the tag and
     * and array of validation messages
     * @param tag
     * @returns {{status: (*|string), messages: (*|Array)}}
     */
    getResults (tag) {
        return {
            status  : this.validationStateMap[tag] || VALIDATION_CONST.STATUS.OK,
            messages: this.validationMap[tag] || []
        };
    }

    /**
     * Perform some post-processing on the validation results. This is
     * where we determine the most severe status per tag, along with
     * setting the overall status of the validation results.
     */
    postProcess () {
        let overallStatus = VALIDATION_CONST.STATUS.OK;
        _.forEach(this.validationMap, (messages, tag) => {
            // Get most severe status for tag
            const status = ValidationService.getMostSevereStatus(messages);
            this.validationStateMap[tag] = status;

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
    addMissingRequired (tag, message, actions) {
        this.addValidationMessage(
            tag,
            VALIDATION_CONST.TYPE.REQUIRED,
            VALIDATION_CONST.STATUS.ERROR,
            message,
            actions
        );
    }

    /**
     * Convenience function for adding an "Invalid Value" validation message
     * @param tag
     * @param message
     * @param actions
     */
    addInvalidValue (tag, message, actions) {
        this.addValidationMessage(
            tag,
            VALIDATION_CONST.TYPE.INVALID_VALUE,
            VALIDATION_CONST.STATUS.ERROR,
            message,
            actions
        );
    }

    /**
     * Return the aggregated validation results status
     * @returns {boolean}
     */
    hasError () {
        return this.overallStatus === VALIDATION_CONST.STATUS.ERROR;
    }
}

export default ValidationResults;
