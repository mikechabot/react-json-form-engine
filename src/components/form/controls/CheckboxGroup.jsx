import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';
import FormChildren from '../FormField/FormChildren';

const flexColumn = {
    display: 'flex',
    flexDirection: 'column'
};

const checkbox = {
    ...flexColumn,
    ...{ marginTop: '0.25rem' }
};

function getStyle(index) {
    if (index === 0) return {};
    return checkbox;
}

const CheckboxGroup = ({ id, field, value, onUpdate }) => {
    return (
        <div style={flexColumn}>
            {field.options.map((option, index) => (
                <div key={index} style={getStyle(index)}>
                    <Checkbox
                        id={option.id}
                        option={option}
                        onUpdate={() => onUpdate(option.id, id)}
                        value={!value ? false : value.includes(option.id)}
                    />
                    <FormChildren field={option} />
                </div>
            ))}
        </div>
    );
};

CheckboxGroup.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.array,
    onUpdate: PropTypes.func.isRequired
};

export default CheckboxGroup;
