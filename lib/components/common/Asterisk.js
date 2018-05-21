'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Asterisk = function Asterisk(_ref) {
    var size = _ref.size,
        message = _ref.message;
    return _react2.default.createElement(_Icon2.default, { icon: 'asterisk', title: message || 'Validation Error', className: 'has-text-danger' });
};

Asterisk.propTypes = {
    size: _propTypes2.default.string,
    message: _propTypes2.default.string
};

exports.default = Asterisk;