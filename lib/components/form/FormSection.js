'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTabify = require('react-tabify');

var _FormSubsectionTitle = require('./helpers/FormSubsectionTitle');

var _FormSubsectionTitle2 = _interopRequireDefault(_FormSubsectionTitle);

var _FormSubsection = require('./FormSubsection');

var _FormSubsection2 = _interopRequireDefault(_FormSubsection);

var _glamorous = require('../common/glamorous');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormSection = function (_React$Component) {
    _inherits(FormSection, _React$Component);

    function FormSection() {
        _classCallCheck(this, FormSection);

        return _possibleConstructorReturn(this, (FormSection.__proto__ || Object.getPrototypeOf(FormSection)).apply(this, arguments));
    }

    _createClass(FormSection, [{
        key: 'render',
        value: function render() {
            var section = this.props.section;
            var subsections = section.subsections;


            return _react2.default.createElement(
                _glamorous.Flex,
                { id: section.id, flexShrink: 0 },
                this._renderSubsections(section, subsections)
            );
        }
    }, {
        key: '_renderSubsections',
        value: function _renderSubsections(section, subsections) {
            return subsections.length === 1 ? this._renderSingleSubsection(subsections[0]) : this._renderTabs(section, subsections);
        }
    }, {
        key: '_renderTabs',
        value: function _renderTabs(section, subsections) {
            return _react2.default.createElement(
                _reactTabify.Tabs,
                { id: section.id + '-subsection-tabs', defaultActiveKey: 0 },
                subsections.map(this._renderSubsectionTab.bind(this, this.props.instance))
            );
        }
    }, {
        key: '_renderSubsectionTab',
        value: function _renderSubsectionTab(instance, subsection, index) {
            return _react2.default.createElement(
                _reactTabify.Tab,
                {
                    key: index,
                    eventKey: index,
                    label: _react2.default.createElement(_FormSubsectionTitle2.default, { subsection: subsection, instance: instance, isTab: true })
                },
                this._renderSingleSubsection(subsection, true)
            );
        }
    }, {
        key: '_renderSingleSubsection',
        value: function _renderSingleSubsection(subsection, hasSiblings) {
            return _react2.default.createElement(_FormSubsection2.default, {
                hasSiblings: hasSiblings,
                subsection: subsection,
                instance: this.props.instance,
                onUpdate: this.props.onUpdate
            });
        }
    }]);

    return FormSection;
}(_react2.default.Component);

FormSection.propTypes = {
    section: _propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired,
        title: _propTypes2.default.string.isRequired,
        subsections: _propTypes2.default.array.isRequired
    }),
    onUpdate: _propTypes2.default.func.isRequired,
    onSubmit: _propTypes2.default.func.isRequired,
    instance: _propTypes2.default.object.isRequired
};

exports.default = FormSection;