import PropTypes from 'prop-types';
import React from 'react';
import _map from 'lodash/map';

import FormField from './FormField';
import FormSubsectionTitle from './helpers/FormSubsectionTitle';
import { Flex } from '../common';

class FormSubsection extends React.Component {
    render() {
        const { hideTitle, subsection, instance, onUpdate } = this.props;
        return (
            <Flex column={true} flex={1} className="panel" flexShrink={0}>
                {this._maybeRenderSubsectionTitle(subsection, instance, hideTitle)}
                <div className="panel-block">
                    <ol
                        className="field-list"
                        style={{ maxWidth: this.props.maxWidth ? this.props.maxWidth : 500 }}
                    >
                        {_map(
                            subsection.fields,
                            this._renderSubsectionField.bind(this, instance, onUpdate)
                        )}
                    </ol>
                </div>
            </Flex>
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

    _maybeRenderSubsectionTitle(subsection, instance, hideTitle) {
        if (!hideTitle) {
            return (
                <div className="panel-heading">
                    <FormSubsectionTitle subsection={subsection} instance={instance} />
                </div>
            );
        }
    }
}

FormSubsection.propTypes = {
    title: PropTypes.string,
    subsection: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

export default FormSubsection;
