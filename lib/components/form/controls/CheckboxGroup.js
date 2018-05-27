'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _ValidationFieldError = require('../validation/ValidationFieldError');

var _ValidationFieldError2 = _interopRequireDefault(_ValidationFieldError);

var _FormChildren = require('../FormChildren');

var _FormChildren2 = _interopRequireDefault(_FormChildren);

var _common = require('../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxGroup = function CheckboxGroup(_ref) {
    var id = _ref.id,
        field = _ref.field,
        value = _ref.value,
        instance = _ref.instance,
        onUpdate = _ref.onUpdate;

    if ((0, _isEmpty3.default)(field.options)) {
        __logError(id, field);
        return _react2.default.createElement(_ValidationFieldError2.default, { id: id });
    }
    return _react2.default.createElement(
        _common.Flex,
        { column: true, className: 'm-bottom--x-small' },
        field.options.map(_renderOption.bind(undefined, id, value, instance, onUpdate))
    );
};

var _renderOption = function _renderOption(id, value, instance, _onUpdate, option, index) {
    return _react2.default.createElement(
        _common.Flex,
        { column: true, key: index, className: index > 0 ? 'm-top--xx-small' : '' },
        _react2.default.createElement(_Checkbox2.default, {
            id: option.id,
            option: option,
            onUpdate: function onUpdate() {
                return _onUpdate(option.id, id);
            },
            value: _isChecked(value, option.id)
        }),
        _react2.default.createElement(_FormChildren2.default, { field: option, onUpdate: _onUpdate, instance: instance })
    );
};

var _isChecked = function _isChecked(value, id) {
    if (!value) return false;
    return value.includes(id);
};

var __logError = function __logError(id, field) {
    console.error('Field of type "' + field.type + '" is missing required "options" array (id: ' + id + ')');
};

CheckboxGroup.propTypes = {
    id: _propTypes2.default.string.isRequired,
    field: _propTypes2.default.object.isRequired,
    value: _propTypes2.default.array,
    onUpdate: _propTypes2.default.func.isRequired,
    instance: _propTypes2.default.object.isRequired
};

exports.default = CheckboxGroup;