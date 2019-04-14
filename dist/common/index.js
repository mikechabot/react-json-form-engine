"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBlank = exports.clone = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var EMPTY_STRING = '';

var clone = function clone(obj) {
  if (!obj) return;
  return JSON.parse(JSON.stringify(obj));
};

exports.clone = clone;

var isBlank = function isBlank(val) {
  if (_typeof(val) === 'object' && Array.isArray(val)) {
    return (0, _isEmpty.default)(val);
  }

  return (0, _isNil.default)(val) || val === EMPTY_STRING;
};

exports.isBlank = isBlank;