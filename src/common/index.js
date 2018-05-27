import _isEmpty from 'lodash/isEmpty';

const EMPTY_STRING = '';

export const __clone = obj => {
    if (!obj) return;
    return JSON.parse(JSON.stringify(obj));
};

export const __hasValue = val => {
    return val !== undefined && val !== null;
};

export const __isBlank = val => {
    if (typeof val === 'object' && Array.isArray(val)) {
        return _isEmpty(val);
    }
    return val === undefined || val === null || val === EMPTY_STRING;
};
