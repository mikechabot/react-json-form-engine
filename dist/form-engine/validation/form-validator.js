"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VALIDATION_MESSAGE = void 0;

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _formConst = require("../config/form-const");

var _validationService = _interopRequireDefault(require("../service/validation-service"));

var _formValidators = _interopRequireDefault(require("./form-validators"));

var _REQUIRED, _VALIDATION_MESSAGE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FIELD = _formConst.PROPERTY.FIELD;
var NUMBER = _formConst.DATA_TYPE.NUMBER,
    DATE = _formConst.DATA_TYPE.DATE,
    BOOLEAN = _formConst.DATA_TYPE.BOOLEAN,
    ARRAY = _formConst.DATA_TYPE.ARRAY,
    STRING = _formConst.DATA_TYPE.STRING;
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

var isRequired = function isRequired(field) {
  return "".concat(field.title, " is required.");
};

var VALIDATION_MESSAGE = (_VALIDATION_MESSAGE = {
  REQUIRED: (_REQUIRED = {}, _defineProperty(_REQUIRED, STRING, isRequired), _defineProperty(_REQUIRED, NUMBER, isRequired), _defineProperty(_REQUIRED, DATE, isRequired), _defineProperty(_REQUIRED, ARRAY, function (field) {
    return "".concat(field.title, " requires at least one option be selected");
  }), _defineProperty(_REQUIRED, BOOLEAN, isRequired), _REQUIRED),
  INVALID_REGEX: function INVALID_REGEX(field) {
    return "The value must match the supplied pattern: ".concat(field[FIELD.PATTERN]);
  },
  NUMERIC: function NUMERIC(field) {
    if (!(0, _isNil.default)(field.min) && !(0, _isNil.default)(field.max)) {
      return "".concat(field.title, " must be between ").concat(field.min, " and ").concat(field.max);
    }

    if (!(0, _isNil.default)(field.min)) return "".concat(field.title, " must be greater than ").concat(field.min);
    return "".concat(field.title, " must be less than ").concat(field.max);
  }
}, _defineProperty(_VALIDATION_MESSAGE, _formConst.VALIDATION_CONST.TYPE.MISSING_REQUIRED, 'This field cannot be empty'), _defineProperty(_VALIDATION_MESSAGE, _formConst.VALIDATION_CONST.TYPE.INVALID_NUMERIC, 'Invalid numeric value'), _VALIDATION_MESSAGE);
exports.VALIDATION_MESSAGE = VALIDATION_MESSAGE;

var isError = function isError(status) {
  return _validationService.default.isError(status);
};

var runValidators = function runValidators(field, value, validationResults) {
  var id = field[FIELD.ID]; // Check required status

  if (field[FIELD.REQUIRED]) {
    if (isError(_formValidators.default.checkRequired(field, value))) {
      validationResults.addMissingRequired(id, ACTIONS.SUBMIT, VALIDATION_MESSAGE.REQUIRED[field.type](field));
    } else {
      validationResults.removeMissingRequired(id, ACTIONS.SUBMIT);
    }
  } // Min/max


  if (field[FIELD.TYPE] === _formConst.DATA_TYPE.NUMBER && !(0, _isNil.default)(value)) {
    if (isError(_formValidators.default.checkNumeric(field, value))) {
      validationResults.addInvalidNumeric(id, ACTIONS.SUBMIT, VALIDATION_MESSAGE.NUMERIC(field));
    } else {
      validationResults.removeInvalidNumeric(id, ACTIONS.SUBMIT);
    }
  }

  if (field[FIELD.PATTERN]) {
    if (isError(_formValidators.default.checkPattern(field, value))) {
      validationResults.addInvalidRegex(id, ACTIONS.SUBMIT, VALIDATION_MESSAGE.INVALID_REGEX(field));
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
    var fields = instance.getFields();
    Object.keys(fields).forEach(function (fieldId) {
      var field = fields[fieldId]; // If the field isn't dirty (i.e. not touched), and we
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