import React from 'react';
import PropTypes from 'prop-types';

import { DATA_TYPE } from '../../../form/config/form-const';

const Select = ({ id, value, field, onUpdate }) => {
    if (!field.options) {
        console.warn(`${field.type} is missing required "options" (id: ${id})`);
        return <span />;
    }
    const isMultiple = __isFieldTypeArray(field);
    return (
        <div className={`select ${isMultiple ? 'is-multiple' : ''}`}>
            <select value={value} id={id} name={id} onChange={onUpdate} multiple={isMultiple}>
                {_maybeRenderPlaceholder(field, value)}
                {_renderOptions(field)}
            </select>
        </div>
    );
};

const _maybeRenderPlaceholder = (field, value) => {
    if (!value && !__isFieldTypeArray(field)) {
        return <option value="">{field.placeholder || '-- select value --'}</option>;
    }
};

const _renderOptions = field => {
    return field.options.map((option, index) => (
        <option key={index} value={option.id}>
            {option.title}
        </option>
    ));
};

const __isFieldTypeArray = field => {
    return field.type === DATA_TYPE.ARRAY;
};

Select.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired,
    uiField: PropTypes.object
};

export default Select;
