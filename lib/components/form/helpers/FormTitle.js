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

var DEFAULT_THEME = 'is-dark';
var className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-5-mobile';

var FormTitle = function FormTitle(_ref) {
    var id = _ref.id,
        label = _ref.label,
        icon = _ref.icon,
        iconPrefix = _ref.iconPrefix,
        theme = _ref.theme,
        controlsRight = _ref.controlsRight;

    return _react2.default.createElement(
        _common.Flex,
        {
            id: id,
            vAlignCenter: true,
            flexShrink: 0,
            justifyContent: 'space-between',
            className: 'navbar ' + (theme || DEFAULT_THEME)
        },
        _react2.default.createElement(
            'div',
            { className: 'navbar-brand' },
            _react2.default.createElement(
                'span',
                { className: className },
                _maybeRenderIcon(icon, iconPrefix),
                _renderLabel(label)
            )
        ),
        _maybeRenderControlsRight(controlsRight)
    );
};

var _maybeRenderIcon = function _maybeRenderIcon(icon, iconPrefix) {
    if (icon) {
        return _react2.default.createElement(
            'span',
            { key: 'icon' },
            _react2.default.createElement(_common.Icon, { icon: icon, prefix: iconPrefix }),
            '\xA0'
        );
    }
};

var _renderLabel = function _renderLabel(label) {
    return _react2.default.createElement(
        'span',
        { key: 'label' },
        label
    );
};

var _maybeRenderControlsRight = function _maybeRenderControlsRight(controls) {
    if (controls) {
        return _react2.default.createElement(
            'div',
            { className: 'navbar-item' },
            controls
        );
    }
};

FormTitle.propTypes = {
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.node.isRequired,
    icon: _propTypes2.default.string,
    iconPrefix: _propTypes2.default.string,
    theme: _propTypes2.default.string,
    controlsRight: _propTypes2.default.node
};

exports.default = FormTitle;