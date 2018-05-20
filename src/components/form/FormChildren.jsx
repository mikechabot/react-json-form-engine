import PropTypes from 'prop-types';
import React from 'react';
import FormField from './FormField';
import { PROPERTY } from '../../form/config/form-const';

export default class FormChildren extends React.Component {
    render () {
        const { field } = this.props;
        if (!field || !field[PROPERTY.FIELD.FIELDS]) {
            return <span />;
        }
        const { fields } = field;
        const { instance, onUpdate } = this.props;
        return (
            <ol style={{listStyle: 'none'}}>
                { fields.map(this._renderField.bind(this, instance, onUpdate)) }
            </ol>
        );
    }
    _renderField (instance, onUpdate, child, index) {
        if (instance.evaluateFieldShowCondition(child)) {
            return (
                <li key={index}>
                    <FormField
                        id={child.id}
                        field={child}
                        value={instance.getModelValue(child.id)}
                        instance={instance}
                        onUpdate={onUpdate}
                    />
                </li>
            );
        }
    }
}

FormChildren.propTypes = {
    field   : PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
};
