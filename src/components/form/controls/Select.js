import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import { DATA_TYPE } from '../../../form/config/form-const';

export default function Select ({
    id,
    value,
    field,
    onUpdate
}) {
    if (!field.options) {
        console.warn(`${field.type} is missing required "options" (id: ${id})`);
        return <span />;
    }
    return (
        <FormControl
            value={value}
            id={id}
            name={id}
            onChange={onUpdate}
            multiple={__isTypeArray(field)}
            componentClass="select">
            { _maybeRenderPlaceholder(field, value) }
            { _renderOptions(field)}
        </FormControl>
    );
}

function _maybeRenderPlaceholder (field, value) {
    if (!value && !__isTypeArray(field)) {
        return (
            <option
                style={{fontWeight: 300}}
                value="">
                {field.placeholder || '-- select value --'}
            </option>
        );
    }
}

function _renderOptions (field) {
    return field.options.map((option, index) => (
        <option
            key={index}
            value={option.id}
            style={{fontWeight: 300}}>
            { option.title }
        </option>
    ));
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
