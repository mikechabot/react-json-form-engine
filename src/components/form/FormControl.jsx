import PropTypes from 'prop-types';
import React from 'react';
import _isEqual from 'lodash/isEqual';
import _some from 'lodash/some';
import FormItemTitle from './helpers/FormItemTitle';
import FormItemHint from './helpers/FormItemHint';
import ErrorBlock from './helpers/FieldError';
import Maybe from 'maybe-baby';

class FormControl extends React.Component {
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
    shouldComponentUpdate(nextProps) {
        if (!this._hasFieldChildren(nextProps.field)) {
            return !_isEqual(nextProps, this.props);
        }
        return true;
    }

    render() {
        const { id, value, field, instance, onUpdate } = this.props;
        const { component, uiDecorators } = field;

        if (!component || !component.element) {
            return <ErrorBlock id={field.id} />;
        }

        // Assign to uppercase for the JSX compiler
        const Control = component.element;

        return (
            <div>
                <FormItemTitle field={field} decorators={uiDecorators} instance={instance} />
                <div className="control">
                    <Control
                        id={id}
                        value={value}
                        field={field}
                        uiDecorators={uiDecorators}
                        onUpdate={onUpdate}
                        instance={instance}
                    />
                </div>
                {this._maybeRenderHint(uiDecorators)}
            </div>
        );
    }

    _maybeRenderHint(uiDecorators) {
        if (
            Maybe.of(uiDecorators)
                .prop('hint')
                .isJust()
        ) {
            return <FormItemHint hint={uiDecorators.hint} />;
        }
    }

    /**
     * Check for child fields, or option fields with children
     * @param field
     * @returns {boolean}
     */
    _hasFieldChildren(field) {
        return field.fields || _some(field.options, option => option.fields);
    }
}

FormControl.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object
    ]),
    instance: PropTypes.object.isRequired
};

export default FormControl;
