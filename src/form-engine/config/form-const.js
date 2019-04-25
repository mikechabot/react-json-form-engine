export const DATA_TYPE = {
    ARRAY: 'array',
    STRING: 'string',
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    DATE: 'date',
    INFO: 'info'
};

export const COMPONENT_TYPE = {
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

export const COMPONENT_DECORATORS = {
    [COMPONENT_TYPE.CHECKBOX]: {
        hideControlLabel: true
    },
    [COMPONENT_TYPE.INFO]: {
        hideControlLabel: true
    }
};

export const COMMON_PROPERTY = {
    ID: 'id',
    TITLE: 'title',
    SUBTITLE: 'subtitle',
    FA_ICON: 'faIcon',
    TYPE: 'type',
    SORT_ORDER: 'sortOrder'
};

export const NO_VALUE = undefined;

export const PROPERTY = {
    FIELD: {
        ...COMMON_PROPERTY,
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
    },
    SUBSECTION: {
        ...COMMON_PROPERTY,
        FIELDS: 'fields'
    },
    SECTION: {
        ...COMMON_PROPERTY,
        SUBSECTIONS: 'subsections'
    },
    DEFINITION: {
        ...COMMON_PROPERTY,
        SECTIONS: 'sections',
        DECORATORS: 'decorators'
    }
};

export const VALIDATION_CONST = {
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

export const ERROR_MESSAGE = {
    NO_INSTANCE: 'Missing required form instance. Did you create one with FormEngine?',
    NO_SECTIONS: 'Form is missing required sections'
};
