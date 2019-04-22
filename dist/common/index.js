"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBlank = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EMPTY_STRING = '';

var isBlank = function isBlank(val) {
  if (Array.isArray(val)) return (0, _isEmpty["default"])(val);
  return (0, _isNil["default"])(val) || val === EMPTY_STRING;
};

exports.isBlank = isBlank;