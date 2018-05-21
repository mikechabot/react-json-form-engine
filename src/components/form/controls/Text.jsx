import React from 'react';
import PropTypes from 'prop-types';
import Maybe from 'maybe-baby';

const DEFAULT_TYPE = 'text';

const Text = ({ id, field, value, onUpdate, uiDecorators }) => {
    return (
        <input
            name={id}
            id={id}
            className="input"
            type={__getInputType(uiDecorators)}
            value={value || ''}
            onChange={onUpdate}
            placeholder={field.placeholder}
        />
    );
};

const __getInputType = uiDecorators => {
    return Maybe.of(uiDecorators)
        .prop('component')
        .prop('type')
        .orElse(DEFAULT_TYPE)
        .join();
};

Text.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.string,
    uiDecorators: PropTypes.object,
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

export default Text;
