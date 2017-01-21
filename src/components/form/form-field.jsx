import React from 'react';
import FormItem from './form-item';
import _ from 'lodash';

class FormField extends React.Component {

    hasChildren (field) {
        return field.fields || _.some(field.options, option => option.fields);
    }

    renderChildren (children) {
        const { instance, onUpdate } = this.props;
        children = _.orderBy(children, 'sortOrder');
        return (
            <ol style={{listStyle: 'none'}}>
                {
                    _.map(children, (child) => {
                        const tag = child.tag;
                        if (instance.evaluateShowCondition(child, tag)) {
                            return (
                                <li key={tag}>
                                    <FormField
                                        tag={tag}
                                        id={tag}
                                        field={child}
                                        value={instance.getModelValue(tag)}
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

    render () {
        const { field } = this.props;
        return (
            <div style={{height: '100%'}}>
                <FormItem {...this.props} />
                {
                    this.hasChildren(field)
                        ? this.renderChildren(field.fields)
                        : ''
                }
            </div>
        );
    }
}

FormField.propTypes = {
    tag     : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool,
        React.PropTypes.array,
        React.PropTypes.object
    ]),
    instance: React.PropTypes.shape({
        definition       : React.PropTypes.object.isRequired,
        model            : React.PropTypes.object.isRequired,
        sections         : React.PropTypes.array.isRequired,
        fields           : React.PropTypes.object.isRequired,
        validationResults: React.PropTypes.object.isRequired
    }).isRequired
};

export default FormField;
