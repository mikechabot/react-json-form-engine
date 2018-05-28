'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _formConst = require('../../form/config/form-const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormChildren = function (_React$Component) {
    _inherits(FormChildren, _React$Component);

    function FormChildren() {
        _classCallCheck(this, FormChildren);

        return _possibleConstructorReturn(this, (FormChildren.__proto__ || Object.getPrototypeOf(FormChildren)).apply(this, arguments));
    }

    _createClass(FormChildren, [{
        key: 'render',
        value: function render() {
            var field = this.props.field;

            if (!field || !field[_formConst.PROPERTY.FIELD.FIELDS]) {
                return null;
            }

            var fields = field.fields;
            var _props = this.props,
                instance = _props.instance,
                onUpdate = _props.onUpdate;

            return _react2.default.createElement(
                'ul',
                { style: { marginLeft: '1rem' } },
                fields.map(this._renderField.bind(this, instance, onUpdate))
            );
        }
    }, {
        key: '_renderField',
        value: function _renderField(instance, onUpdate, child) {
            if (instance.evaluateFieldShowCondition(child)) {
                return _react2.default.createElement(
                    'li',
                    { key: child.id },
                    _react2.default.createElement(_FormField2.default, {
                        id: child.id,
                        field: child,
                        value: instance.getModelValue(child.id),
                        instance: instance,
                        onUpdate: onUpdate
                    })
                );
            }
        }
    }]);

    return FormChildren;
}(_react2.default.Component);

exports.default = FormChildren;


FormChildren.propTypes = {
    field: _propTypes2.default.object.isRequired,
    instance: _propTypes2.default.object.isRequired,
    onUpdate: _propTypes2.default.func.isRequired
};