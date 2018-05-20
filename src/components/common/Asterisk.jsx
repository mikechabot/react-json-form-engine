import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Asterisk = ({ size, message }) => (
    <Icon icon="asterisk" title={message || 'Validation Error'} className="has-text-danger" />
);

Asterisk.propTypes = {
    size: PropTypes.string,
    message: PropTypes.string
};

export default Asterisk;
