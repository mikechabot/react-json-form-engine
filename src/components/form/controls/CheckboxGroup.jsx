import React from 'react';
import Checkbox from './Checkbox';
import FormChildren from '../FormChildren';
import { Flex } from '../../common';

class CheckboxGroup extends React.Component {
    render () {
        const { id, field, value, onUpdate } = this.props;
        if (!field.options) {
            console.warn(`${field.type} is missing required "options" (id: ${id}`);
            return <span />;
        }
        return (
            <Flex column={true}>
                { _.map(field.options, this._renderOption.bind(this, id, value, onUpdate)) }
            </Flex>
        );
    }
    _renderOption (id, value, onUpdate, option, index) {
        return (
            <Flex column={true} key={index}>
                <Checkbox
                    style={{marginBottom: 5}}
                    id={option.id}
                    option={option}
                    onUpdate={() => onUpdate(option.id, id)}
                    value={_.includes(value, option.id.toString())}
                />
                <FormChildren field={option} onUpdate={onUpdate} instance={this.props.instance} />
            </Flex>
        );
    }
}

CheckboxGroup.propTypes = {
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.array
};

export default CheckboxGroup;
