import React from 'react';
import PropTypes from 'prop-types';

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
    value: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

export default Textarea;
