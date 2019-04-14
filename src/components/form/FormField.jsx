import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControl from './FormControl';
import FormChildren from './FormChildren';
import { Flex } from '../util';

class FormField extends Component {
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
