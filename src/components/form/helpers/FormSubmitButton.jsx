import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

@inject('onSubmit', 'submitButtonLabel')
@observer
class FormSubmitButton extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        submitButtonLabel: PropTypes.string
    };
    render() {
        return (
            <button className="button is-link" onClick={this.props.onSubmit}>
                {this.props.submitButtonLabel || 'Submit'}
            </button>
        );
    }
}

export default FormSubmitButton;
