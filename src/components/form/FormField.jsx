import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControl from './FormControl';
import FormChildren from './FormChildren';
import { Flex } from '../util';
import isEmpty from 'lodash/isEmpty';
import { PROPERTY } from '../../form-engine/config/form-const';

const {
    FIELD: { ID, FIELDS, OPTIONS }
} = PROPERTY;

class FormField extends Component {
    /**
     * Check for child fields, or option fields with children
     * @param field
     * @returns {boolean}
     */
    hasFieldChildren(field) {
        if (!isEmpty(field[FIELDS])) {
            return true;
        }
        if (!isEmpty(field[OPTIONS])) {
            return field[OPTIONS].some(option => !isEmpty(option[FIELDS]));
        }
        return false;
    }

    render() {
        const { field } = this.props;
        console.log('Rendering FormField', field.id);
        return (
            <Flex column className="field" id={`field-${field[ID]}`}>
                <FormControl {...this.props} />
                {this.hasFieldChildren(field) ? <FormChildren {...this.props} /> : null}
            </Flex>
        );
    }
}

FormField.propTypes = {
    fieldId: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object
    ])
};

export default FormField;
