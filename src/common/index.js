import _isEmpty from 'lodash/isEmpty';

const EMPTY_STRING = '';

export const __clone = obj => {
    if (!obj) return;
    return JSON.parse(JSON.stringify(obj));
};
export const __hasValue = val => {
    return val !== undefined && val !== null;
};
export const isString = val => {
    return typeof val === 'string';
};
export const isNumber = val => {
    return typeof val === 'number' && Number.isFinite(val);
};
export const __blank = val => {
    if (typeof val === 'object' && Array.isArray(val)) {
        return _isEmpty(val);
    }
    return val === undefined || val === null || val === EMPTY_STRING;
};
export const __hasChanged = (o1, o2) => {
    return JSON.stringify(o1) !== JSON.stringify(o2);
};
