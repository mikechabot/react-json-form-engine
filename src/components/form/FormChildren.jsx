import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';

import { PROPERTY } from '../../form-engine/config/form-const';

export default class FormChildren extends React.Component {
    render() {
        const { field } = this.props;
        if (!field || !field[PROPERTY.FIELD.FIELDS]) {
            return null;
        }

        const { fields } = field;
        const { instance, onUpdate } = this.props;
        return (
            <ul style={{ marginLeft: '1rem' }}>
                {fields.map(this._renderField.bind(this, instance, onUpdate))}
            </ul>
        );
    }
    _renderField(instance, onUpdate, child) {
        if (instance.isVisible(child)) {
            return (
                <li key={child.id} style={{ marginTop: '.75rem' }}>
                    <FormField
                        id={child.id}
                        field={child}
                        value={instance.getModelValue(child.id)}
                        hasError={instance.fieldHasError(child.id)}
                        instance={instance}
                        onUpdate={onUpdate}
                    />
                </li>
            );
        }
    }
}

FormChildren.propTypes = {
    field: PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
};
