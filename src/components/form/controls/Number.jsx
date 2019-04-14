import React from 'react';
import PropTypes from 'prop-types';

const Number = ({ id, field, value, onUpdate, hasError }) => {
    return (
        <input
            className={`input ${hasError ? 'is-danger' : ''}`}
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
    onUpdate: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    value: PropTypes.number
};

export default Number;
