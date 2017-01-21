'use strict';

const EMPTY_STRING = '';

module.exports = {
    __clone: function (obj) {
        if (!obj) return;
        return JSON.parse(JSON.stringify(obj));
    },
    __hasValue: function (val) {
        return val !== undefined && val !== null;
    },
    __blank: function (val) {
        if (typeof val === 'object' && Array.isArray(val)) {
            return _.isEmpty(val);
        }
        return val === undefined || val === null || val === EMPTY_STRING;
    },
    __hasChanged (o1, o2) {
        return JSON.stringify(o1) !== JSON.stringify(o2);
    }
};
