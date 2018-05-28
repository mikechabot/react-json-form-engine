'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formConst = require('../../../form/config/form-const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function Select(_ref) {
    var id = _ref.id,
        value = _ref.value,
        field = _ref.field,
        onUpdate = _ref.onUpdate;

    if (!field.options) {
        console.warn(field.type + ' is missing required "options" (id: ' + id + ')');
        return _react2.default.createElement('span', null);
    }
    var isMultiple = __isFieldTypeArray(field);
    return _react2.default.createElement(
        'div',
        { className: 'select ' + (isMultiple ? 'is-multiple' : '') },
        _react2.default.createElement(
            'select',
            { value: value, id: id, name: id, onChange: onUpdate, multiple: isMultiple },
            _maybeRenderPlaceholder(field, value),
            _renderOptions(field)
        )
    );
};

var _maybeRenderPlaceholder = function _maybeRenderPlaceholder(field, value) {
    if (!value && !__isFieldTypeArray(field)) {
        return _react2.default.createElement(
            'option',
            { value: '' },
            field.placeholder || '-- select value --'
        );
    }
};

var _renderOptions = function _renderOptions(field) {
    return field.options.map(function (option, index) {
        return _react2.default.createElement(
            'option',
            { key: index, value: option.id },
            option.title
        );
    });
};

var __isFieldTypeArray = function __isFieldTypeArray(field) {
    return field.type === _formConst.DATA_TYPE.ARRAY;
};

Select.propTypes = {
    id: _propTypes2.default.string.isRequired,
    field: _propTypes2.default.object.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
    onUpdate: _propTypes2.default.func.isRequired,
    instance: _propTypes2.default.object.isRequired,
    uiField: _propTypes2.default.object
};

exports.default = Select;