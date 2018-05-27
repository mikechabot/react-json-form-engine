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

var FormSubsectionPanelTitle = function FormSubsectionPanelTitle(_ref) {
    var subsection = _ref.subsection,
        hideTitle = _ref.hideTitle,
        hideSubtitle = _ref.hideSubtitle,
        instance = _ref.instance;

    if (hideTitle && hideSubtitle) {
        return null;
    }

    var title = !hideTitle ? __renderTitle(subsection, instance) : null;
    var subtitle = !hideSubtitle ? __renderSubtitle(subsection) : null;

    if (title || subtitle) {
        return _react2.default.createElement(
            'div',
            { className: 'panel-heading' },
            title,
            subtitle
        );
    }

    return null;
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
        subsection.title,
        '\xA0',
        __maybeRenderError(subsection, instance)
    );
};

var __renderSubtitle = function __renderSubtitle(subsection) {
    if (subsection.subtitle) {
        return _react2.default.createElement(
            'h2',
            { className: 'subtitle is-6' },
            _react2.default.createElement(_common.Icon, { icon: 'angle-right' }),
            '\xA0',
            subsection.subtitle
        );
    }
};

FormSubsectionPanelTitle.propTypes = {
    subsection: _propTypes2.default.object.isRequired,
    instance: _propTypes2.default.object.isRequired,
    hideTitle: _propTypes2.default.bool,
    hideSubtitle: _propTypes2.default.bool
};

exports.default = FormSubsectionPanelTitle;