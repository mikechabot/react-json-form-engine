import PropTypes from 'prop-types';
import React from 'react';

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
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.number
};

export default Number;
