'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _common = require('../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regex = /^Error: (.+)$/m;

var APICheckError = function APICheckError(_ref) {
    var error = _ref.error;

    var detail = __parseAPICheckErrorMessage(error);
    return _react2.default.createElement(
        'div',
        { className: 'panel' },
        _react2.default.createElement(
            'div',
            { className: 'panel-heading' },
            _react2.default.createElement(
                _common.Flex,
                null,
                _react2.default.createElement(_common.Icon, { icon: 'exclamation-triangle', className: 'has-text-danger' }),
                '\xA0',
                _renderTitle(detail || 'Error initializing FormEngine')
            )
        )
    );
};

var __parseAPICheckErrorMessage = function __parseAPICheckErrorMessage(error) {
    if (!error) return null;
    if (regex.test(error)) {
        var matches = regex.exec(error);
        if (matches) {
            return matches[1];
        }
    }
    return null;
};

var _renderTitle = function _renderTitle(title) {
    return _react2.default.createElement(
        'div',
        { className: 'alert alert-danger paper-1' },
        _react2.default.createElement(
            'h3',
            null,
            title
        )
    );
};

APICheckError.propTypes = {
    error: _propTypes2.default.object.isRequired
};

exports.default = APICheckError;