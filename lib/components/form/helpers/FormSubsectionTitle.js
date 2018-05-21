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

var FormSubsectionTitle = function FormSubsectionTitle(_ref) {
    var subsection = _ref.subsection,
        hasSiblings = _ref.hasSiblings,
        instance = _ref.instance,
        isTab = _ref.isTab;

    return isTab ? _renderTitleAndError(subsection, instance) : _renderTitleAndSubtitle(subsection, hasSiblings, instance);
};

var _renderTitleAndError = function _renderTitleAndError(subsection, instance) {
    return _react2.default.createElement(
        'span',
        null,
        subsection.title,
        '\xA0',
        __maybeRenderError(subsection, instance)
    );
};

var _renderTitleAndSubtitle = function _renderTitleAndSubtitle(subsection, hasSiblings, instance) {
    var hasSubtitle = !!subsection.subtitle;

    if (hasSiblings) {
        if (hasSubtitle) {
            return __renderSubtitle(subsection);
        }
        return null;
    }
    if (!hasSubtitle) {
        return __renderTitle(subsection, instance);
    }
    return _react2.default.createElement(
        'span',
        null,
        __renderTitle(subsection, instance),
        __renderSubtitle(subsection, true)
    );
};

var __maybeRenderError = function __maybeRenderError(subsection, instance) {
    if (instance.subsectionHasError(subsection)) {
        return _react2.default.createElement(_common.Asterisk, null);
    }
};

var __renderTitle = function __renderTitle(subsection, instance) {
    return _react2.default.createElement(
        'h1',
        { className: 'title is-5' },
        _renderTitleAndError(subsection, instance)
    );
};

var __renderSubtitle = function __renderSubtitle(subsection) {
    return _react2.default.createElement(
        'h2',
        { className: 'subtitle is-6' },
        _react2.default.createElement(_common.Icon, { icon: 'angle-right' }),
        '\xA0',
        subsection.subtitle
    );
};

FormSubsectionTitle.propTypes = {
    subsection: _propTypes2.default.object.isRequired,
    instance: _propTypes2.default.object.isRequired,
    isTab: _propTypes2.default.bool,
    hasSiblings: _propTypes2.default.bool
};

exports.default = FormSubsectionTitle;