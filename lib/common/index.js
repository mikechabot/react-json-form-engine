'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__isBlank = exports.__hasValue = exports.__clone = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMPTY_STRING = '';

var __clone = exports.__clone = function __clone(obj) {
    if (!obj) return;
    return JSON.parse(JSON.stringify(obj));
};

var __hasValue = exports.__hasValue = function __hasValue(val) {
    return val !== undefined && val !== null;
};

var __isBlank = exports.__isBlank = function __isBlank(val) {
    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val)) {
        return (0, _isEmpty3.default)(val);
    }
    return val === undefined || val === null || val === EMPTY_STRING;
};