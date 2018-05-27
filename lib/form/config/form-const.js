'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DATA_TYPE = exports.DATA_TYPE = {
    ARRAY: 'array',
    STRING: 'string',
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    DATE: 'date'
};

var COMPONENT_TYPE = exports.COMPONENT_TYPE = {
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

var FORM_STATE = exports.FORM_STATE = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    OK: 'OK'
};

var COMPONENT_DECORATORS = exports.COMPONENT_DECORATORS = _defineProperty({}, COMPONENT_TYPE.CHECKBOX, {
    hideControlLabel: true
});

var COMMON_PROPERTY = {
    ID: 'id',
    TITLE: 'title',
    SUBTITLE: 'subtitle',
    FA_ICON: 'faIcon',
    TYPE: 'type',
    SORT_ORDER: 'sortOrder'
};

var NO_VALUE = exports.NO_VALUE = undefined;

var PROPERTY = exports.PROPERTY = {
    FIELD: _extends({}, COMMON_PROPERTY, {
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
    SUBSECTION: _extends({}, COMMON_PROPERTY, {
        FIELDS: 'fields'
    }),
    SECTION: _extends({}, COMMON_PROPERTY, {
        SUBSECTIONS: 'subsections'
    }),
    DEFINITION: _extends({}, COMMON_PROPERTY, {
        SECTIONS: 'sections',
        DECORATORS: 'decorators'
    })
};

var VALIDATION_CONST = exports.VALIDATION_CONST = {
    TYPE: {
        REQUIRED: '__MissingRequired',
        INVALID_VALUE: '__InvalidValue'
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

exports.default = {
    DATA_TYPE: DATA_TYPE,
    COMPONENT_TYPE: COMPONENT_TYPE,
    COMPONENT_DECORATORS: COMPONENT_DECORATORS,
    FORM_STATE: FORM_STATE,
    PROPERTY: PROPERTY,
    NO_VALUE: NO_VALUE,
    VALIDATION_CONST: VALIDATION_CONST
};