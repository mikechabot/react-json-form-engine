'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _maybeBaby = require('maybe-baby');

var _maybeBaby2 = _interopRequireDefault(_maybeBaby);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TYPE = 'text';

var Text = function Text(_ref) {
    var id = _ref.id,
        field = _ref.field,
        value = _ref.value,
        onUpdate = _ref.onUpdate,
        uiDecorators = _ref.uiDecorators;

    return _react2.default.createElement('input', {
        name: id,
        id: id,
        className: 'input',
        type: __getInputType(uiDecorators),
        value: value || '',
        onChange: onUpdate,
        placeholder: field.placeholder
    });
};

var __getInputType = function __getInputType(uiDecorators) {
    return _maybeBaby2.default.of(uiDecorators).prop('component').prop('type').orElse(DEFAULT_TYPE).join();
};

Text.propTypes = {
    id: _propTypes2.default.string.isRequired,
    field: _propTypes2.default.object.isRequired,
    value: _propTypes2.default.string,
    uiDecorators: _propTypes2.default.object,
    onUpdate: _propTypes2.default.func.isRequired,
    instance: _propTypes2.default.object.isRequired
};

exports.default = Text;