"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMPONENT_TYPE_OPERATIONS = exports.DATA_TYPE_OPERATIONS = exports.OPERATION_TYPES = void 0;

var _formConst = require("./form-const");

var _DATA_TYPE_OPERATIONS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var OPERATION_TYPES = {
  ON_UPDATE: 'onUpdate'
};
/**
 * Basic operations by data type
 * @type {{[p: string]: }}
 */

exports.OPERATION_TYPES = OPERATION_TYPES;
var DATA_TYPE_OPERATIONS = (_DATA_TYPE_OPERATIONS = {}, _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.STRING, {
  onUpdate: function onUpdate(_ref) {
    var target = _ref.target;
    return target.value;
  }
}), _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.BOOLEAN, {
  onUpdate: function onUpdate(value) {
    return value;
  }
}), _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.NUMBER, {
  onUpdate: function onUpdate(_ref2) {
    var target = _ref2.target;
    return target.valueAsNumber;
  }
}), _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.DATE, {
  onUpdate: function onUpdate(event) {
    return event;
  }
}), _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.ARRAY, {
  onUpdate: function onUpdate(eventOrValue, field, oldVal, newVal) {
    if (field.component.type === _formConst.COMPONENT_TYPE.SELECT) {
      return _toConsumableArray(eventOrValue.target.options).filter(function (o) {
        return o.selected;
      }).map(function (o) {
        return o.value;
      });
    }

    var val = newVal || eventOrValue;
    if (!oldVal) return [val];
    return !oldVal.includes(val) ? [].concat(_toConsumableArray(oldVal), [val]) : oldVal.filter(function (v) {
      return v !== val;
    });
  }
}), _DATA_TYPE_OPERATIONS);
/**
 * Basic operations by component type
 * @type {{[p: string]: undefined}}
 */

exports.DATA_TYPE_OPERATIONS = DATA_TYPE_OPERATIONS;

var COMPONENT_TYPE_OPERATIONS = _defineProperty({}, _formConst.COMPONENT_TYPE.RADIO, {
  onUpdate: function onUpdate(value) {
    return value;
  }
});

exports.COMPONENT_TYPE_OPERATIONS = COMPONENT_TYPE_OPERATIONS;