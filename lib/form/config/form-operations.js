'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.COMPONENT_OPERATIONS = exports.DATA_TYPE_OPERATIONS = exports.OPERATION_TYPES = undefined;

var _DATA_TYPE_OPERATIONS;

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _remove2 = require('lodash/remove');

var _remove3 = _interopRequireDefault(_remove2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _formConst = require('./form-const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var OPERATION_TYPES = exports.OPERATION_TYPES = {
    ON_UPDATE: 'onUpdate'
};

var common = {
    onUpdate: function onUpdate(event) {
        var target = event.target;

        return target.value;
    }
};

var DATA_TYPE_OPERATIONS = exports.DATA_TYPE_OPERATIONS = (_DATA_TYPE_OPERATIONS = {}, _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.STRING, {
    onUpdate: common.onUpdate
}), _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.BOOLEAN, {
    onUpdate: function onUpdate(value) {
        return value;
    }
}), _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.NUMBER, {
    onUpdate: function onUpdate(event) {
        var target = event.target;

        return target.valueAsNumber;
    }
}), _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.DATE, {
    onUpdate: function onUpdate(event) {
        return event;
    }
}), _defineProperty(_DATA_TYPE_OPERATIONS, _formConst.DATA_TYPE.ARRAY, {
    onUpdate: function onUpdate(eventOrValue, field, oldValue, newValue) {
        if (field.component.type === _formConst.COMPONENT_TYPE.SELECT) {
            return (0, _filter3.default)(eventOrValue.target.options, function (option) {
                return option.selected;
            }).map(function (option) {
                return option.value;
            });
        } else {
            var val = newValue || eventOrValue;
            if (!oldValue) return [val];
            return !(0, _includes3.default)(oldValue, val) ? [].concat(_toConsumableArray(oldValue), [val]) : [].concat(_toConsumableArray((0, _remove3.default)(oldValue, function (eachVal) {
                return eachVal !== val;
            })));
        }
    }
}), _DATA_TYPE_OPERATIONS);

var COMPONENT_OPERATIONS = exports.COMPONENT_OPERATIONS = _defineProperty({}, _formConst.COMPONENT_TYPE.RADIO, {
    onUpdate: function onUpdate(value) {
        return value;
    }
});