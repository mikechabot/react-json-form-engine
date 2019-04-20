import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { Flex } from '../util';
import FormControl from './FormControl';
import FormChildren from './FormChildren';

import { PROPERTY } from '../../form-engine/config/form-const';

const {
    FIELD: { ID, FIELDS, OPTIONS }
} = PROPERTY;

/**
 * Check for child fields, or option fields with children
 * @param field
 * @returns {boolean}
 */

function hasFieldChildren(field) {
    if (!isEmpty(field[FIELDS])) {
        return true;
    }
    if (!isEmpty(field[OPTIONS])) {
        return field[OPTIONS].some(option => !isEmpty(option[FIELDS]));
    }
    return false;
}

class FormField extends Component {
    static propTypes = {
        field: PropTypes.object.isRequired
    };

    render() {
        const { field } = this.props;
        if (!field) return null;
        return (
            <Flex column className="field" id={`field-${field[ID]}`}>
                <FormControl field={field} />
                {hasFieldChildren(field) ? <FormChildren field={field} /> : null}
            </Flex>
        );
    }
}

export default FormField;
