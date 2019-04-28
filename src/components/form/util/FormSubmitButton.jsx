import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

@inject('instance', 'onSubmit', 'submitButtonLabel', 'disableSubmitOnValidationError')
@observer
class FormSubmitButton extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        submitButtonLabel: PropTypes.string
    };
    render() {
        const { instance, submitButtonLabel, onSubmit, disableSubmitOnValidationError } = this.props;
        const disable = disableSubmitOnValidationError && instance.formHasError();
        return (
            <button className="button is-link" onClick={onSubmit} disabled={disable}>
                {submitButtonLabel || 'Submit'}
            </button>
        );
    }
}

export default FormSubmitButton;
