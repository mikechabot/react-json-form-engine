import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import FormSubmitButton from './helpers/FormSubmitButton';
import FormSection from './FormSection';
import FormTitle from './helpers/FormTitle';
import TabbedForm from './TabbedForm';

const formContainer = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexShrink: 0,
    border: '1px solid #dbdbdb'
};

@inject('instance', 'hideFormTitle', 'hideSubsectionTitles')
@observer
class Form extends Component {
    renderFormTitle(instance, hideFormTitle, submitButtonLabel) {
        if (hideFormTitle) return null;
        return (
            <FormTitle
                id={`form-title-${instance.getId()}`}
                iconPrefix={instance.getFormIconPrefix()}
                icon={instance.getFormIcon()}
                label={instance.getFormTitle()}
                controlsRight={<FormSubmitButton label={submitButtonLabel} />}
            />
        );
    }

    renderForm(instance, hideFormTitle, submitButtonLabel) {
        const sections = instance.getSections();
        if (sections.length > 1) return <TabbedForm />;
        return (
            <FormSection
                section={sections[0]}
                submitButton={hideFormTitle ? <FormSubmitButton label={submitButtonLabel} /> : null}
            />
        );
    }

    render() {
        const { instance, hideFormTitle, submitButtonLabel, hideSubsectionTitles } = this.props;
        console.log('Rendering FormConsumer', hideSubsectionTitles);

        return (
            <div style={formContainer}>
                {this.renderFormTitle(instance, hideFormTitle, submitButtonLabel)}
                {this.renderForm(instance, hideFormTitle, submitButtonLabel)}
            </div>
        );
    }
}

Form.propTypes = {
    instance: PropTypes.object.isRequired,
    submitButtonLabel: PropTypes.string,
    hideFormTitle: PropTypes.bool,
    hideSubsectionTitles: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Form;
