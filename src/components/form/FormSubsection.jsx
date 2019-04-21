import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import FormField from './FormField';
import FormSubsectionTitle from './util/FormSubsectionTitle';
import FormSubmitButton from './util/FormSubmitButton';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        flexShrink: 0,
        height: '100%'
    },
    fields: {
        width: '100%',
        height: '100%',
        padding: '.5em .75em'
    },
    submit: {
        border: 'none',
        display: 'flex',
        justifyContent: 'flex-end'
    }
};

@inject('instance', 'hideFormTitle', 'hideSubsectionTitles', 'hideSubsectionSubtitles')
@observer
class FormSubsection extends Component {
    static propTypes = {
        isTabbed: PropTypes.bool,
        instance: PropTypes.instanceOf(Object).isRequired,
        subsection: PropTypes.object.isRequired,
        hideFormTitle: PropTypes.bool.isRequired
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
            <div className="panel-block" style={styles.submit}>
                <FormSubmitButton />
            </div>
        );
    }

    render() {
        const { subsection, hideFormTitle, isTabbed } = this.props;
        return (
            <div style={styles.container} className="panel">
                <FormSubsectionTitle subsection={subsection} isTabbed={isTabbed} />
                <div style={styles.fields}>{this.renderSubsectionFields(subsection.fields)}</div>
                {this.renderSubmit(hideFormTitle)}
            </div>
        );
    }
}
export default FormSubsection;
