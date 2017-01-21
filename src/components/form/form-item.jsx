import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormItemTitle from './helpers/form-item-title';
import FormItemHint from './helpers/form-item-hint';
import ErrorBlock from './helpers/error-block';
import _ from 'lodash';

class FormItem extends React.Component {

    /**
     * Determine if the component should call render() to update itself.
     *
     * Right now, we'll always re-render the component if it contains
     * children. Those components themselves will call this method to
     * determine if they should re-render themselves. If this becomes
     * a performance issue, we could potentially before a deep comparison
     * between the prop trees, but that seems excessive right now.
     *
     * @param nextProps
     * @param nextState
     * @returns {boolean} true if the component should call render()
     */
    shouldComponentUpdate (nextProps, nextState) {
        if (!this.hasChildren(nextProps.field)) {
            return !_.isEqual(nextProps, this.props);
        }
        return true;
    }

    /**
     * Check the field for children, otherwise
     * check the options field for children
     *
     * @param field
     * @returns {boolean}
     */
    hasChildren (field) {
        return field.fields || _.some(field.options, option => option.fields);
    }

    render () {
        const { tag, value, field, instance, onUpdate } = this.props;
        const { component, uiField } = field;

        if (!component || !component.control) {
            return <ErrorBlock tag={tag} id={field.id} />;
        }

        // Assign to uppercase so the JSX compiler deems it a custom component
        const Control = component.control;

        return (
            <FormGroup>
                <FormItemTitle tag={tag} field={field} component={component} instance={instance} />
                <Control
                    tag={tag}
                    value={value}
                    field={field}
                    uiField={uiField}
                    onUpdate={onUpdate}
                    instance={instance}
                />
                <FormItemHint hint={uiField.hint} />
            </FormGroup>
        );
    }
}

FormItem.propTypes = {
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

export default FormItem;
