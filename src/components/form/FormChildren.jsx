import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';

import { PROPERTY } from '../../form-engine/config/form-const';
import { inject, observer } from 'mobx-react';

@inject('instance')
@observer
class FormChildren extends Component {
    render() {
        const { instance, onUpdate, field } = this.props;

        console.log('Rendering FormChildren for', field.id);

        if (!field[PROPERTY.FIELD.FIELDS]) return null;

        const renderField = child => {
            if (instance.isVisible(child)) {
                return (
                    <li key={child.id} style={{ marginTop: '.75rem' }}>
                        <FormField fieldId={child.id} field={child} />
                    </li>
                );
            }
        };

        return (
            <ul style={{ marginLeft: '1rem' }}>
                {field[PROPERTY.FIELD.FIELDS].map(child => renderField(child))}
            </ul>
        );
    }
}

FormChildren.propTypes = {
    field: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        fields: PropTypes.array,
        options: PropTypes.array
    })
};

export default FormChildren;
