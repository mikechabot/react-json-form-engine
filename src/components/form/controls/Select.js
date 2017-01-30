import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import { DATA_TYPE } from '../../../form/config/form-const';

export default function Select ({
    id,
    value,
    field,
    onUpdate
}) {
    let defaultValue = value;
    if (!defaultValue) {
        defaultValue = __isTypeArray(field)
            ? []
            : (field.placeholder || '-- select option --');
    }

    if (!field.options) {
        console.warn(`${field.type} is missing required "options" (tag: ${id})`);
        return <span />;
    }

    return (
        <div style={{ marginRight: 40 }}>
            <FormControl
                value={value}
                id={id}
                name={id}
                onChange={onUpdate}
                multiple={__isTypeArray(field)}
                componentClass="select">
                {
                    !value && !__isTypeArray(field)
                        ? <option style={{fontWeight: 300}} value="">{field.placeholder || '-- select value --'}</option>
                        : undefined
                }
                {
                    field.options.map((option, index) => (
                        <option style={{fontWeight: 300}} key={index} value={option.id}>
                            { option.title }
                        </option>
                    ))
                }
            </FormControl>
        </div>
    );
}

function __isTypeArray (field) {
    return field.type === DATA_TYPE.ARRAY;
}

Select.propTypes = {
    id   : React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.string
    ]),
    field   : React.PropTypes.object.isRequired,
    uiField : React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
};
