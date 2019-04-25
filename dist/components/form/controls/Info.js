"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Info = function Info(_ref) {
  var id = _ref.id,
      field = _ref.field;
  if (!field.content && !field.title) return null;
  var content = field.content,
      title = field.title;
  return _react["default"].createElement("section", {
    className: "container",
    id: id
  }, title ? _react["default"].createElement("div", null, _react["default"].createElement("div", {
    className: "is-size-6 has-text-weight-semibold",
    dangerouslySetInnerHTML: {
      __html: title
    }
  })) : null, content ? _react["default"].createElement("div", null, _react["default"].createElement("div", {
    className: "is-size-7",
    dangerouslySetInnerHTML: {
      __html: content
    }
  })) : null);
};

Info.propTypes = {
  id: _propTypes["default"].string.isRequired,
  field: _propTypes["default"].object.isRequired,
  uiDecorators: _propTypes["default"].object
};
var _default = Info;
exports["default"] = _default;