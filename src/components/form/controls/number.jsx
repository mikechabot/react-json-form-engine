import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

const Number = ({
    tag,
    field,
    value,
    onUpdate
}) => (
    <div style={{ marginRight: 40 }}>
        <FormControl
            disabled={field.disabled}
            name={tag}
            id={tag}
            type="number"
            value={value || ''}
            max={field.max}
            min={field.min}
            onChange={onUpdate}
            placeholder={field.placeholder}
        />
    </div>
);

Number.propTypes = {
    tag     : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.number
};

export default Number;
