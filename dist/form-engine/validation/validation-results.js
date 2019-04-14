"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _validationService = _interopRequireDefault(require("../service/validation-service"));

var _formConst = require("../config/form-const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _VALIDATION_CONST$TYP = _formConst.VALIDATION_CONST.TYPE,
    MISSING_REQUIRED = _VALIDATION_CONST$TYP.MISSING_REQUIRED,
    INVALID_NUMERIC = _VALIDATION_CONST$TYP.INVALID_NUMERIC,
    INVALID_REGEX = _VALIDATION_CONST$TYP.INVALID_REGEX,
    _VALIDATION_CONST$STA = _formConst.VALIDATION_CONST.STATUS,
    OK = _VALIDATION_CONST$STA.OK,
    ERROR = _VALIDATION_CONST$STA.ERROR;

var ValidationResults =
/*#__PURE__*/
function () {
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
    key: "clear",
    value: function clear() {
      this.validationMap = {};
      this.validationStateMap = {};
      this.actionMap = {};
      this.overallStatus = OK;
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
    key: "addValidationMessage",
    value: function addValidationMessage(tag, type, status, message, actions) {
      var _this = this;

      // Create a messages list if it doesn't exist
      var messages = this.validationMap[tag];

      if (!messages) {
        messages = {};
        this.validationMap[tag] = messages;
      } // Create the validation message


      var validationMessage = {
        tag: tag,
        type: type,
        status: status,
        message: message,
        rank: _formConst.VALIDATION_CONST.STATUS_RANKS[status]
      };
      messages[type] = validationMessage; // Handle actions

      if (actions) {
        // Force to array if single value
        if (!Array.isArray(actions)) {
          actions = [actions];
        } // Add actions to message


        validationMessage.actions = actions; // Update the actions with the most severe error

        actions.forEach(function (action) {
          var currentStatus = _this.actionMap[action] || OK;

          if (_validationService.default.isMoreSevereStatus(status, currentStatus)) {
            _this.actionMap[action] = status;
          }
        });
      }
    }
  }, {
    key: "removeValidationMessage",
    value: function removeValidationMessage(tag, type) {
      var messages = this.validationMap[tag];
      delete messages[type];

      if ((0, _isEmpty.default)(messages)) {
        delete this.validationMap[tag];
        delete this.validationStateMap[tag]; // Reset the overallStatus if no errors are detected

        if ((0, _isEmpty.default)(this.validationMap) && (0, _isEmpty.default)(this.validationStateMap)) {
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

  }, {
    key: "getResults",
    value: function getResults(tag) {
      return {
        status: this.validationStateMap[tag] || OK,
        messages: this.validationMap[tag] || {}
      };
    }
  }, {
    key: "getMessagesByTag",
    value: function getMessagesByTag(tag) {
      return this.getResults(tag).messages;
    }
  }, {
    key: "hasMessageType",
    value: function hasMessageType(tag, type) {
      return Boolean(this.getMessagesByTag(tag)[type]);
    }
  }, {
    key: "hasExistingMessage",
    value: function hasExistingMessage(tag, message) {
      return Boolean(this.getMessagesByTag(tag).find(function (m) {
        return m.message === message;
      }));
    }
    /**
     * Perform some post-processing on the validation results. This is
     * where we determine the most severe status per tag, along with
     * setting the overall status of the validation results.
     */

  }, {
    key: "postProcess",
    value: function postProcess() {
      var _this2 = this;

      var overallStatus = OK;
      Object.keys(this.validationMap).forEach(function (key) {
        var messages = _this2.validationMap[key]; // Get most severe status for tag

        var status = _validationService.default.getMostSevereStatus(messages);

        _this2.validationStateMap[key] = status; // Update overall status of more severe

        if (_validationService.default.isMoreSevereStatus(status, overallStatus)) {
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
    key: "addMissingRequired",
    value: function addMissingRequired(tag, actions) {
      if (!this.hasMessageType(tag, MISSING_REQUIRED)) {
        this.addValidationMessage(tag, MISSING_REQUIRED, ERROR, _formConst.VALIDATION_MESSAGE[MISSING_REQUIRED], actions);
      }
    }
  }, {
    key: "removeMissingRequired",
    value: function removeMissingRequired(tag, actions) {
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

  }, {
    key: "addInvalidNumeric",
    value: function addInvalidNumeric(tag, actions) {
      if (!this.hasMessageType(tag, INVALID_NUMERIC)) {
        this.addValidationMessage(tag, INVALID_NUMERIC, ERROR, _formConst.VALIDATION_MESSAGE[INVALID_NUMERIC], actions);
      }
    }
  }, {
    key: "removeInvalidNumeric",
    value: function removeInvalidNumeric(tag, actions) {
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

  }, {
    key: "addInvalidRegex",
    value: function addInvalidRegex(tag, actions, pattern) {
      if (!this.hasMessageType(tag, INVALID_REGEX)) {
        var message = "".concat(_formConst.VALIDATION_MESSAGE[INVALID_REGEX], ": ").concat(pattern);
        this.addValidationMessage(tag, INVALID_REGEX, ERROR, message, actions);
      }
    }
  }, {
    key: "removeInvalidRegex",
    value: function removeInvalidRegex(tag, actions) {
      if (this.hasMessageType(tag, INVALID_REGEX)) {
        this.removeValidationMessage(tag, INVALID_REGEX, ERROR, actions);
      }
    }
    /**
     * Return the aggregated validation results status
     * @returns {boolean}
     */

  }, {
    key: "hasError",
    value: function hasError() {
      return this.overallStatus === ERROR;
    }
  }]);

  return ValidationResults;
}();

var _default = ValidationResults;
exports.default = _default;