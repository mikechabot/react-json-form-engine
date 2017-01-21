export const FIELD_TYPE_KEYS = {
    ARRAY  : 'array',
    STRING : 'string',
    BOOLEAN: 'boolean',
    NUMBER : 'number',
    DATE   : 'date'
};

export const FORM_COMPONENT_KEYS = {
    TEXT         : 'text',
    TEXTAREA     : 'textarea',
    CHECKBOX     : 'checkbox',
    CHECKBOXGROUP: 'checkboxgroup',
    RADIO        : 'radio',
    NUMBER       : 'number',
    RANGE        : 'range',
    SELECT       : 'select',
    DATE         : 'date',
    SUM          : 'sum',
    LABEL        : 'label'
};

export const FORM_STATES = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR  : 'error',
    OK     : 'OK'
};

export const FORM_COMPONENT_DECORATORS = {
    'checkbox': {
        hideControlLabel: true
    }
};

export default {
    FIELD_TYPE_KEYS,
    FORM_COMPONENT_KEYS,
    FORM_COMPONENT_DECORATORS,
    FORM_STATES
};
