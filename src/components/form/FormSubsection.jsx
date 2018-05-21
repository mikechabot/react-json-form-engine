import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';
import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import { Flex } from '../common';

class FormSubsection extends React.Component {
    render() {
        const { subsection, hasSiblings, instance, onUpdate } = this.props;
        return (
            <Flex column={true} flex={1} className="panel" flexShrink={0}>
                {this._maybeRenderSubsectionTitle(subsection, instance, hasSiblings)}
                <div className="panel-block">
                    {this._renderSubsectionContent(subsection, instance, onUpdate)}
                </div>
            </Flex>
        );
    }

    _renderSubsectionContent(subsection, instance, onUpdate) {
        const style = { maxWidth: this.props.maxWidth || 500 };
        return (
            <ol className="field-list" style={style}>
                {subsection.fields.map(this._renderSubsectionField.bind(this, instance, onUpdate))}
            </ol>
        );
    }

    _renderSubsectionField(instance, onUpdate, fieldDef, index) {
        const field = instance.getField(fieldDef.id);
        if (instance.evaluateFieldShowCondition(field)) {
            return (
                <li key={index} style={{ marginTop: 10 }}>
                    <FormField
                        id={field.id}
                        field={field}
                        onUpdate={onUpdate}
                        instance={instance}
                        value={instance.getModelValue(field.id)}
                    />
                </li>
            );
        }
    }

    _maybeRenderSubsectionTitle(subsection, instance, hasSiblings) {
        if (!hasSiblings || subsection.subtitle) {
            return (
                <div className="panel-heading">
                    <FormSubsectionTitle
                        subsection={subsection}
                        instance={instance}
                        hasSiblings={hasSiblings}
                    />
                </div>
            );
        }
    }
}

FormSubsection.propTypes = {
    subsection: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired,
    hasSiblings: PropTypes.bool
};

export default FormSubsection;
