import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

const Textarea = ({
    tag,
    field,
    value,
    onUpdate
}) => (
    <div style={{ marginRight: 40 }} >
        <FormControl
            name={tag}
            id={tag}
            componentClass="textarea"
            value={value || ''}
            onChange={onUpdate}
            placeholder={field.placeholder}
        />
    </div>
);

Textarea.propTypes = {
    tag     : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.string
};

export default Textarea;
