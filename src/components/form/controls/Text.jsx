import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

const Text = ({
    id,
    field,
    value,
    onUpdate
}) => (
    <div style={{ marginRight: 40 }}>
        <FormControl
            name={id}
            id={id}
            disabled={field.disabled}
            type="text"
            value={value || ''}
            onChange={onUpdate}
            placeholder={field.placeholder}
        />
    </div>
);

Text.propTypes = {
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.string
};

export default Text;
