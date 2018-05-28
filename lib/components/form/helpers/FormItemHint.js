'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = FormItemHint;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormItemHint(_ref) {
    var hint = _ref.hint,
        className = _ref.className;

    var derivedClassName = className || 'has-text-grey-light';
    return _react2.default.createElement(
        'p',
        { className: 'help ' + derivedClassName },
        hint
    );
}

FormItemHint.propTypes = {
    hint: _propTypes2.default.string.isRequired
};