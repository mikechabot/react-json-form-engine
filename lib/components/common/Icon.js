'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(_ref) {
    var icon = _ref.icon,
        prefix = _ref.prefix,
        title = _ref.title,
        className = _ref.className;

    var iconPrefix = prefix || 'fa';
    return _react2.default.createElement(
        'span',
        { title: title },
        _react2.default.createElement('i', { className: iconPrefix + ' fa-' + icon + ' ' + (className || '') })
    );
};

Icon.propTypes = {
    icon: _propTypes2.default.string.isRequired,
    classname: _propTypes2.default.string
};

exports.default = Icon;