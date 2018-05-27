'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _maybeBaby = require('maybe-baby');

var _maybeBaby2 = _interopRequireDefault(_maybeBaby);

var _apiCheck = require('api-check');

var _apiCheck2 = _interopRequireDefault(_apiCheck);

var _formConst = require('../config/form-const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FIELD = _formConst.PROPERTY.FIELD,
    SECTION = _formConst.PROPERTY.SECTION,
    SUBSECTION = _formConst.PROPERTY.SUBSECTION,
    DEFINITION = _formConst.PROPERTY.DEFINITION;

// Configure api-check

var validator = (0, _apiCheck2.default)({ output: { prefix: 'FormEngine:' } });

var FormApiService = {
    __validateFieldShape: function __validateFieldShape(field) {
        var _validator$shape;

        validator.throw([validator.shape((_validator$shape = {}, _defineProperty(_validator$shape, FIELD.ID, validator.oneOfType([validator.string, validator.number])), _defineProperty(_validator$shape, FIELD.TYPE, validator.string), _defineProperty(_validator$shape, FIELD.TITLE, validator.string), _defineProperty(_validator$shape, FIELD.SUBTITLE, validator.string.optional), _validator$shape))], arguments, {
            prefix: '[Field: ' + _getObjectIdDisplay(field) + ']'
        });
    },
    __validateDefinitionShape: function __validateDefinitionShape(definition) {
        var _validator$shape2, _validator$shape3, _validator$shape4;

        validator.throw([validator.shape((_validator$shape4 = {}, _defineProperty(_validator$shape4, DEFINITION.ID, validator.string), _defineProperty(_validator$shape4, DEFINITION.TITLE, validator.string), _defineProperty(_validator$shape4, DEFINITION.FA_ICON, validator.object.optional), _defineProperty(_validator$shape4, DEFINITION.SUBTITLE, validator.string.optional), _defineProperty(_validator$shape4, DEFINITION.SECTIONS, validator.arrayOf(validator.shape((_validator$shape3 = {}, _defineProperty(_validator$shape3, SECTION.ID, validator.string), _defineProperty(_validator$shape3, SECTION.TITLE, validator.string), _defineProperty(_validator$shape3, SECTION.SUBTITLE, validator.string.optional), _defineProperty(_validator$shape3, SECTION.SORT_ORDER, validator.number.optional), _defineProperty(_validator$shape3, SECTION.SUBSECTIONS, validator.arrayOf(validator.shape((_validator$shape2 = {}, _defineProperty(_validator$shape2, SUBSECTION.ID, validator.string), _defineProperty(_validator$shape2, SUBSECTION.TITLE, validator.string), _defineProperty(_validator$shape2, SUBSECTION.SUBTITLE, validator.string.optional), _defineProperty(_validator$shape2, SUBSECTION.SORT_ORDER, validator.number.optional), _defineProperty(_validator$shape2, SUBSECTION.FIELDS, validator.arrayOf(validator.object)), _validator$shape2)).strict)), _validator$shape3)).strict)), _defineProperty(_validator$shape4, DEFINITION.DECORATORS, validator.object.optional), _validator$shape4)).strict], arguments, {
            prefix: '[Definition: "' + _getObjectIdDisplay(definition) + '"]'
        });
    }
};

var _getObjectIdDisplay = function _getObjectIdDisplay(field) {
    return _maybeBaby2.default.of(field).prop(FIELD.ID).orElse('[No Id]').join();
};

exports.default = FormApiService;