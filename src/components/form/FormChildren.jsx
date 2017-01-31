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
                {
                    _.map(fields, (childField) => {
                        if (instance.evaluateFieldShowCondition(childField)) {
                            return (
                                <li key={childField.id}>
                                    <FormField
                                        id={childField.id}
                                        field={childField}
                                        value={instance.getModelValue(childField.id)}
                                        instance={instance}
                                        onUpdate={onUpdate}
                                    />
                                </li>
                            );
                        }
                    })
                }
            </ol>
        );
    }
}

FormChildren.propTypes = {
    field: React.PropTypes.object.isRequired
};