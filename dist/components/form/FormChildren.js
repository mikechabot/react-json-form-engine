"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormField = _interopRequireDefault(require("./FormField"));

var _context = require("../../context");

var _formConst = require("../../form-engine/config/form-const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormChildren = function FormChildren(_ref) {
  var field = _ref.field,
      onUpdate = _ref.onUpdate;
  console.log('Rendering FormChildren for', field.id);
  if (!field[_formConst.PROPERTY.FIELD.FIELDS]) return null;
  return _react.default.createElement(_context.FormConsumer, null, function (_ref2) {
    var instance = _ref2.instance;

    var renderField = function renderField(child) {
      if (instance.isVisible(child)) {
        return _react.default.createElement("li", {
          key: child.id,
          style: {
            marginTop: '.75rem'
          }
        }, _react.default.createElement(_FormField.default, {
          fieldId: child.id,
          field: child,
          value: instance.getModelValue(child.id),
          hasError: instance.fieldHasError(child.id),
          onUpdate: onUpdate
        }));
      }
    };

    return _react.default.createElement("ul", {
      style: {
        marginLeft: '1rem'
      }
    }, field[_formConst.PROPERTY.FIELD.FIELDS].map(function (child) {
      return renderField(child);
    }));
  });
};

FormChildren.propTypes = {
  field: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired,
    fields: _propTypes.default.array,
    options: _propTypes.default.array
  }),
  onUpdate: _propTypes.default.func.isRequired
};
var _default = FormChildren;
exports.default = _default;