import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Asterisk = ({ size, message }) => (
    <FontAwesomeIcon
        icon="asterisk"
        title={message || 'Validation Error'}
        className="has-text-danger"
        size={size || '1x'}
    />
);

Asterisk.propTypes = {
    size: PropTypes.string,
    message: PropTypes.string
};

export default Asterisk;
