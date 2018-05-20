import React from 'react';
import PropTypes from 'prop-types';

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
    value: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

export default Text;
