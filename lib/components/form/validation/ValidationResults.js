'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ValidationMessages = require('./ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _common = require('../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationResults = function ValidationResults(_ref) {
    var instance = _ref.instance,
        subsection = _ref.subsection,
        validationMessagesLabel = _ref.validationMessagesLabel;

    var results = instance.getValidationResults();
    var validationStateMap = results.validationStateMap;


    if (!instance.hasError()) {
        return null;
    }

    var includeOnly = null;
    if (subsection) {
        includeOnly = instance.getAllSubsectionFields(subsection).map(function (field) {
            return field.id;
        });
    }

    return _react2.default.createElement(
        'article',
        { className: 'message m-around--small is-danger' },
        _react2.default.createElement(
            'div',
            { className: 'message-header' },
            _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(_common.Icon, { icon: 'exclamation-triangle' }),
                '\xA0',
                validationMessagesLabel || 'Validation Messages'
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'message-body' },
            Object.keys(validationStateMap).map(function (fieldId) {
                if (!includeOnly || includeOnly.includes(fieldId)) {
                    return _react2.default.createElement(_ValidationMessages2.default, {
                        key: fieldId,
                        tag: fieldId,
                        field: instance.getField(fieldId),
                        results: instance.getValidationResultByTag(fieldId)
                    });
                }
                return null;
            }).filter(function (message) {
                return message;
            })
        )
    );
};

ValidationResults.propTypes = {
    instance: _propTypes2.default.object.isRequired,
    subsection: _propTypes2.default.object,
    validationMessagesLabel: _propTypes2.default.string
};

exports.default = ValidationResults;