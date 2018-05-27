'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _maybeBaby = require('maybe-baby');

var _maybeBaby2 = _interopRequireDefault(_maybeBaby);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _FormItemTitle = require('./helpers/FormItemTitle');

var _FormItemTitle2 = _interopRequireDefault(_FormItemTitle);

var _FormItemHint = require('./helpers/FormItemHint');

var _FormItemHint2 = _interopRequireDefault(_FormItemHint);

var _ValidationFieldError = require('./validation/ValidationFieldError');

var _ValidationFieldError2 = _interopRequireDefault(_ValidationFieldError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormControl = function (_React$Component) {
    _inherits(FormControl, _React$Component);

    function FormControl() {
        _classCallCheck(this, FormControl);

        return _possibleConstructorReturn(this, (FormControl.__proto__ || Object.getPrototypeOf(FormControl)).apply(this, arguments));
    }

    _createClass(FormControl, [{
        key: 'shouldComponentUpdate',

        /**
         * Determine if the component should call render() to update itself.
         *
         * Right now, we'll always re-render the component if it contains
         * children. Those components themselves will call this method to
         * determine if they should re-render themselves. If this becomes
         * a performance issue, we could potentially before a deep comparison
         * between the prop trees, but that seems excessive right now.
         *
         * @param nextProps
         * @returns {boolean} true if the component should call render()
         */
        value: function shouldComponentUpdate(nextProps) {
            if (!this._hasFieldChildren(nextProps.field)) {
                return !(0, _isEqual3.default)(nextProps, this.props);
            }
            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                value = _props.value,
                field = _props.field,
                instance = _props.instance,
                onUpdate = _props.onUpdate;
            var component = field.component,
                uiDecorators = field.uiDecorators;


            if (!component || !component.element) {
                console.error('Field of type "' + field.type + '" is missing required "component" (id: ' + id + ')');
                return _react2.default.createElement(_ValidationFieldError2.default, { id: field.id });
            }

            // Assign to uppercase for the JSX compiler
            var Control = component.element;

            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_FormItemTitle2.default, { field: field, decorators: uiDecorators, instance: instance }),
                _react2.default.createElement(
                    'div',
                    { className: 'control' },
                    _react2.default.createElement(Control, {
                        id: id,
                        value: value,
                        field: field,
                        uiDecorators: uiDecorators,
                        onUpdate: onUpdate,
                        instance: instance
                    })
                ),
                this._maybeRenderHint(uiDecorators)
            );
        }
    }, {
        key: '_maybeRenderHint',
        value: function _maybeRenderHint(uiDecorators) {
            if (_maybeBaby2.default.of(uiDecorators).prop('hint').isJust()) {
                return _react2.default.createElement(_FormItemHint2.default, { hint: uiDecorators.hint });
            }
        }

        /**
         * Check for child fields, or option fields with children
         * @param field
         * @returns {boolean}
         */

    }, {
        key: '_hasFieldChildren',
        value: function _hasFieldChildren(field) {
            if (!(0, _isEmpty3.default)(field.fields)) {
                return true;
            }
            if (!(0, _isEmpty3.default)(field.options)) {
                return field.options.some(function (option) {
                    return !(0, _isEmpty3.default)(option.fields);
                });
            }
            return false;
        }
    }]);

    return FormControl;
}(_react2.default.Component);

FormControl.propTypes = {
    id: _propTypes2.default.string.isRequired,
    field: _propTypes2.default.object.isRequired,
    onUpdate: _propTypes2.default.func.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.array, _propTypes2.default.object]),
    instance: _propTypes2.default.object.isRequired
};

exports.default = FormControl;