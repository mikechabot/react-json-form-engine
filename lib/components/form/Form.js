'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _reactTabify = require('react-tabify');

var _Asterisk = require('../common/Asterisk');

var _Asterisk2 = _interopRequireDefault(_Asterisk);

var _FormSubmitButton = require('./helpers/FormSubmitButton');

var _FormSubmitButton2 = _interopRequireDefault(_FormSubmitButton);

var _FormTitle = require('../common/bulma/FormTitle');

var _FormTitle2 = _interopRequireDefault(_FormTitle);

var _FormSection = require('./FormSection');

var _FormSection2 = _interopRequireDefault(_FormSection);

var _common = require('../common');

var _glamorous = require('../common/glamorous');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.onUpdate = _this.onUpdate.bind(_this);
        return _this;
    }

    _createClass(Form, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var instance = this.props.instance;

            if (instance.isValid()) {
                instance.validate();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var instance = this.props.instance;
            // No instance

            if (!instance || (0, _isEmpty3.default)(instance)) {
                return _react2.default.createElement(
                    'em',
                    { className: 'text-danger' },
                    'No form instance'
                );
            }
            // Invalid definition
            if (!instance.isValid()) {
                return _react2.default.createElement(_common.APICheckError, { error: instance.error });
            }
            // No sections
            if (instance.getSections().isEmpty()) {
                return _react2.default.createElement(
                    'em',
                    { className: 'text-danger' },
                    'No sections'
                );
            }
            return _react2.default.createElement(
                _glamorous.Flex,
                {
                    id: 'form-' + instance.getId(),
                    column: true,
                    flex: 1,
                    flexShrink: 0,
                    border: '1px solid #dbdbdb',
                    overflow: 'auto'
                },
                this._renderFormTitle(instance),
                this._renderForm(instance.getSections())
            );
        }
    }, {
        key: '_renderFormTitle',
        value: function _renderFormTitle(instance) {
            return _react2.default.createElement(_FormTitle2.default, {
                id: 'form-title-' + instance.getId(),
                iconPrefix: instance.getFormIconPrefix(),
                icon: instance.getFormIcon(),
                label: instance.getFormTitle(),
                controlsRight: _react2.default.createElement(_FormSubmitButton2.default, { onSubmit: this.props.onSubmit })
            });
        }
    }, {
        key: '_renderForm',
        value: function _renderForm(sections) {
            return sections.count() > 1 ? this._renderTabbedSections(sections) : this._renderSingleSection(sections.values()[0]);
        }
    }, {
        key: '_renderTabbedSections',
        value: function _renderTabbedSections(sections) {
            return _react2.default.createElement(
                _reactTabify.Tabs,
                { stacked: true, id: 'form-tabs-' + this.props.instance.getId(), defaultActiveKey: 0 },
                this._renderSectionContent(sections)
            );
        }
    }, {
        key: '_renderSectionContent',
        value: function _renderSectionContent(sections) {
            return sections.values().map(this._renderSectionTabPane.bind(this));
        }
    }, {
        key: '_renderSectionTabPane',
        value: function _renderSectionTabPane(section, index) {
            var label = section.title;
            if (this.props.instance.sectionHasError(section)) {
                label = _react2.default.createElement(
                    'span',
                    null,
                    label,
                    ' ',
                    _react2.default.createElement(_Asterisk2.default, null)
                );
            }
            return _react2.default.createElement(
                _reactTabify.Tab,
                { key: index, eventKey: index, label: label },
                this._renderSingleSection(section)
            );
        }
    }, {
        key: '_renderSingleSection',
        value: function _renderSingleSection(section) {
            return _react2.default.createElement(_FormSection2.default, {
                section: section,
                instance: this.props.instance,
                onUpdate: this.onUpdate,
                onSubmit: this.props.onSubmit
            });
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(event, id) {
            var _props = this.props,
                instance = _props.instance,
                onUpdate = _props.onUpdate;


            id = id || event.target.id;
            var field = instance.getField(id);

            var value = field.actions.onUpdate(event, field, instance.getModelValue(id));

            instance.setModelValue(id, value, field); // Set model value
            // instance.calculateFields(field);               // Calculate fields if necessary
            // instance.triggerDefaultValueEvaluation(tag);   // Trigger default value evaluation
            if (instance.isLiveValidation()) {
                instance.validate(); // Validate the form
            }
            onUpdate({ id: id, value: value }); // Notify parent
        }
    }]);

    return Form;
}(_react2.default.Component);

Form.propTypes = {
    instance: _propTypes2.default.object.isRequired,
    onSubmit: _propTypes2.default.func.isRequired,
    sectionMenuWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    submitButtonLabel: _propTypes2.default.string,
    onUpdate: _propTypes2.default.func
};

exports.default = Form;