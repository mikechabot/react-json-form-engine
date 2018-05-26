'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FieldError = require('../validation/FieldError');

var _FieldError2 = _interopRequireDefault(_FieldError);

var _glamorous = require('../../common/glamorous');

var _common = require('../../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Range = function Range(_ref) {
    var id = _ref.id,
        field = _ref.field,
        value = _ref.value,
        onUpdate = _ref.onUpdate;

    if (!(0, _common.__hasValue)(field.min) || !(0, _common.__hasValue)(field.max)) {
        console.error('Field of type "' + field.type + '" is missing required "min" and/or "max" (id: ' + id + ')');
        return _react2.default.createElement(_FieldError2.default, { id: field.id });
    }

    return _react2.default.createElement(
        _glamorous.Flex,
        { column: true, flexShrink: 0 },
        _react2.default.createElement(
            _glamorous.Flex,
            { hAlignCenter: true },
            (0, _common.__hasValue)(value) ? value : 'No Value'
        ),
        _react2.default.createElement(
            _glamorous.Flex,
            { flex: 1 },
            _react2.default.createElement(MinMaxLabel, { value: field.min, className: 'm-right--xx-small' }),
            _react2.default.createElement(
                _glamorous.Flex,
                { flex: 1 },
                _react2.default.createElement('input', {
                    className: 'full-width',
                    name: id,
                    id: id,
                    type: 'range',
                    value: (0, _common.__hasValue)(value) ? value : '',
                    max: field.max,
                    min: field.min,
                    onChange: onUpdate
                })
            ),
            _react2.default.createElement(MinMaxLabel, { value: field.max, className: 'm-left--xx-small' })
        )
    );
};

var MinMaxLabel = function MinMaxLabel(_ref2) {
    var value = _ref2.value,
        className = _ref2.className;
    return _react2.default.createElement(
        'div',
        { className: 'is-size-7 ' + className },
        value
    );
};

MinMaxLabel.propTypes = {
    value: _propTypes2.default.number.isRequired
};

Range.propTypes = {
    id: _propTypes2.default.string.isRequired,
    field: _propTypes2.default.object.isRequired,
    value: _propTypes2.default.number,
    onUpdate: _propTypes2.default.func.isRequired,
    instance: _propTypes2.default.object.isRequired
};

exports.default = Range;