import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormSubmitButton from './FormSubmitButton';

const DEFAULT_THEME = 'is-dark';

@inject('instance', 'hideFormTitle', 'submitButtonLabel')
@observer
class FormTitle extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        hideFormTitle: PropTypes.bool,
        theme: PropTypes.string
    };

    renderFormIcon(instance) {
        if (instance.getFormIcon()) {
            return (
                <FontAwesomeIcon
                    icon={[instance.getFormIconPrefix(), instance.getFormIcon()]}
                    className="m-r-sm"
                />
            );
        }
    }

    renderTitle(instance) {
        return (
            <div className="navbar-brand">
                <span className="navbar-item is-size-4-desktop is-size-5-tablet is-size-5-mobile">
                    {this.renderFormIcon(instance)}
                    <span key="label">{instance.getFormTitle()}</span>
                </span>
            </div>
        );
    }

    render() {
        const { instance, hideFormTitle, theme } = this.props;
        if (hideFormTitle) return null;
        return (
            <div
                id={`form-title-${instance.getId()}`}
                className={`navbar ${theme || DEFAULT_THEME} form-title`}
            >
                {this.renderTitle(instance)}
                <div className="navbar-item">
                    <FormSubmitButton />
                </div>
            </div>
        );
    }
}

export default FormTitle;
