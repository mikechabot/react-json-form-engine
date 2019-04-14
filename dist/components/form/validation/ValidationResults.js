"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _util = require("../../util");

var _ValidationMessages = _interopRequireDefault(require("./ValidationMessages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationResults = function ValidationResults(_ref) {
  var instance = _ref.instance,
      subsection = _ref.subsection;
  var results = instance.getValidationResults();
  console.log(results);
  var validationStateMap = results.validationStateMap;

  if (!instance.hasError()) {
    return null;
  }

  var includeOnly = null;

  if (subsection) {
    includeOnly = instance.getSubsectionFieldIds(subsection);
  }

  return _react.default.createElement(_util.Flex, {
    column: true,
    flexShrink: 0,
    width: "100%"
  }, Object.keys(validationStateMap).map(function (fieldId) {
    if (!includeOnly || includeOnly.includes(fieldId)) {
      return _react.default.createElement(_ValidationMessages.default, {
        key: fieldId,
        tag: fieldId,
        field: instance.getField(fieldId),
        results: instance.getValidationResultByTag(fieldId)
      });
    }

    return null;
  }).filter(function (message) {
    return message;
  }));
};

ValidationResults.propTypes = {
  instance: _propTypes.default.object.isRequired,
  subsection: _propTypes.default.object,
  validationMessagesLabel: _propTypes.default.string
};
var _default = ValidationResults;
exports.default = _default;