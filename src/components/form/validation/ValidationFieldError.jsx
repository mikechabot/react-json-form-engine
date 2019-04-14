import React from 'react';
import PropTypes from 'prop-types';

import FormControlHint from '../helpers/FormControlHint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ValidationFieldError = ({ id }) => (
    <span className="has-text-danger">
        <FontAwesomeIcon icon="exclamation-triangle" />
        &nbsp;There was an error rendering field: "{id}"
        <FormControlHint text="Check console for additional details." className="is-danger" />
    </span>
);

ValidationFieldError.propTypes = {
    id: PropTypes.string.isRequired
};

export default ValidationFieldError;
