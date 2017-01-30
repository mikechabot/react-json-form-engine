import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormItemTitle from './helpers/FormItemTitle';
import FormItemHint from './helpers/form-item-hint';
import ErrorBlock from './helpers/FieldError';
import Maybe from 'maybe-baby';
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
     * @returns {boolean} true if the component should call render()
     */
    shouldComponentUpdate (nextProps) {
        if (!this._hasFieldChildren(nextProps.field)) {
            return !_.isEqual(nextProps, this.props);
        }
        return true;
    }

    render () {
        const { id, value, field, instance, onUpdate } = this.props;
        const { component, uiDecorators } = field;

        if (!component || !component.element) {
            return <ErrorBlock id={field.id} />;
        }

        // Assign to uppercase for the JSX compiler
        const Control = component.element;

        return (
            <FormGroup>
                <FormItemTitle id={id} field={field} decorators={uiDecorators} instance={instance} />
                <Control
                    id={id}
                    value={value}
                    field={field}
                    uiDecorators={uiDecorators}
                    onUpdate={onUpdate}
                    instance={instance}
                />
                { this._maybeRenderHint(uiDecorators) }
            </FormGroup>
        );
    }

    _maybeRenderHint (uiDecorators) {
        if (Maybe.of(uiDecorators).prop('hint').isJust()) {
            return <FormItemHint hint={uiDecorators.hint} />;
        }
    }

    /**
     * Check for child fields, or option fields with children
     * @param field
     * @returns {boolean}
     */
    _hasFieldChildren (field) {
        return field.fields || _.some(field.options, option => option.fields);
    }
}

FormItem.propTypes = {
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

export default FormItem;
