'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormChildren = require('../FormChildren');

var _FormChildren2 = _interopRequireDefault(_FormChildren);

var _common = require('../../common');

var _common2 = require('../../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function Radio(_ref) {
    var id = _ref.id,
        value = _ref.value,
        field = _ref.field,
        instance = _ref.instance,
        onUpdate = _ref.onUpdate;

    if (!field.options) {
        console.warn(field.type + ' is missing required "options" (id: ' + id + ')');
        return _react2.default.createElement('span', null);
    }
    return _react2.default.createElement(
        _common.Flex,
        { column: !field.inline, id: id },
        _renderOptions(field, value, instance, onUpdate)
    );
};

var _renderOptions = function _renderOptions(field, value, instance, onUpdate) {
    return field.options.map(_renderOption.bind(null, field, value, instance, onUpdate));
};

var _renderOption = function _renderOption(field, value, instance, onUpdate, option, index) {
    var isEven = index % 2 === 0;
    return _react2.default.createElement(
        _common.Flex,
        {
            key: index,
            style: index === 0 ? {} : field.inline ? { marginLeft: '0.5rem' } : { marginTop: '0.25rem' },
            column: true,
            vAlignCenter: true
        },
        _react2.default.createElement(
            _common.Flex,
            {
                cursor: 'pointer',
                vAlignCenter: true,
                onClick: _handleOnClick.bind(null, field, option, onUpdate, isEven)
            },
            _renderOptionIcon(option, value, isEven),
            '\xA0',
            _react2.default.createElement(
                'div',
                null,
                option.title
            )
        ),
        _react2.default.createElement(_FormChildren2.default, { field: option, instance: instance, onUpdate: onUpdate })
    );
};

var _renderOptionIcon = function _renderOptionIcon(option, value, isEven) {
    return _isChecked(option, value, isEven) ? _react2.default.createElement(_common.Icon, { prefix: 'far', icon: 'dot-circle' }) : _react2.default.createElement(_common.Icon, { prefix: 'far', icon: 'circle' });
};

var _handleOnClick = function _handleOnClick(field, option, onUpdate, isEven) {
    onUpdate(option.id || isEven, field.id);
};

var _isChecked = function _isChecked(option, value, isEven) {
    if (!(0, _common2.__hasValue)(value)) return false;
    if (option.id) return option.id === value;
    return isEven ? value : !value;
};

Radio.propTypes = {
    id: _propTypes2.default.string.isRequired,
    field: _propTypes2.default.object.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    onUpdate: _propTypes2.default.func.isRequired,
    instance: _propTypes2.default.object.isRequired,
    uiField: _propTypes2.default.object
};

exports.default = Radio;