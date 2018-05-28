import React from 'react';
import PropTypes from 'prop-types';

import ValidationFieldError from '../validation/ValidationFieldError';
import { Flex } from '../../common';

import { __hasValue } from '../../../common';

const Range = ({ id, field, value, onUpdate }) => {
    if (!__hasValue(field.min) || !__hasValue(field.max)) {
        console.error(
            `Field of type "${field.type}" is missing required "min" and/or "max" (id: ${id})`
        );
        return <ValidationFieldError id={field.id} />;
    }

    return (
        <Flex column flexShrink={0}>
            <Flex hAlignCenter>{__hasValue(value) ? value : 'No Value'}</Flex>
            <Flex flex={1}>
                <MinMaxLabel value={field.min} style={{ marginRight: '0.25rem' }} />
                <Flex flex={1}>
                    <input
                        style={{ width: '100%' }}
                        name={id}
                        id={id}
                        type="range"
                        value={__hasValue(value) ? value : ''}
                        max={field.max}
                        min={field.min}
                        onChange={onUpdate}
                    />
                </Flex>
                <MinMaxLabel value={field.max} style={{ marginLeft: '0.25rem' }} />
            </Flex>
        </Flex>
    );
};

const MinMaxLabel = ({ value, style }) => (
    <div style={style} className="is-size-7">
        {value}
    </div>
);

MinMaxLabel.propTypes = {
    value: PropTypes.number.isRequired
};

Range.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired
};

export default Range;
