"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formConst = require("../config/form-const");

var _validationService = _interopRequireDefault(require("../service/validation-service"));

var _formValidators = _interopRequireDefault(require("./form-validators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELD = _formConst.PROPERTY.FIELD;
/**
 * All validation errors are currently tied to
 * the "Submit" button, but this can be extended
 * to tie errors to a possible "Next" button, which
 * would inhibit a user from progressing to the next
 * stage of a form.
 * @type {{SUBMIT: string}}
 */

var ACTIONS = {
  SUBMIT: 'SUBMIT'
};

var isError = function isError(status) {
  return _validationService.default.isError(status);
};

var runValidators = function runValidators(field, value, validationResults) {
  var id = field[FIELD.ID]; // Check required status

  if (field[FIELD.REQUIRED]) {
    if (isError(_formValidators.default.checkRequired(field, value))) {
      validationResults.addMissingRequired(id, ACTIONS.SUBMIT);
    } else {
      validationResults.removeMissingRequired(id, ACTIONS.SUBMIT);
    }
  }

  if (field[FIELD.TYPE] === _formConst.DATA_TYPE.NUMBER) {
    if (isError(_formValidators.default.checkNumeric(field, value))) {
      validationResults.addInvalidNumeric(id, ACTIONS.SUBMIT);
    } else {
      validationResults.removeInvalidNumeric(id, ACTIONS.SUBMIT);
    }
  }

  if (field[FIELD.PATTERN]) {
    if (isError(_formValidators.default.checkPattern(field, value))) {
      validationResults.addInvalidRegex(id, ACTIONS.SUBMIT, field[FIELD.PATTERN]);
    } else {
      validationResults.removeInvalidRegex(id, ACTIONS.SUBMIT);
    }
  }
};

var _default = {
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
  validate: function validate(instance, validationResults) {
    var comprehensive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    instance.getFields().forEachValue(function (field) {
      // If the field isn't dirty (i.e. not touched), and we
      // aren't performing comprehensive validation, just return.
      if (!field.dirty && !comprehensive) {
        return;
      } // If the field has a showCondition, but isn't visible
      // then return regardless of whether a comprehensive check.


      if (field[FIELD.SHOW_CONDITION] && instance.isVisible(field)) {
        return;
      } // Get the form response


      var value = instance.getModelValue(field[FIELD.ID]);
      runValidators(field, value, validationResults);
    }); // Determine the most severe status

    validationResults.postProcess();
    return validationResults;
  }
};
exports.default = _default;