'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Flex = require('../glamorous/Flex');

var _Flex2 = _interopRequireDefault(_Flex);

var _common = require('../../../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_BORDER = '1px solid #dbdbdb';

var Tabs = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        _this.state = {};
        _this._renderTabLink = _this._renderTabLink.bind(_this);
        return _this;
    }

    _createClass(Tabs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var defaultActiveKey = this.props.defaultActiveKey;

            if ((0, _common.__hasValue)(defaultActiveKey)) {
                this.setState({
                    uncontrolledActiveKey: defaultActiveKey
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                children = _props.children,
                stacked = _props.stacked;


            var tabs = __getTabs(children);

            __detectDescendantTypeMismatches(tabs);
            __detectControlledUncontrolledPropMismatches(this.props.activeKey, this.props.defaultActiveKey, this.props.onSelect);

            var className = !stacked ? 'tabs' : 'menu';

            return _react2.default.createElement(
                _Flex2.default,
                { id: id, column: !stacked, flex: 1, className: 'overflow-hidden' },
                _react2.default.createElement(
                    _Flex2.default,
                    { className: className, flexShrink: 0, id: 'tab-menu-' + id },
                    this._renderTabLinks(tabs, stacked)
                ),
                _react2.default.createElement(
                    _Flex2.default,
                    { className: 'overflow-auto', flex: 1, id: 'tab-content-' + id },
                    this._renderTabContent(tabs)
                )
            );
        }
    }, {
        key: '_renderTabLinks',
        value: function _renderTabLinks(tabs, stacked) {
            if (!stacked) {
                return this._renderHorizontalTabLinks(tabs);
            }
            return this._renderVerticalTabLinks(tabs);
        }
    }, {
        key: '_renderHorizontalTabLinks',
        value: function _renderHorizontalTabLinks(tabs) {
            return _react2.default.createElement(
                'ul',
                null,
                tabs.map(this._renderTabLink)
            );
        }
    }, {
        key: '_renderVerticalTabLinks',
        value: function _renderVerticalTabLinks(tabs) {
            return _react2.default.createElement(
                'ul',
                {
                    className: 'menu-list',
                    style: {
                        borderRight: DEFAULT_BORDER,
                        minWidth: this.props.stackedTabListMinWidth || 125
                    }
                },
                tabs.map(this._renderTabLink)
            );
        }
    }, {
        key: '_renderTabLink',
        value: function _renderTabLink(child, index) {
            var _child$props = child.props,
                label = _child$props.label,
                eventKey = _child$props.eventKey;

            var isActive = eventKey === this._getActiveKey();
            return _react2.default.createElement(
                'li',
                {
                    id: this.props.id + '-tab-item-' + eventKey,
                    key: index,
                    className: isActive ? 'is-active' : '',
                    onClick: this._handleTabSelect.bind(this, eventKey)
                },
                _react2.default.createElement(
                    'a',
                    { className: isActive ? 'is-active' : '' },
                    label
                )
            );
        }
    }, {
        key: '_renderTabContent',
        value: function _renderTabContent(tabs) {
            var _this2 = this;

            return tabs.map(function (tab, key) {
                return tab.props.eventKey === _this2._getActiveKey() ? _react2.default.cloneElement(tab, { stacked: _this2._isStacked(), key: key }) : null;
            }).filter(function (tab) {
                return tab;
            });
        }
    }, {
        key: '_handleTabSelect',
        value: function _handleTabSelect(eventKey) {
            if (this.props.onSelect) {
                this.props.onSelect(eventKey);
            } else if (eventKey !== this.state.uncontrolledActiveKey) {
                this.setState({ uncontrolledActiveKey: eventKey });
            }
        }
    }, {
        key: '_getActiveKey',
        value: function _getActiveKey() {
            return (0, _common.__hasValue)(this.props.activeKey) ? this.props.activeKey : this.state.uncontrolledActiveKey;
        }
    }, {
        key: '_isStacked',
        value: function _isStacked() {
            return this.props.stacked === true;
        }
    }]);

    return Tabs;
}(_react2.default.Component);

function __getTabs(children) {
    var tabs = !Array.isArray(children) ? [children] : children;
    return tabs.filter(function (tab) {
        if (!tab) return false;
        return tab.hide !== false;
    });
}

function __detectDescendantTypeMismatches(tabs) {
    var typeMismatches = __getTypeMismatches(tabs);
    if (typeMismatches.length > 0) {
        __logTypeMismatches(typeMismatches);
        throw new Error('Descendant type mismatches detected');
    }
}

function __getTypeMismatches(tabs) {
    if (!tabs) return [];
    return tabs.filter(function (child) {
        return child.type !== _react2.default.createElement(_Tab2.default, null).type;
    });
}

function __logTypeMismatches(typeMismatches) {
    if (!typeMismatches) return;
    typeMismatches.forEach(function (typeMismatch) {
        console.error('Expected children of "Tabs" to be of type "Tab", but found type "' + __getType(typeMismatch) + '"');
    });
}

function __detectControlledUncontrolledPropMismatches(activeKey, defaultActiveKey, onSelect) {
    if (__hasValues(activeKey, defaultActiveKey)) {
        throw new Error('Mixing controlled and uncontrolled props. Specify an "activeKey" or a "defaultActiveKey", but not both');
    }
    if (__hasValues(defaultActiveKey, onSelect)) {
        throw new Error('Mixing controlled and uncontrolled props. If specifying an "onSelect" function, use "activeKey" instead of "defaultActiveKey');
    }
}

function __getType(instance) {
    if (!instance.type) return 'Unknown';
    if (typeof instance.type === 'function') {
        return instance.type.name;
    }
    return instance.type;
}

function __hasValues() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
    }

    return values.every(function (value) {
        return (0, _common.__hasValue)(value);
    });
}

Tabs.propTypes = {
    id: _propTypes2.default.string.isRequired,
    defaultActiveKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    controlsHorizontalRight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
    controlsHorizontalCenter: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
    activeKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    stacked: _propTypes2.default.bool,
    onSelect: _propTypes2.default.func,
    children: _propTypes2.default.node.isRequired,
    stackedTabListMinWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = Tabs;