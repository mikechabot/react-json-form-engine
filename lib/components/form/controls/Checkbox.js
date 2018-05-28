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

var Checkbox = function Checkbox(_ref) {
  var id = _ref.id,
      field = _ref.field,
      option = _ref.option,
      value = _ref.value,
      onUpdate = _ref.onUpdate;

  var icon = (value ? 'check-' : '') + 'square';
  return _react2.default.createElement(
    'div',
    { id: id, className: 'control' },
    _react2.default.createElement(
      'div',
      { className: 'checkbox', onClick: function onClick() {
          return onUpdate(!value, id);
        } },
      _react2.default.createElement(_common.Icon, { prefix: 'far', icon: icon }),
      '\xA0',
      _react2.default.createElement(
        'span',
        null,
        _getTitle(option, field)
      )
    )
  );
};

function _getTitle(option, field) {
  if (option) return option.title;
  return field.title;
}

Checkbox.propTypes = {
  id: _propTypes2.default.string.isRequired,
  field: _propTypes2.default.object,
  option: _propTypes2.default.object,
  value: _propTypes2.default.bool,
  onUpdate: _propTypes2.default.func.isRequired
};

exports.default = Checkbox;