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

var _FormSubsectionTitle = require('./helpers/FormSubsectionTitle');

var _FormSubsectionTitle2 = _interopRequireDefault(_FormSubsectionTitle);

var _ValidationResults = require('./validation/ValidationResults');

var _ValidationResults2 = _interopRequireDefault(_ValidationResults);

var _glamorous = require('../common/glamorous');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormSubsection = function (_React$Component) {
    _inherits(FormSubsection, _React$Component);

    function FormSubsection() {
        _classCallCheck(this, FormSubsection);

        return _possibleConstructorReturn(this, (FormSubsection.__proto__ || Object.getPrototypeOf(FormSubsection)).apply(this, arguments));
    }

    _createClass(FormSubsection, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                subsection = _props.subsection,
                hasSiblings = _props.hasSiblings,
                instance = _props.instance,
                onUpdate = _props.onUpdate;

            return _react2.default.createElement(
                _glamorous.Flex,
                { column: true, flex: 1, className: 'panel', flexShrink: 0 },
                this._maybeRenderSubsectionTitle(subsection, instance, hasSiblings),
                _react2.default.createElement(
                    'div',
                    { className: 'panel-block' },
                    this._renderSubsectionContent(subsection, instance, onUpdate)
                ),
                this._maybeRenderValidationMessages(subsection, instance)
            );
        }
    }, {
        key: '_renderSubsectionContent',
        value: function _renderSubsectionContent(subsection, instance, onUpdate) {
            var style = { maxWidth: this.props.maxWidth || 500 };
            return _react2.default.createElement(
                'ol',
                { className: 'field-list', style: style },
                subsection.fields.map(this._renderSubsectionField.bind(this, instance, onUpdate))
            );
        }
    }, {
        key: '_renderSubsectionField',
        value: function _renderSubsectionField(instance, onUpdate, fieldDef, index) {
            var field = instance.getField(fieldDef.id);
            if (instance.evaluateFieldShowCondition(field)) {
                return _react2.default.createElement(
                    'li',
                    { key: index, style: { marginTop: 10 } },
                    _react2.default.createElement(_FormField2.default, {
                        id: field.id,
                        field: field,
                        onUpdate: onUpdate,
                        instance: instance,
                        value: instance.getModelValue(field.id)
                    })
                );
            }
        }
    }, {
        key: '_maybeRenderSubsectionTitle',
        value: function _maybeRenderSubsectionTitle(subsection, instance, hasSiblings) {
            if (!hasSiblings || subsection.subtitle) {
                return _react2.default.createElement(
                    'div',
                    { className: 'panel-heading' },
                    _react2.default.createElement(_FormSubsectionTitle2.default, {
                        subsection: subsection,
                        instance: instance,
                        hasSiblings: hasSiblings
                    })
                );
            }
        }
    }, {
        key: '_maybeRenderValidationMessages',
        value: function _maybeRenderValidationMessages(subsection, instance) {
            if (instance.subsectionHasError(subsection)) {
                return _react2.default.createElement(_ValidationResults2.default, { instance: instance, subsection: subsection });
            }
        }
    }]);

    return FormSubsection;
}(_react2.default.Component);

FormSubsection.propTypes = {
    subsection: _propTypes2.default.object.isRequired,
    onUpdate: _propTypes2.default.func.isRequired,
    instance: _propTypes2.default.object.isRequired,
    hasSiblings: _propTypes2.default.bool
};

exports.default = FormSubsection;