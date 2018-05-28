import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import Checkbox from './Checkbox';
import ValidationFieldError from '../validation/ValidationFieldError';
import FormChildren from '../FormChildren';
import { Flex } from '../../common';

const CheckboxGroup = ({ id, field, value, instance, onUpdate }) => {
    if (_isEmpty(field.options)) {
        __logError(id, field);
        return <ValidationFieldError id={id} />;
    }
    return (
        <Flex column={true} style={{ marginBottom: '0.5rem' }}>
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
                value={_isChecked(value, option.id)}
            />
            <FormChildren field={option} onUpdate={onUpdate} instance={instance} />
        </Flex>
    );
};

const _isChecked = (value, id) => {
    if (!value) return false;
    return value.includes(id);
};

const __logError = (id, field) => {
    console.error(`Field of type "${field.type}" is missing required "options" array (id: ${id})`);
};

CheckboxGroup.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.array,
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

export default CheckboxGroup;
