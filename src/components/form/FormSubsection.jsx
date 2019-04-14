import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from '../util';

import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import FormField from './FormField';

class FormSubsection extends React.Component {
    renderSubsectionFields(fields = []) {
        return fields.map(fieldDefinition =>
            this.renderSubsectionField(fieldDefinition, this.props.instance, this.props.onUpdate)
        );
    }

    renderSubsectionField(fieldDef, instance, onUpdate) {
        const field = instance.getField(fieldDef.id);
        if (instance.isVisible(field)) {
            return (
                <div
                    key={field.id}
                    style={{
                        paddingBottom: '.75rem'
                    }}
                >
                    <FormField
                        id={field.id}
                        field={field}
                        onUpdate={onUpdate}
                        instance={instance}
                        hasError={instance.fieldHasError(field.id)}
                        value={instance.getModelValue(field.id)}
                    />
                </div>
            );
        }
    }

    maybeRenderSubmitButton() {
        if (this.props.submitButton) {
            return <div className="panel-block">{this.props.submitButton}</div>;
        }
    }

    render() {
        const { subsection, instance, hideTitle, hideSubtitle } = this.props;
        console.log('Render FormSubsection', subsection.id);

        return (
            <Flex column={true} flex={1} className="panel" flexShrink={0} height="100%">
                <FormSubsectionTitle
                    hasError={instance.subsectionHasError(subsection)}
                    subsection={subsection}
                    instance={instance}
                    hideTitle={hideTitle}
                    hideSubtitle={hideSubtitle}
                />
                <div style={{ width: '100%', height: '100%', padding: '.5em .75em' }}>
                    {this.renderSubsectionFields(subsection.fields)}
                </div>
                {this.maybeRenderSubmitButton()}
            </Flex>
        );
    }
}

FormSubsection.propTypes = {
    instance: PropTypes.object.isRequired,
    subsection: PropTypes.object.isRequired,
    hideTitle: PropTypes.bool,
    hideSubtitle: PropTypes.bool,
    submitButton: PropTypes.node,
    onUpdate: PropTypes.func.isRequired
};

export default FormSubsection;
