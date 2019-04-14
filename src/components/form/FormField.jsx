import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControl from './FormControl';
import FormChildren from './FormChildren';
import { Flex } from '../util';
import _isEmpty from 'lodash/isEmpty';

class FormField extends Component {
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
        if (!this.hasFieldChildren(nextProps.field)) {
            return nextProps.value !== this.props.value || nextProps.hasError !== this.props.hasError;
        }
        return true;
    }
    /**
     * Check for child fields, or option fields with children
     * @param field
     * @returns {boolean}
     */
    hasFieldChildren(field) {
        if (!_isEmpty(field.fields)) {
            return true;
        }
        if (!_isEmpty(field.options)) {
            return field.options.some(option => !_isEmpty(option.fields));
        }
        return false;
    }
    render() {
        return (
            <Flex column className="field">
                <FormControl {...this.props} />
                <FormChildren {...this.props} />
            </Flex>
        );
    }
}

FormField.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object
    ]),
    instance: PropTypes.object.isRequired
};

export default FormField;
