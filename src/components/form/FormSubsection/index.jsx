import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import FormField from '../FormField/';
import FormSubsectionTitle from '../util/FormSubsectionTitle';
import FormSubmitButton from '../util/FormSubmitButton';

@inject('instance', 'hideFormTitle', 'hideSubsectionTitles', 'hideSubsectionSubtitles', 'submitButtonLabel')
@observer
class FormSubsection extends Component {
    static propTypes = {
        isTabbed: PropTypes.bool,
        instance: PropTypes.instanceOf(Object).isRequired,
        subsection: PropTypes.object.isRequired,
        hideFormTitle: PropTypes.bool
    };

    renderSubsectionFields(fields = []) {
        const { instance } = this.props;
        return fields.map(fieldDefinition => {
            const field = instance.getField(fieldDefinition.id);
            if (!instance.isVisible(field)) return null;
            return <FormField key={field.id} field={field} />;
        });
    }

    renderSubmit(hideFormTitle) {
        if (!hideFormTitle) return null;
        return (
            <div className="panel-block form-submit-button">
                <FormSubmitButton />
            </div>
        );
    }

    render() {
        const { subsection, hideFormTitle, isTabbed } = this.props;
        return (
            <div className="panel form-subsection">
                <FormSubsectionTitle subsection={subsection} isTabbed={isTabbed} />
                <div className="form-subsection-fields">{this.renderSubsectionFields(subsection.fields)}</div>
                {this.renderSubmit(hideFormTitle)}
            </div>
        );
    }
}

export default FormSubsection;
