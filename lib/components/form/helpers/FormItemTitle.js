'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = FormItemTitle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _maybeBaby = require('maybe-baby');

var _maybeBaby2 = _interopRequireDefault(_maybeBaby);

var _common = require('../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormItemTitle(_ref) {
    var field = _ref.field,
        decorators = _ref.decorators,
        instance = _ref.instance;

    if (__noTitle(decorators)) return null;
    return _react2.default.createElement(
        'div',
        { className: 'label', htmlFor: field.id },
        field.title,
        '\xA0',
        __maybeRenderError(field, instance)
    );
}

function __maybeRenderError(field, instance) {
    if (instance.fieldHasError(field.id)) {
        return _react2.default.createElement(_common.Asterisk, null);
    }
}

function __noTitle(decorators) {
    return _maybeBaby2.default.of(decorators).prop('hideControlLabel').isJust();
}

FormItemTitle.propTypes = {
    field: _propTypes2.default.object.isRequired,
    instance: _propTypes2.default.object.isRequired,
    decorators: _propTypes2.default.object
};