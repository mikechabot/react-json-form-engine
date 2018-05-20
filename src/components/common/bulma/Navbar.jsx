import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-6-mobile';

const Navbar = ({ id, icon, iconPrefix, label, url, controlsRight }) => {
    return (
        <nav id={id} className="navbar is-dark" aria-label="main navigation">
            <div className="navbar-brand">{_renderBrand(icon, iconPrefix, label, url)}</div>
            {_renderControlsRight(controlsRight)}
        </nav>
    );
};

const _renderBrand = (icon, iconPrefix, label, url) => {
    const children = _renderIconAndLabel(icon, iconPrefix, label);
    if (url) {
        return (
            <a href={url} className={className}>
                {children}
            </a>
        );
    }
    return <span className={className}>{children}</span>;
};

const _renderControlsRight = controlsRight => {
    if (controlsRight) {
        return (
            <div className="navbar-end">
                <div className="navbar-item">{controlsRight}</div>
            </div>
        );
    }
};

const _renderIconAndLabel = (icon, iconPrefix, label) => {
    return (
        <span>
            {_renderIcon(icon, iconPrefix)}
            {_renderLabel(label)}
        </span>
    );
};

const _renderIcon = (icon, iconPrefix) => {
    if (icon) {
        return (
            <span>
                <Icon icon={icon} prefix={iconPrefix} />&nbsp;
            </span>
        );
    }
};

const _renderLabel = label => {
    return <span>{label}</span>;
};

Navbar.propTypes = {
    id: PropTypes.string,
    icon: PropTypes.string,
    iconPrefix: PropTypes.string,
    label: PropTypes.node.isRequired,
    controlsRight: PropTypes.node,
    url: PropTypes.string
};

export default Navbar;
