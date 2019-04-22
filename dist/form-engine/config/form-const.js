"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_MESSAGE = exports.VALIDATION_CONST = exports.PROPERTY = exports.NO_VALUE = exports.COMPONENT_DECORATORS = exports.COMPONENT_TYPE = exports.DATA_TYPE = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DATA_TYPE = {
  ARRAY: 'array',
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  DATE: 'date',
  INFO: 'info'
};
exports.DATA_TYPE = DATA_TYPE;
var COMPONENT_TYPE = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  CHECKBOXGROUP: 'checkboxgroup',
  RADIO: 'radio',
  NUMBER: 'number',
  PASSWORD: 'password',
  RANGE: 'range',
  SELECT: 'select',
  DATE: 'date',
  SUM: 'sum',
  LABEL: 'label',
  INFO: 'info'
};
exports.COMPONENT_TYPE = COMPONENT_TYPE;

var COMPONENT_DECORATORS = _defineProperty({}, COMPONENT_TYPE.CHECKBOX, {
  hideControlLabel: true
});

exports.COMPONENT_DECORATORS = COMPONENT_DECORATORS;
var COMMON_PROPERTY = {
  ID: 'id',
  TITLE: 'title',
  SUBTITLE: 'subtitle',
  FA_ICON: 'faIcon',
  TYPE: 'type',
  SORT_ORDER: 'sortOrder'
};
var NO_VALUE = undefined;
exports.NO_VALUE = NO_VALUE;
var PROPERTY = {
  FIELD: _objectSpread({}, COMMON_PROPERTY, {
    PARENT: 'parent',
    ACTIONS: 'actions',
    UI_DECORATORS: 'uiDecorators',
    COMPONENT: 'component',
    FIELDS: 'fields',
    OPTIONS: 'options',
    MIN: 'min',
    MAX: 'max',
    REQUIRED: 'required',
    PLACEHOLDER: 'placeholder',
    SHOW_CONDITION: 'showCondition',
    PATTERN: 'pattern'
  }),
  SUBSECTION: _objectSpread({}, COMMON_PROPERTY, {
    FIELDS: 'fields'
  }),
  SECTION: _objectSpread({}, COMMON_PROPERTY, {
    SUBSECTIONS: 'subsections'
  }),
  DEFINITION: _objectSpread({}, COMMON_PROPERTY, {
    SECTIONS: 'sections',
    DECORATORS: 'decorators'
  })
};
exports.PROPERTY = PROPERTY;
var VALIDATION_CONST = {
  TYPE: {
    MISSING_REQUIRED: '__MissingRequired',
    INVALID_NUMERIC: '__InvalidNumeric',
    INVALID_REGEX: '__InvalidRegex'
  },
  STATUS: {
    OK: 'OK',
    WARNING: 'WARNING',
    ERROR: 'ERROR'
  },
  STATUS_RANKS: {
    ERROR: 100,
    WARNING: 200,
    OK: 300
  }
};
exports.VALIDATION_CONST = VALIDATION_CONST;
var ERROR_MESSAGE = {
  NO_INSTANCE: 'Missing required form instance. Did you create one with FormEngine?',
  NO_SECTIONS: 'Form is missing required sections'
};
exports.ERROR_MESSAGE = ERROR_MESSAGE;