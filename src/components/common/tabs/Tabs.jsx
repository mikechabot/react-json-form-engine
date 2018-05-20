import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

import { __hasValue } from '../../../common/common';
import Flex from '../glamorous/Flex';

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._renderTabLink = this._renderTabLink.bind(this);
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

        return (
            <Flex id={id} column flex={1} className="overflow-hidden">
                <Flex className="tabs" flexShrink={0}>
                    {this._renderTabLinks(tabs)}
                </Flex>
                <Flex className="overflow-auto" flex={1}>
                    {this._renderTabContent(tabs)}
                </Flex>
            </Flex>
        );
    }

    _renderTabLinks(tabs) {
        return <ul>{tabs.map(this._renderTabLink)}</ul>;
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
                <a>{label}</a>
            </li>
        );
    }

    _renderTabContent(tabs) {
        return tabs.map((tab, key) => {
            if (tab.props.eventKey === this._getActiveKey()) {
                return React.cloneElement(tab, { stacked: this._isStacked(), key });
            }
        });
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
    children: PropTypes.node.isRequired
};

export default Tabs;
