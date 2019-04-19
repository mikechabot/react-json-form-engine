import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

@inject('onSubmit')
class FormSubmitButton extends Component {
    render() {
        return (
            <button className="button is-link" onClick={this.props.onSubmit}>
                {this.props.label || 'Submit'}
            </button>
        );
    }
}

FormSubmitButton.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string
};

export default FormSubmitButton;
