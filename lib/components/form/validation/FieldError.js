'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ErrorBlock;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormItemHint = require('../helpers/FormItemHint');

var _FormItemHint2 = _interopRequireDefault(_FormItemHint);

var _common = require('../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ErrorBlock(_ref) {
    var id = _ref.id;

    return _react2.default.createElement(
        'span',
        { className: 'has-text-danger' },
        _react2.default.createElement(_common.Icon, { icon: 'exclamation-circle' }),
        '\xA0Error rendering Field with ID: ',
        id,
        _react2.default.createElement(_FormItemHint2.default, { hint: 'Check console for additional details. ', className: 'has-text-danger' })
    );
}

ErrorBlock.propTypes = {
    id: _propTypes2.default.string.isRequired
};