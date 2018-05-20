import PropTypes from 'prop-types';
import React from 'react';

const Text = ({ id, field, value, onUpdate }) => (
    <input
        name={id}
        id={id}
        className="input"
        type="text"
        value={value || ''}
        onChange={onUpdate}
        placeholder={field.placeholder}
    />
);

Text.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default Text;
