import React from 'react';
import PropTypes from 'prop-types';

import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import ValidationResults from './validation/ValidationResults';
import FormField from './FormField';
import { Flex } from '../common';

class FormSubsection extends React.Component {
    render() {
        const { subsection, instance, onUpdate } = this.props;
        return (
            <Flex column={true} flex={1} className="panel" flexShrink={0}>
                {this._maybeRenderSubsectionTitle(subsection, instance)}
                <div className="panel-block">
                    {this._renderSubsectionContent(subsection, instance, onUpdate)}
                </div>
                {this._maybeRenderValidationMessages(subsection, instance)}
                {this._maybeRenderSubmitButton()}
            </Flex>
        );
    }

    _renderSubsectionContent(subsection, instance, onUpdate) {
        const style = { minWidth: '100%' };
        return (
            <div style={style}>
                {subsection.fields.map(this._renderSubsectionField.bind(this, instance, onUpdate))}
            </div>
        );
    }

    _renderSubsectionField(instance, onUpdate, fieldDef, index) {
        const field = instance.getField(fieldDef.id);
        if (instance.evaluateFieldShowCondition(field)) {
            return (
                <div key={index} style={{ marginTop: 10 }}>
                    <FormField
                        id={field.id}
                        field={field}
                        onUpdate={onUpdate}
                        instance={instance}
                        value={instance.getModelValue(field.id)}
                    />
                </div>
            );
        }
    }

    _maybeRenderSubsectionTitle(subsection, instance) {
        return (
            <FormSubsectionTitle
                subsection={subsection}
                instance={instance}
                hideTitle={this.props.hideTitle}
                hideSubtitle={this.props.hideSubtitle}
            />
        );
    }

    _maybeRenderValidationMessages(subsection, instance) {
        if (instance.subsectionHasError(subsection)) {
            return (
                <div className="panel-block">
                    <ValidationResults instance={instance} subsection={subsection} />
                </div>
            );
        }
    }

    _maybeRenderSubmitButton() {
        if (this.props.submitButton) {
            return <div className="panel-block">{this.props.submitButton}</div>;
        }
    }
}

FormSubsection.propTypes = {
    instance: PropTypes.object.isRequired,
    subsection: PropTypes.object.isRequired,
    hasSiblings: PropTypes.bool,
    hideTitle: PropTypes.bool,
    hideSubtitle: PropTypes.bool,
    submitButton: PropTypes.node,
    onUpdate: PropTypes.func.isRequired
};

export default FormSubsection;
