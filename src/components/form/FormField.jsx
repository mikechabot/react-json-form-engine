import React from 'react';
import FormItem from './FormItem';
import _ from 'lodash';

class FormField extends React.Component {

    render () {
        return (
            <div style={{height: '100%'}}>
                <FormItem {...this.props} />
                { this.renderChildren(this.props.field) }
            </div>
        );
    }

    hasChildren (field) {
        return field.fields || _.some(field.options, option => option.fields);
    }

    renderChildren (field) {
        if (this.hasChildren(field)) {
            const { instance, onUpdate } = this.props;
            return (
                <ol style={{listStyle: 'none'}}>
                    {
                        _.map(field.fields, (child) => {
                            if (instance.evaluateFieldShowCondition(child)) {
                                return (
                                    <li key={child.id}>
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
                        })
                    }
                </ol>
            );
        }
    }
}

FormField.propTypes = {
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool,
        React.PropTypes.array,
        React.PropTypes.object
    ]),
    instance: React.PropTypes.object.isRequired
};

export default FormField;
