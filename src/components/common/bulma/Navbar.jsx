import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

function Navbar({ brand }) {
    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">{_renderBrand(brand)}</div>
        </nav>
    );
}

function _renderBrand(brand) {
    if (brand.url) {
        return (
            <a
                href={brand.url}
                className="navbar-item is-size-4-desktop is-size-5-tablet is-size-6-mobile"
            >
                <Icon icon={brand.icon} />&nbsp;
                <span>{brand.label}</span>
            </a>
        );
    }
    return (
        <span className="navbar-item is-size-4-desktop is-size-5-tablet is-size-6-mobile">
            <Icon icon={brand.icon} />&nbsp;
            <span>{brand.label}</span>
        </span>
    );
}

Navbar.propTypes = {
    brand: PropTypes.object.isRequired
};

export default Navbar;
