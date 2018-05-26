'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Flex = require('../glamorous/Flex');

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
                controlsRight = _props.controlsRight;

            return _react2.default.createElement(
                _Flex.Navbar,
                { id: id },
                _react2.default.createElement(
                    _Flex.NavbarBrand,
                    null,
                    this._renderBrand()
                ),
                this._maybeRenderControlsRight(controlsRight)
            );
        }
    }, {
        key: '_renderBrand',
        value: function _renderBrand() {
            var url = this.props.url;
            var _props2 = this.props,
                icon = _props2.icon,
                iconPrefix = _props2.iconPrefix,
                label = _props2.label;

            return _react2.default.createElement(
                _Flex.NavbarItem,
                { href: url },
                _renderIcon(icon, iconPrefix),
                _renderLabel(label)
            );
        }
    }, {
        key: '_maybeRenderControlsRight',
        value: function _maybeRenderControlsRight(controls) {
            if (controls) {
                return _react2.default.createElement(
                    _Flex.NavbarItemEnd,
                    null,
                    controls
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
            _react2.default.createElement(_index.Icon, { icon: icon, prefix: iconPrefix }),
            '\xA0'
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