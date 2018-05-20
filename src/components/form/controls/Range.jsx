import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from '../../common';
import { __hasValue } from '../../../common';

const Range = ({ id, field, value, onUpdate }) => (
    <Flex column flexShrink={0}>
        <Flex hAlignCenter>{__hasValue(value) ? value : 'No Value'}</Flex>
        <Flex flex={1}>
            <MinMaxLabel value={field.min} className="m-right--xx-small" />
            <Flex flex={1}>
                <input
                    className="full-width"
                    name={id}
                    id={id}
                    type="range"
                    value={__hasValue(value) ? value : ''}
                    max={field.max}
                    min={field.min}
                    onChange={onUpdate}
                />
            </Flex>
            <MinMaxLabel value={field.max} className="m-left--xx-small" />
        </Flex>
    </Flex>
);

const MinMaxLabel = ({ value, className }) => <div className={`is-size-7 ${className}`}>{value}</div>;

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
