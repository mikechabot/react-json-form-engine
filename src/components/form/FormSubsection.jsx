import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Flex } from '../util';

import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import FormField from './FormField';
import { inject, observer } from 'mobx-react';

@inject('instance')
@observer
class FormSubsection extends Component {
    render() {
        const { subsection, submitButton, onUpdate, instance } = this.props;

        console.log(instance);

        const renderSubsectionFields = (fields = []) => {
            return fields.map(fieldDefinition => {
                const field = instance.getField(fieldDefinition.id);
                if (!instance.isVisible(field)) return null;
                return <FormField key={field.id} fieldId={field.id} field={field} onUpdate={onUpdate} />;
            });
        };

        console.log('Rendering FormSubsection', subsection.id);

        return (
            <Flex column={true} flex={1} className="panel" flexShrink={0} height="100%">
                <FormSubsectionTitle subsection={subsection} />
                <div style={{ width: '100%', height: '100%', padding: '.5em .75em' }}>
                    {renderSubsectionFields(subsection.fields)}
                </div>
                {submitButton ? <div className="panel-block">{submitButton}</div> : null}
            </Flex>
        );
    }
}

FormSubsection.propTypes = {
    subsection: PropTypes.object.isRequired,
    submitButton: PropTypes.node,
    onUpdate: PropTypes.func.isRequired
};

export default FormSubsection;
