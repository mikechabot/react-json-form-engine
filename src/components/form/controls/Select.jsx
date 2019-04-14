import React from 'react';
import PropTypes from 'prop-types';

import { DATA_TYPE } from '../../../form-engine/config/form-const';

const Select = ({ id, value, field, onUpdate, hasError }) => {
    if (!field.options) {
        console.warn(`${field.type} is missing required "options" (id: ${id})`);
        return <span />;
    }
    const isMultiple = __isFieldTypeArray(field);
    return (
        <div className={`select ${isMultiple ? 'is-multiple' : ''} ${hasError ? 'is-danger' : ''}`}>
            <select
                value={value}
                id={id}
                name={id}
                onChange={({ target }) => {
                    console.log('theeve', target.options);
                    onUpdate(event);
                }}
                multiple={isMultiple}
            >
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
    hasError: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    uiField: PropTypes.object
};

export default Select;
