import React from 'react';
import PropTypes from 'prop-types';
import Maybe from 'maybe-baby';

const DEFAULT_TYPE = 'text';

const Text = ({ id, field, value, onUpdate, uiDecorators, hasError }) => {
    console.log(typeof value, value)
    return (
        <input
            name={id}
            id={id}
            className={`input ${hasError ? 'is-danger' : ''}`}
            type={__getInputType(uiDecorators)}
            value={value || ''}
            onChange={onUpdate}
            placeholder={field.placeholder}
        />
    );
};

const __getInputType = uiDecorators => {
    return Maybe.of(() => uiDecorators.component.type)
        .orElse(DEFAULT_TYPE)
        .join();
};

Text.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    hasError: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.string,
    uiDecorators: PropTypes.object
};

export default Text;
