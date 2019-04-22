import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ValidationGenericError = ({ message }) => (
    <div className="__rjfe__">
        <FontAwesomeIcon icon="exclamation-triangle" className="has-text-danger" />
        &nbsp;
        <strong className="has-text-danger">{message}</strong>
    </div>
);

ValidationGenericError.propTypes = {
    message: PropTypes.string.isRequired
};

export default ValidationGenericError;
