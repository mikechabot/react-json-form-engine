import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

const EMPTY_STRING = '';

export const clone = obj => {
    if (!obj) return;
    return JSON.parse(JSON.stringify(obj));
};

export const isBlank = val => {
    if (typeof val === 'object' && Array.isArray(val)) {
        return isEmpty(val);
    }
    return isNil(val) || val === EMPTY_STRING;
};
