import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, prefix, title, className }) => {
    let iconPrefix = prefix || 'fa';
    return (
        <span title={title}>
            <i className={`${iconPrefix} fa-${icon} ${className || ''}`} />
        </span>
    );
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    classname: PropTypes.string
};

export default Icon;
