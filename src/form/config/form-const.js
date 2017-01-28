export const DATA_TYPE = {
    ARRAY  : 'array',
    STRING : 'string',
    BOOLEAN: 'boolean',
    NUMBER : 'number',
    DATE   : 'date'
};

export const COMPONENT_TYPE = {
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

export const FORM_STATE = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR  : 'error',
    OK     : 'OK'
};

export const COMPONENT_DECORATORS = {
    [COMPONENT_TYPE.CHECKBOX]: {
        hideControlLabel: true
    }
};

export default {
    DATA_TYPE,
    COMPONENT_TYPE,
    COMPONENT_DECORATORS,
    FORM_STATE
};
