'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormSubmitButton = function FormSubmitButton(_ref) {
    var onSubmit = _ref.onSubmit,
        submitButtonLabel = _ref.submitButtonLabel;
    return _react2.default.createElement(
        'div',
        { className: 'has-text-centered' },
        _react2.default.createElement(
            'button',
            { className: 'button is-link', onClick: onSubmit },
            submitButtonLabel || 'Submit'
        )
    );
};

FormSubmitButton.propTypes = {
    onSubmit: _propTypes2.default.func.isRequired,
    submitButtonLabel: _propTypes2.default.string
};

exports.default = FormSubmitButton;