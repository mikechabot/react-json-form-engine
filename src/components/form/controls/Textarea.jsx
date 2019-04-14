import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ id, field, value, onUpdate, hasError }) => (
    <textarea
        name={id}
        id={id}
        className={`textarea ${hasError ? 'is-danger' : ''}`}
        type="textarea"
        value={value || ''}
        onChange={onUpdate}
        placeholder={field.placeholder}
    />
);

Textarea.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    hasError: PropTypes.bool.isRequired,
    value: PropTypes.string,
    onUpdate: PropTypes.func.isRequired
};

export default Textarea;
