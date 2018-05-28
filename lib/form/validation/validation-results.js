'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _validationService = require('../service/validation-service');

var _validationService2 = _interopRequireDefault(_validationService);

var _formConst = require('../config/form-const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidationResults = function () {
    function ValidationResults() {
        _classCallCheck(this, ValidationResults);

        this.validationMap = {}; // Map keyed by tag; each entry is an array of validation messages
        this.validationStateMap = {}; // Map keyed by tag; each entry is the most severe status for the tag
        this.actionMap = {}; // Map keyed by action; each entry is the most severe status for that action
        this.overallStatus = {}; // Holds the aggregated status of the results
    }

    /**
     * Clear validation results
     */


    _createClass(ValidationResults, [{
        key: 'clear',
        value: function clear() {
            this.validationMap = {};
            this.validationStateMap = {};
            this.actionMap = {};
            this.overallStatus = _formConst.VALIDATION_CONST.STATUS.OK;
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

    }, {
        key: 'addValidationMessage',
        value: function addValidationMessage(tag, type, status, message, actions) {
            var _this = this;

            // Create a messages list if it doesn't exist
            var messages = this.validationMap[tag];
            if (!messages) {
                messages = [];
                this.validationMap[tag] = messages;
            }

            // Create the validation message
            var validationMessage = {
                tag: tag,
                type: type,
                status: status,
                message: message,
                rank: _formConst.VALIDATION_CONST.STATUS_RANKS[status]
            };

            messages.push(validationMessage);

            // Handle actions
            if (actions) {
                // Force to array if single value
                if (!(0, _isArray3.default)(actions)) {
                    actions = [actions];
                }

                // Add actions to message
                validationMessage.actions = actions;

                // Update the actions with the most severe error
                actions.forEach(function (action) {
                    var currentStatus = _this.actionMap[action] || _formConst.VALIDATION_CONST.STATUS.OK;
                    if (_validationService2.default.isMoreSevereStatus(status, currentStatus)) {
                        _this.actionMap[action] = status;
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

    }, {
        key: 'getResults',
        value: function getResults(tag) {
            return {
                status: this.validationStateMap[tag] || _formConst.VALIDATION_CONST.STATUS.OK,
                messages: this.validationMap[tag] || []
            };
        }

        /**
         * Perform some post-processing on the validation results. This is
         * where we determine the most severe status per tag, along with
         * setting the overall status of the validation results.
         */

    }, {
        key: 'postProcess',
        value: function postProcess() {
            var _this2 = this;

            var overallStatus = _formConst.VALIDATION_CONST.STATUS.OK;
            Object.keys(this.validationMap).forEach(function (key) {
                var messages = _this2.validationMap[key];
                // Get most severe status for tag
                var status = _validationService2.default.getMostSevereStatus(messages);
                _this2.validationStateMap[key] = status;

                // Update overall status of more severe
                if (_validationService2.default.isMoreSevereStatus(status, overallStatus)) {
                    _this2.overallStatus = status;
                }
            });
        }

        /**
         * Convenience function for adding a "Missing Required" validation message
         * @param tag
         * @param message
         * @param actions
         */

    }, {
        key: 'addMissingRequired',
        value: function addMissingRequired(tag, message, actions) {
            this.addValidationMessage(tag, _formConst.VALIDATION_CONST.TYPE.REQUIRED, _formConst.VALIDATION_CONST.STATUS.ERROR, message, actions);
        }

        /**
         * Convenience function for adding an "Invalid Value" validation message
         * @param tag
         * @param message
         * @param actions
         */

    }, {
        key: 'addInvalidValue',
        value: function addInvalidValue(tag, message, actions) {
            this.addValidationMessage(tag, _formConst.VALIDATION_CONST.TYPE.INVALID_VALUE, _formConst.VALIDATION_CONST.STATUS.ERROR, message, actions);
        }

        /**
         * Return the aggregated validation results status
         * @returns {boolean}
         */

    }, {
        key: 'hasError',
        value: function hasError() {
            return this.overallStatus === _formConst.VALIDATION_CONST.STATUS.ERROR;
        }
    }]);

    return ValidationResults;
}();

exports.default = ValidationResults;