import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';

import { FormConsumer } from '../../context';
import { PROPERTY } from '../../form-engine/config/form-const';

const FormChildren = ({ field, onUpdate }) => {
    console.log('Rendering FormChildren for', field.id);

    if (!field[PROPERTY.FIELD.FIELDS]) return null;

    return (
        <FormConsumer>
            {instance => {
                const renderField = child => {
                    if (instance.isVisible(child)) {
                        return (
                            <li key={child.id} style={{ marginTop: '.75rem' }}>
                                <FormField
                                    fieldId={child.id}
                                    field={child}
                                    value={instance.getModelValue(child.id)}
                                    hasError={instance.fieldHasError(child.id)}
                                    onUpdate={onUpdate}
                                />
                            </li>
                        );
                    }
                };

                return (
                    <ul style={{ marginLeft: '1rem' }}>
                        {field[PROPERTY.FIELD.FIELDS].map(child => renderField(child))}
                    </ul>
                );
            }}
        </FormConsumer>
    );
};

FormChildren.propTypes = {
    field: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        fields: PropTypes.array,
        options: PropTypes.array
    }),
    onUpdate: PropTypes.func.isRequired
};

export default FormChildren;
