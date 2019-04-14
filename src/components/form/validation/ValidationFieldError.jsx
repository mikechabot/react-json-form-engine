import React from 'react';
import PropTypes from 'prop-types';

import FormControlHint from '../helpers/FormControlHint';
import { Icon } from '../../util';

const ValidationFieldError = ({ id }) => (
    <span className="has-text-danger">
        <Icon icon="exclamation-circle" />
        &nbsp;Error rendering Field with ID: {id}
        <FormControlHint text="Check console for additional details." className="is-danger" />
    </span>
);

ValidationFieldError.propTypes = {
    id: PropTypes.string.isRequired
};

export default ValidationFieldError;
