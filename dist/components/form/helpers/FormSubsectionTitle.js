"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _util = require("../../util");

var _context = require("../../../context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormSubsectionPanelTitle = function FormSubsectionPanelTitle(_ref) {
  var subsection = _ref.subsection;
  console.log('Rendering FormSubsectionPanelTitle', subsection.id);
  return _react.default.createElement(_context.FormConsumer, null, function (_ref2) {
    var instance = _ref2.instance,
        hideSectionTitles = _ref2.hideSectionTitles,
        hideSectionSubtitles = _ref2.hideSectionSubtitles;

    if (hideSectionTitles && hideSectionSubtitles) {
      return null;
    }

    var title = hideSectionTitles ? null : _react.default.createElement("div", null, subsection.title, "\xA0", instance.subsectionHasError(subsection) ? _react.default.createElement(_util.Asterisk, null) : null);
    var subtitle = hideSectionSubtitles || !subsection.subtitle ? null : _react.default.createElement("h2", {
      className: "subtitle",
      style: {
        fontSize: '.75em',
        marginTop: '.25em'
      }
    }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: "angle-right"
    }), " ", subsection.subtitle);

    if (title || subtitle) {
      return _react.default.createElement("div", {
        className: "panel-heading",
        style: {
          border: 'none',
          borderBottom: '1px solid #dbdbdb'
        }
      }, title, subtitle);
    }

    return null;
  });
};

FormSubsectionPanelTitle.propTypes = {
  subsection: _propTypes.default.object.isRequired
};
var _default = FormSubsectionPanelTitle;
exports.default = _default;