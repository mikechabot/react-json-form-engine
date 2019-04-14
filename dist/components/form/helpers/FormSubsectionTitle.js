"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormSubsectionPanelTitle = function FormSubsectionPanelTitle(_ref) {
  var subsection = _ref.subsection,
      hideTitle = _ref.hideTitle,
      hideSubtitle = _ref.hideSubtitle,
      instance = _ref.instance,
      hasError = _ref.hasError;

  if (hideTitle && hideSubtitle) {
    return null;
  }

  var title = !hideTitle ? renderTitle(subsection, instance, hasError) : null;
  var subtitle = !hideSubtitle ? renderSubtitle(subsection) : null;

  if (title || subtitle) {
    return _react.default.createElement("div", {
      className: "panel-heading"
    }, title, subtitle);
  }

  return null;
};

var renderTitle = function renderTitle(subsection, instance, hasError) {
  return _react.default.createElement("div", null, subsection.title, "\xA0", hasError ? _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "asterisk",
    className: "has-text-danger"
  }) : null);
};

var renderSubtitle = function renderSubtitle(subsection) {
  if (subsection.subtitle) {
    return _react.default.createElement("h2", {
      className: "subtitle",
      style: {
        fontSize: '.75em'
      }
    }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: "angle-right"
    }), "\xA0", subsection.subtitle);
  }
};

FormSubsectionPanelTitle.propTypes = {
  subsection: _propTypes.default.object.isRequired,
  instance: _propTypes.default.object.isRequired,
  hasError: _propTypes.default.bool.isRequired,
  hideTitle: _propTypes.default.bool,
  hideSubtitle: _propTypes.default.bool
};
var _default = FormSubsectionPanelTitle;
exports.default = _default;