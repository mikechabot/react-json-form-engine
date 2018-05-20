import React from 'react';
import PropTypes from 'prop-types';

const FormSubmitButton = ({ onSubmit, submitButtonLabel }) => (
    <div className="has-text-centered">
        <button className="button is-link" onClick={onSubmit}>
            {submitButtonLabel || 'Submit'}
        </button>
    </div>
);

FormSubmitButton.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitButtonLabel: PropTypes.string
};

export default FormSubmitButton;
