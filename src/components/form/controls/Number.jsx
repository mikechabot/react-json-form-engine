import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

export default function Number ({
    id,
    field,
    value,
    onUpdate
}) {
    return (
        <div style={{ marginRight: 40 }}>
            <FormControl
                disabled={field.disabled}
                name={id}
                id={id}
                type="number"
                value={value || ''}
                max={field.max}
                min={field.min}
                onChange={onUpdate}
                placeholder={field.placeholder}
            />
        </div>
    );
}

Number.propTypes = {
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.number
};

