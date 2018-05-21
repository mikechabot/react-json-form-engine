'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _common = require('../../common');

var _formConst = require('../../../form/config/form-const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationMessages = function ValidationMessages(_ref) {
    var field = _ref.field,
        results = _ref.results;

    if (results.status === _formConst.VALIDATION_CONST.STATUS.OK) {
        return _react2.default.createElement('span', null);
    }

    // Mutates labels!
    var labels = [];
    __buildBreadcrumbs(labels, field);

    return _react2.default.createElement(
        'div',
        { className: 'm-bottom--x-small' },
        __renderBreadcrumbs(labels),
        __renderMessages(results)
    );
};

var __renderBreadcrumbs = function __renderBreadcrumbs(labels) {
    return _react2.default.createElement(
        'nav',
        { className: 'breadcrumb', 'aria-label': 'breadcrumbs' },
        _react2.default.createElement(
            'ul',
            null,
            labels.map(__renderBreadcrumb)
        )
    );
};

var __renderBreadcrumb = function __renderBreadcrumb(crumb, index) {
    return _react2.default.createElement(
        'li',
        { key: index },
        _react2.default.createElement(
            'span',
            null,
            crumb
        )
    );
};

var __buildBreadcrumbs = function __buildBreadcrumbs(labels, field) {
    labels.unshift(field.title);
    if (field.parent) {
        __buildBreadcrumbs(labels, field.parent);
    }
};

var __renderMessages = function __renderMessages(results) {
    return _react2.default.createElement(
        'ul',
        null,
        results.messages.map(function (message, index) {
            return _react2.default.createElement(
                'li',
                { key: index },
                _react2.default.createElement(_common.Icon, { icon: 'angle-right' }),
                '\xA0',
                message.message
            );
        })
    );
};

ValidationMessages.propTypes = {
    field: _propTypes2.default.object.isRequired,
    results: _propTypes2.default.object.isRequired
};

exports.default = ValidationMessages;