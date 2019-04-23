"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _maybeBaby = _interopRequireDefault(require("maybe-baby"));

var _apiCheck = _interopRequireDefault(require("api-check"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _formConst = require("../config/form-const");

var _INVALID_TYPES_MESSAG;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FIELD = _formConst.PROPERTY.FIELD,
    SECTION = _formConst.PROPERTY.SECTION,
    SUBSECTION = _formConst.PROPERTY.SUBSECTION,
    DEFINITION = _formConst.PROPERTY.DEFINITION;
var STRING = _formConst.DATA_TYPE.STRING,
    NUMBER = _formConst.DATA_TYPE.NUMBER,
    ARRAY = _formConst.DATA_TYPE.ARRAY;
var RANGE = _formConst.COMPONENT_TYPE.RANGE,
    RADIO = _formConst.COMPONENT_TYPE.RADIO; // Configure api-check

var validator = (0, _apiCheck["default"])({
  output: {
    prefix: 'FormEngine:'
  }
});
var INVALID_TYPES_MESSAGE = (_INVALID_TYPES_MESSAG = {}, _defineProperty(_INVALID_TYPES_MESSAG, RADIO, "Field combination of data type \"".concat(STRING, "\" and component type \"").concat(RADIO, "\" requires all options have an \"id\"")), _defineProperty(_INVALID_TYPES_MESSAG, RANGE, "Field of component type \"".concat(RANGE, "\" is missing required min/max values")), _defineProperty(_INVALID_TYPES_MESSAG, "NUMBER_EQUALS", "Field of data type \"".concat(NUMBER, "\" cannot have an equal min/max value")), _defineProperty(_INVALID_TYPES_MESSAG, "NUMBER_DIFF", "Field of data type \"".concat(NUMBER, "\" cannot have a min value less than the max")), _defineProperty(_INVALID_TYPES_MESSAG, "ARRAY_OPTIONS", "Field of data type \"".concat(ARRAY, "\" is missing required \"options\" array")), _defineProperty(_INVALID_TYPES_MESSAG, "ARRAY_OPTION_ID", "Field of data type \"".concat(ARRAY, "\" contains an option missing required \"id\"")), _INVALID_TYPES_MESSAG);
var FormApiService = {
  validateFieldShape: function validateFieldShape(field) {
    var _validator$shape;

    validator["throw"]([validator.shape((_validator$shape = {}, _defineProperty(_validator$shape, FIELD.ID, validator.oneOfType([validator.string, validator.number])), _defineProperty(_validator$shape, FIELD.TYPE, validator.string), _defineProperty(_validator$shape, FIELD.TITLE, field.type === _formConst.DATA_TYPE.INFO ? validator.string.optional : validator.string), _defineProperty(_validator$shape, FIELD.SUBTITLE, validator.string.optional), _defineProperty(_validator$shape, FIELD.OPTIONS, validator.array.optional), _defineProperty(_validator$shape, FIELD.FIELDS, validator.array.optional), _defineProperty(_validator$shape, FIELD.MIN, validator.number.optional), _defineProperty(_validator$shape, FIELD.MAX, validator.number.optional), _defineProperty(_validator$shape, FIELD.REQUIRED, validator.bool.optional), _defineProperty(_validator$shape, FIELD.PLACEHOLDER, validator.string.optional), _defineProperty(_validator$shape, FIELD.PATTERN, validator.string.optional), _defineProperty(_validator$shape, FIELD.SHOW_CONDITION, validator.object.optional), _validator$shape))], arguments, {
      prefix: "[Field: ".concat(_getObjectIdDisplay(field), "]")
    });
  },
  validateDefinitionShape: function validateDefinitionShape(definition) {
    var _validator$shape2, _validator$shape3, _validator$shape4;

    validator["throw"]([validator.shape((_validator$shape4 = {}, _defineProperty(_validator$shape4, DEFINITION.ID, validator.string), _defineProperty(_validator$shape4, DEFINITION.TITLE, validator.string), _defineProperty(_validator$shape4, DEFINITION.FA_ICON, validator.object.optional), _defineProperty(_validator$shape4, DEFINITION.SUBTITLE, validator.string.optional), _defineProperty(_validator$shape4, DEFINITION.SECTIONS, validator.arrayOf(validator.shape((_validator$shape3 = {}, _defineProperty(_validator$shape3, SECTION.ID, validator.string), _defineProperty(_validator$shape3, SECTION.TITLE, validator.string), _defineProperty(_validator$shape3, SECTION.SUBTITLE, validator.string.optional), _defineProperty(_validator$shape3, SECTION.SORT_ORDER, validator.number.optional), _defineProperty(_validator$shape3, SECTION.SUBSECTIONS, validator.arrayOf(validator.shape((_validator$shape2 = {}, _defineProperty(_validator$shape2, SUBSECTION.ID, validator.string), _defineProperty(_validator$shape2, SUBSECTION.TITLE, validator.string), _defineProperty(_validator$shape2, SUBSECTION.SUBTITLE, validator.string.optional), _defineProperty(_validator$shape2, SUBSECTION.SORT_ORDER, validator.number.optional), _defineProperty(_validator$shape2, SUBSECTION.FIELDS, validator.arrayOf(validator.object)), _validator$shape2)).strict)), _validator$shape3)).strict)), _defineProperty(_validator$shape4, DEFINITION.DECORATORS, validator.object.optional), _validator$shape4)).strict], arguments, {
      prefix: "[Definition: \"".concat(_getObjectIdDisplay(definition), "\"]")
    });
  },
  validateFieldTypesShape: function validateFieldTypesShape(field) {
    var idSuffix = "(id: ".concat(field.id, ")");

    if (field[FIELD.TYPE] === _formConst.DATA_TYPE.STRING && field[FIELD.COMPONENT].type === RADIO && !field[FIELD.OPTIONS].every(function (o) {
      return !(0, _isNil["default"])(o[FIELD.ID]);
    })) {
      throw new Error("".concat(INVALID_TYPES_MESSAGE[RADIO], " ").concat(idSuffix));
    }

    if (field[FIELD.TYPE] === _formConst.DATA_TYPE.NUMBER) {
      var hasMax = !(0, _isNil["default"])(field[FIELD.MAX]);
      var hasMin = !(0, _isNil["default"])(field[FIELD.MIN]);

      if (field[FIELD.COMPONENT].type === RANGE && (!hasMin || !hasMax)) {
        throw new Error("".concat(INVALID_TYPES_MESSAGE[RANGE], " ").concat(idSuffix));
      }

      if (hasMin && hasMax) {
        if (field[FIELD.MIN] === field[FIELD.MAX]) {
          throw new Error("".concat(INVALID_TYPES_MESSAGE.NUMBER_EQUALS, " ").concat(idSuffix));
        } else if (field[FIELD.MIN] > field[FIELD.MAX]) {
          throw new Error("".concat(INVALID_TYPES_MESSAGE.NUMBER_DIFF, " ").concat(idSuffix));
        }
      }
    }

    if (field[FIELD.TYPE] === ARRAY) {
      if ((0, _isEmpty["default"])(field[FIELD.OPTIONS])) {
        throw new Error("".concat(INVALID_TYPES_MESSAGE.ARRAY_OPTIONS, " ").concat(idSuffix));
      }

      if (!field[FIELD.OPTIONS].every(function (o) {
        return !(0, _isNil["default"])(o[FIELD.ID]);
      })) {
        throw new Error("".concat(INVALID_TYPES_MESSAGE.ARRAY_OPTION_ID, " ").concat(idSuffix));
      }
    }
  }
};

var _getObjectIdDisplay = function _getObjectIdDisplay(field) {
  return _maybeBaby["default"].of(field).prop(FIELD.ID).orElse('[No Id]').join();
};

var _default = FormApiService;
exports["default"] = _default;