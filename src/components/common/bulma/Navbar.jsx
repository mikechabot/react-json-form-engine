import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const className = 'navbar-item is-size-4-desktop is-size-5-tablet is-size-6-mobile';

function Navbar({ icon, label, url }) {
    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">{_renderBrand(icon, label, url)}</div>
        </nav>
    );
}

function _renderBrand(icon, label, url) {
    const children = _renderIconAndLabel(icon, label);
    if (url) {
        return (
            <a href={url} className={className}>
                {children}
            </a>
        );
    }
    return <span className={className}>{children}</span>;
}

const _renderIconAndLabel = (icon, label) => {
    return (
        <span>
            {_renderIcon(icon)}&nbsp;
            {_renderLabel(label)}
        </span>
    );
};

const _renderIcon = icon => {
    return <Icon icon={icon} />;
};

const _renderLabel = label => {
    return <span>{label}</span>;
};

Navbar.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.node.isRequired,
    url: PropTypes.string
};

export default Navbar;
