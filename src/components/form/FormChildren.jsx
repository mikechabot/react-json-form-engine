import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import FormField from './FormField';

import { PROPERTY } from '../../form-engine/config/form-const';

const {
    FIELD: { FIELDS, ID }
} = PROPERTY;

@inject('instance')
@observer
class FormChildren extends Component {
    static propTypes = {
        instance: PropTypes.instanceOf(Object).isRequired,
        field: PropTypes.shape({
            id: PropTypes.string, // Radio booleans do not have ids
            title: PropTypes.string.isRequired,
            fields: PropTypes.array,
            options: PropTypes.array
        })
    };

    render() {
        const { instance, field } = this.props;
        if (!field[FIELDS]) return null;
        const renderField = child => {
            if (instance.isVisible(child)) {
                return (
                    <li key={child[ID]} style={{ marginTop: '.75rem' }}>
                        <FormField field={child} />
                    </li>
                );
            }
        };

        return <ul style={{ marginLeft: '1rem' }}>{field[FIELDS].map(child => renderField(child))}</ul>;
    }
}

export default FormChildren;
