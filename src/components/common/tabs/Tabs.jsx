import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

import Flex from '../glamorous/Flex';
import { __hasValue } from '../../../common';

const DEFAULT_BORDER = '1px solid #dbdbdb';

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._renderTabLink = this._renderTabLink.bind(this);
    }

    componentDidMount() {
        const { defaultActiveKey } = this.props;
        if (__hasValue(defaultActiveKey)) {
            this.setState({
                uncontrolledActiveKey: defaultActiveKey
            });
        }
    }

    render() {
        const { id, children, stacked } = this.props;

        const tabs = __getTabs(children);

        __detectDescendantTypeMismatches(tabs);
        __detectControlledUncontrolledPropMismatches(
            this.props.activeKey,
            this.props.defaultActiveKey,
            this.props.onSelect
        );

        const className = !stacked ? 'tabs' : 'menu';

        return (
            <Flex id={id} column={!stacked} flex={1} className="overflow-hidden">
                <Flex className={className} flexShrink={0} id={`tab-menu-${id}`}>
                    {this._renderTabLinks(tabs, stacked)}
                </Flex>
                <Flex className="overflow-auto" flex={1} id={`tab-content-${id}`}>
                    {this._renderTabContent(tabs)}
                </Flex>
            </Flex>
        );
    }

    _renderTabLinks(tabs, stacked) {
        if (!stacked) {
            return this._renderHorizontalTabLinks(tabs);
        }
        return this._renderVerticalTabLinks(tabs);
    }

    _renderHorizontalTabLinks(tabs) {
        return <ul>{tabs.map(this._renderTabLink)}</ul>;
    }

    _renderVerticalTabLinks(tabs) {
        return (
            <ul
                className="menu-list"
                style={{
                    borderRight: DEFAULT_BORDER,
                    minWidth: this.props.stackedTabListMinWidth || 125
                }}
            >
                {tabs.map(this._renderTabLink)}
            </ul>
        );
    }

    _renderTabLink(child, index) {
        const { label, eventKey } = child.props;
        const isActive = eventKey === this._getActiveKey();
        return (
            <li
                id={`${this.props.id}-tab-item-${eventKey}`}
                key={index}
                className={isActive ? 'is-active' : ''}
                onClick={this._handleTabSelect.bind(this, eventKey)}
            >
                <a className={isActive ? 'is-active' : ''}>{label}</a>
            </li>
        );
    }

    _renderTabContent(tabs) {
        return tabs
            .map((tab, key) => {
                return tab.props.eventKey === this._getActiveKey()
                    ? React.cloneElement(tab, { stacked: this._isStacked(), key })
                    : null;
            })
            .filter(tab => tab);
    }

    _handleTabSelect(eventKey) {
        if (this.props.onSelect) {
            this.props.onSelect(eventKey);
        } else if (eventKey !== this.state.uncontrolledActiveKey) {
            this.setState({ uncontrolledActiveKey: eventKey });
        }
    }

    _getActiveKey() {
        return __hasValue(this.props.activeKey)
            ? this.props.activeKey
            : this.state.uncontrolledActiveKey;
    }

    _isStacked() {
        return this.props.stacked === true;
    }
}

function __getTabs(children) {
    const tabs = !Array.isArray(children) ? [children] : children;
    return tabs.filter(tab => {
        if (!tab) return false;
        return tab.hide !== false;
    });
}

function __detectDescendantTypeMismatches(tabs) {
    const typeMismatches = __getTypeMismatches(tabs);
    if (typeMismatches.length > 0) {
        __logTypeMismatches(typeMismatches);
        throw new Error('Descendant type mismatches detected');
    }
}

function __getTypeMismatches(tabs) {
    if (!tabs) return [];
    return tabs.filter(child => child.type !== <Tab />.type);
}

function __logTypeMismatches(typeMismatches) {
    if (!typeMismatches) return;
    typeMismatches.forEach(typeMismatch => {
        console.error(
            `Expected children of "Tabs" to be of type "Tab", but found type "${__getType(
                typeMismatch
            )}"`
        );
    });
}

function __detectControlledUncontrolledPropMismatches(activeKey, defaultActiveKey, onSelect) {
    if (__hasValues(activeKey, defaultActiveKey)) {
        throw new Error(
            'Mixing controlled and uncontrolled props. Specify an "activeKey" or a "defaultActiveKey", but not both'
        );
    }
    if (__hasValues(defaultActiveKey, onSelect)) {
        throw new Error(
            'Mixing controlled and uncontrolled props. If specifying an "onSelect" function, use "activeKey" instead of "defaultActiveKey'
        );
    }
}

function __getType(instance) {
    if (!instance.type) return 'Unknown';
    if (typeof instance.type === 'function') {
        return instance.type.name;
    }
    return instance.type;
}

function __hasValues(...values) {
    return values.every(value => __hasValue(value));
}

Tabs.propTypes = {
    id: PropTypes.string.isRequired,
    defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    controlsHorizontalRight: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    controlsHorizontalCenter: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stacked: PropTypes.bool,
    onSelect: PropTypes.func,
    children: PropTypes.node.isRequired,
    stackedTabListMinWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Tabs;
