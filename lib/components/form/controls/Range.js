'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ValidationFieldError = require('../validation/ValidationFieldError');

var _ValidationFieldError2 = _interopRequireDefault(_ValidationFieldError);

var _common = require('../../common');

var _common2 = require('../../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Range = function Range(_ref) {
    var id = _ref.id,
        field = _ref.field,
        value = _ref.value,
        onUpdate = _ref.onUpdate;

    if (!(0, _common2.__hasValue)(field.min) || !(0, _common2.__hasValue)(field.max)) {
        console.error('Field of type "' + field.type + '" is missing required "min" and/or "max" (id: ' + id + ')');
        return _react2.default.createElement(_ValidationFieldError2.default, { id: field.id });
    }

    return _react2.default.createElement(
        _common.Flex,
        { column: true, flexShrink: 0 },
        _react2.default.createElement(
            _common.Flex,
            { hAlignCenter: true },
            (0, _common2.__hasValue)(value) ? value : 'No Value'
        ),
        _react2.default.createElement(
            _common.Flex,
            { flex: 1 },
            _react2.default.createElement(MinMaxLabel, { value: field.min, style: { marginRight: '0.25rem' } }),
            _react2.default.createElement(
                _common.Flex,
                { flex: 1 },
                _react2.default.createElement('input', {
                    style: { width: '100%' },
                    name: id,
                    id: id,
                    type: 'range',
                    value: (0, _common2.__hasValue)(value) ? value : '',
                    max: field.max,
                    min: field.min,
                    onChange: onUpdate
                })
            ),
            _react2.default.createElement(MinMaxLabel, { value: field.max, style: { marginLeft: '0.25rem' } })
        )
    );
};

var MinMaxLabel = function MinMaxLabel(_ref2) {
    var value = _ref2.value,
        style = _ref2.style;
    return _react2.default.createElement(
        'div',
        { style: style, className: 'is-size-7' },
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