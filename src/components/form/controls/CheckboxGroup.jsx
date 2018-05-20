import PropTypes from 'prop-types';
import React from 'react';
import _map from 'lodash/map';
import _includes from 'lodash/includes';

import Checkbox from './Checkbox';
import FormChildren from '../FormChildren';
import { Flex } from '../../common';

class CheckboxGroup extends React.Component {
    render() {
        const { id, field, value, onUpdate } = this.props;
        if (!field.options) {
            console.warn(`${field.type} is missing required "options" (id: ${id}`);
            return <span />;
        }
        return (
            <Flex column={true}>
                {_map(field.options, this._renderOption.bind(this, id, value, onUpdate))}
            </Flex>
        );
    }
    _renderOption(id, value, onUpdate, option, index) {
        return (
            <Flex column={true} key={index}>
                <Checkbox
                    style={{ marginBottom: 5 }}
                    id={option.id}
                    option={option}
                    onUpdate={() => onUpdate(option.id, id)}
                    value={_includes(value, option.id.toString())}
                />
                <FormChildren field={option} onUpdate={onUpdate} instance={this.props.instance} />
            </Flex>
        );
    }
}

CheckboxGroup.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.array
};

export default CheckboxGroup;
