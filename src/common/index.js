import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

const EMPTY_STRING = '';

export const isBlank = val => {
    if (Array.isArray(val)) return isEmpty(val);
    return isNil(val) || val === EMPTY_STRING;
};
