import React from 'react';
import PropTypes from 'prop-types';

import FormItemHint from '../helpers/FormItemHint';
import { Icon } from '../../common';

const ValidationFieldError = ({ id }) => (
    <span className="has-text-danger">
        <Icon icon="exclamation-circle" />&nbsp;Error rendering Field with ID: {id}
        <FormItemHint hint="Check console for additional details. " className="has-text-danger" />
    </span>
);

ValidationFieldError.propTypes = {
    id: PropTypes.string.isRequired
};

export default ValidationFieldError;
