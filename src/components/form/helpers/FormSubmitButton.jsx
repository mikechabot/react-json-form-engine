import React from 'react';
import PropTypes from 'prop-types';

const FormSubmitButton = ({ onSubmit, label }) => (
    <button className="button is-link" onClick={onSubmit}>
        {label || 'Submit'}
    </button>
);

FormSubmitButton.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string
};

export default FormSubmitButton;
