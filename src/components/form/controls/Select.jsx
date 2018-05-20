import PropTypes from 'prop-types';
import React from 'react';
import { DATA_TYPE } from '../../../form/config/form-const';

export default function Select({ id, value, field, onUpdate }) {
    if (!field.options) {
        console.warn(`${field.type} is missing required "options" (id: ${id})`);
        return <span />;
    }
    return (
        <div className="select">
            <select value={value} id={id} name={id} onChange={onUpdate} multiple={__isTypeArray(field)}>
                {_maybeRenderPlaceholder(field, value)}
                {_renderOptions(field)}
            </select>
        </div>
    );
}

function _maybeRenderPlaceholder(field, value) {
    if (!value && !__isTypeArray(field)) {
        return (
            <option style={{ fontWeight: 300 }} value="">
                {field.placeholder || '-- select value --'}
            </option>
        );
    }
}

function _renderOptions(field) {
    return field.options.map((option, index) => (
        <option key={index} value={option.id} style={{ fontWeight: 300 }}>
            {option.title}
        </option>
    ));
}

function __isTypeArray(field) {
    return field.type === DATA_TYPE.ARRAY;
}

Select.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    field: PropTypes.object.isRequired,
    uiField: PropTypes.object,
    onUpdate: PropTypes.func.isRequired
};
