"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VALIDATION_MESSAGE = exports.VALIDATION_CONST = exports.PROPERTY = exports.NO_VALUE = exports.COMPONENT_DECORATORS = exports.FORM_STATE = exports.COMPONENT_TYPE = exports.DATA_TYPE = void 0;

var _VALIDATION_MESSAGE;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DATA_TYPE = {
  ARRAY: 'array',
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  DATE: 'date'
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
  LABEL: 'label'
};
exports.COMPONENT_TYPE = COMPONENT_TYPE;
var FORM_STATE = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  OK: 'OK'
};
exports.FORM_STATE = FORM_STATE;

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
var VALIDATION_MESSAGE = (_VALIDATION_MESSAGE = {}, _defineProperty(_VALIDATION_MESSAGE, VALIDATION_CONST.TYPE.MISSING_REQUIRED, 'Missing required value.'), _defineProperty(_VALIDATION_MESSAGE, VALIDATION_CONST.TYPE.INVALID_NUMERIC, 'Invalid numeric value.'), _defineProperty(_VALIDATION_MESSAGE, VALIDATION_CONST.TYPE.INVALID_REGEX, "Value doesn't match the supplied pattern."), _VALIDATION_MESSAGE);
exports.VALIDATION_MESSAGE = VALIDATION_MESSAGE;
var _default = {
  DATA_TYPE: DATA_TYPE,
  COMPONENT_TYPE: COMPONENT_TYPE,
  COMPONENT_DECORATORS: COMPONENT_DECORATORS,
  FORM_STATE: FORM_STATE,
  PROPERTY: PROPERTY,
  NO_VALUE: NO_VALUE,
  VALIDATION_CONST: VALIDATION_CONST
};
exports.default = _default;