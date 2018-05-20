import React from 'react';
import PropTypes from 'prop-types';

const Number = ({ id, field, value, onUpdate }) => {
    return (
        <input
            className="input"
            name={id}
            id={id}
            type="number"
            value={value || ''}
            max={field.max}
            min={field.min}
            onChange={onUpdate}
            placeholder={field.placeholder}
        />
    );
};

Number.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

export default Number;
