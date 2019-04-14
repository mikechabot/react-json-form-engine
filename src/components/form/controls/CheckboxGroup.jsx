import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { Flex } from '../../util';

import Checkbox from './Checkbox';
import ValidationFieldError from '../validation/ValidationFieldError';
import FormChildren from '../FormChildren';

const CheckboxGroup = ({ id, field, value, instance, onUpdate }) => {
    if (isEmpty(field.options)) {
        console.error(`Field of type "${field.type}" is missing required "options" array (id: ${id})`);
        return <ValidationFieldError id={id} />;
    }
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
