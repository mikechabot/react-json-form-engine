import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, NavbarItem, NavbarItemEnd } from '../glamorous';
import { Icon } from '../index';

class FormTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
        this._toggleMenu = this._toggleMenu.bind(this);
    }
    render() {
        const { id, controlsRight } = this.props;
        return (
            <Navbar id={id}>
                <NavbarBrand>{this._renderBrand()}</NavbarBrand>
                {this._maybeRenderControlsRight(controlsRight)}
            </Navbar>
        );
    }

    _renderBrand() {
        const { url } = this.props;
        const { icon, iconPrefix, label } = this.props;
        return (
            <NavbarItem href={url}>
                {_renderIcon(icon, iconPrefix)}
                {_renderLabel(label)}
            </NavbarItem>
        );
    }

    _maybeRenderControlsRight(controls) {
        if (controls) {
            return <NavbarItemEnd>{controls}</NavbarItemEnd>;
        }
    }
    _toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu });
    }
}

const _renderIcon = (icon, iconPrefix) => {
    if (icon) {
        return (
            <span key="icon">
                <Icon icon={icon} prefix={iconPrefix} />&nbsp;
            </span>
        );
    }
};

const _renderLabel = label => {
    return <span key="label">{label}</span>;
};

FormTitle.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    theme: PropTypes.string,
    iconPrefix: PropTypes.string,
    label: PropTypes.node.isRequired,
    controlsRight: PropTypes.node,
    url: PropTypes.string
};

export default FormTitle;
