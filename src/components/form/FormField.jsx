import React from 'react';
import FormControl from './FormControl';
import FormChildren from './FormChildren';
import { Flex } from '../common';

class FormField extends React.Component {
    render () {
        return (
            <Flex column={true}>
                <FormControl {...this.props} />
                <FormChildren {...this.props} />
            </Flex>
        );
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
