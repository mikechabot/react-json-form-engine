"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Info = function Info(_ref) {
  var id = _ref.id,
      field = _ref.field;
  if (!field.content) return null;
  var _field$content = field.content,
      header = _field$content.header,
      text = _field$content.text;
  return _react.default.createElement("section", {
    className: "container",
    id: id
  }, header ? _react.default.createElement("h1", {
    className: "is-size-5"
  }, header) : null, _react.default.createElement("h2", null, text));
};

Info.propTypes = {
  id: _propTypes.default.string.isRequired,
  field: _propTypes.default.object.isRequired,
  uiDecorators: _propTypes.default.object
};
var _default = Info;
exports.default = _default;