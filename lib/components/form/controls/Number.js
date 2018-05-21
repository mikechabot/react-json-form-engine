'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Number = function Number(_ref) {
    var id = _ref.id,
        field = _ref.field,
        value = _ref.value,
        onUpdate = _ref.onUpdate;

    return _react2.default.createElement('input', {
        className: 'input',
        name: id,
        id: id,
        type: 'number',
        value: value || '',
        max: field.max,
        min: field.min,
        onChange: onUpdate,
        placeholder: field.placeholder
    });
};

Number.propTypes = {
    id: _propTypes2.default.string.isRequired,
    field: _propTypes2.default.object.isRequired,
    value: _propTypes2.default.number,
    onUpdate: _propTypes2.default.func.isRequired,
    instance: _propTypes2.default.object.isRequired
};

exports.default = Number;