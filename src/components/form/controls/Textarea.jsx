import PropTypes from 'prop-types';
import React from 'react';

const Textarea = ({ id, field, value, onUpdate }) => (
    <textarea
        name={id}
        id={id}
        className="textarea"
        type="textarea"
        value={value || ''}
        onChange={onUpdate}
        placeholder={field.placeholder}
    />
);

Textarea.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default Textarea;
