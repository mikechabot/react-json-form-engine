'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('../../common/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_THEME = 'is-dark';
var className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-6-mobile';

var FormTitle = function (_React$Component) {
    _inherits(FormTitle, _React$Component);

    function FormTitle(props) {
        _classCallCheck(this, FormTitle);

        var _this = _possibleConstructorReturn(this, (FormTitle.__proto__ || Object.getPrototypeOf(FormTitle)).call(this, props));

        _this.state = {
            showMenu: false
        };
        _this._toggleMenu = _this._toggleMenu.bind(_this);
        return _this;
    }

    _createClass(FormTitle, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                theme = _props.theme,
                controlsRight = _props.controlsRight;

            return _react2.default.createElement(
                'nav',
                { id: id, className: 'navbar is-transparent ' + (theme || DEFAULT_THEME) },
                _react2.default.createElement(
                    'div',
                    { className: 'navbar-brand' },
                    this._renderBrand(),
                    this._maybeRenderControlsRightContainer(controlsRight)
                ),
                this._maybeRenderControlsRight(controlsRight)
            );
        }
    }, {
        key: '_renderBrand',
        value: function _renderBrand() {
            var url = this.props.url;

            var children = this._renderIconAndLabel();
            if (url) {
                return _react2.default.createElement(
                    'a',
                    { href: url, className: className },
                    children
                );
            }
            return _react2.default.createElement(
                'span',
                { className: className },
                children
            );
        }
    }, {
        key: '_renderIconAndLabel',
        value: function _renderIconAndLabel() {
            var _props2 = this.props,
                icon = _props2.icon,
                iconPrefix = _props2.iconPrefix,
                label = _props2.label;

            return [_renderIcon(icon, iconPrefix), _renderSpacer(), _renderLabel(label)];
        }
    }, {
        key: '_maybeRenderControlsRightContainer',
        value: function _maybeRenderControlsRightContainer(controls) {
            if (controls) {
                return _react2.default.createElement(
                    'div',
                    {
                        className: 'navbar-burger burger ' + (this.state.showMenu ? 'is-active' : ''),
                        'data-target': 'navbar-controls-right',
                        onClick: this._toggleMenu
                    },
                    _react2.default.createElement('span', null),
                    _react2.default.createElement('span', null),
                    _react2.default.createElement('span', null)
                );
            }
        }
    }, {
        key: '_maybeRenderControlsRight',
        value: function _maybeRenderControlsRight(controls) {
            if (controls) {
                return _react2.default.createElement(
                    'div',
                    {
                        id: this.props.id + '-controls-right',
                        className: 'navbar-menu ' + (this.state.showMenu ? 'is-active' : '')
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'navbar-end' },
                        _react2.default.createElement(
                            'div',
                            { className: 'navbar-item' },
                            _react2.default.createElement(
                                'div',
                                { className: 'field is-grouped' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'control' },
                                    controls
                                )
                            )
                        )
                    )
                );
            }
        }
    }, {
        key: '_toggleMenu',
        value: function _toggleMenu() {
            this.setState({ showMenu: !this.state.showMenu });
        }
    }]);

    return FormTitle;
}(_react2.default.Component);

var _renderIcon = function _renderIcon(icon, iconPrefix) {
    if (icon) {
        return _react2.default.createElement(
            'span',
            { key: 'icon' },
            _react2.default.createElement(_Icon2.default, { icon: icon, prefix: iconPrefix })
        );
    }
};

var _renderLabel = function _renderLabel(label) {
    return _react2.default.createElement(
        'span',
        { key: 'label' },
        label
    );
};

var _renderSpacer = function _renderSpacer() {
    return _react2.default.createElement(
        'span',
        { key: 'spacer' },
        '\xA0'
    );
};

FormTitle.propTypes = {
    id: _propTypes2.default.string.isRequired,
    icon: _propTypes2.default.string,
    theme: _propTypes2.default.string,
    iconPrefix: _propTypes2.default.string,
    label: _propTypes2.default.node.isRequired,
    controlsRight: _propTypes2.default.node,
    url: _propTypes2.default.string
};

exports.default = FormTitle;