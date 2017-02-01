import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

const Textarea = ({
    id,
    field,
    value,
    onUpdate
}) => (
    <FormControl
        name={id}
        id={id}
        componentClass="textarea"
        value={value || ''}
        onChange={onUpdate}
        placeholder={field.placeholder}
    />
);

Textarea.propTypes = {
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.string
};

export default Textarea;
