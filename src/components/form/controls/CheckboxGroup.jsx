import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from '../../util';

import Checkbox from './Checkbox';
import FormChildren from '../FormChildren';

const CheckboxGroup = ({ id, field, value, instance, onUpdate }) => {
    return (
        <Flex column={true}>
            {field.options.map(_renderOption.bind(this, id, value, instance, onUpdate))}
        </Flex>
    );
};

const _renderOption = (id, value, instance, onUpdate, option, index) => {
    return (
        <Flex column={true} key={index} style={index > 0 ? { marginTop: '0.25rem' } : {}}>
            <Checkbox
                id={option.id}
                option={option}
                onUpdate={() => onUpdate(option.id, id)}
                value={!value ? false : value.includes(option.id)}
            />
            <FormChildren field={option} onUpdate={onUpdate} instance={instance} />
        </Flex>
    );
};

CheckboxGroup.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.array,
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

export default CheckboxGroup;
