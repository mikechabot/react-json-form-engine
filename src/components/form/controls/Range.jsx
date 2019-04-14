import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';

import { Flex } from '../../util';

const Range = ({ id, field, value, onUpdate }) => {
    return (
        <Flex column flexShrink={0}>
            <Flex hAlignCenter>{!isNil(value) ? value : 'No Value'}</Flex>
            <Flex flex={1}>
                <MinMaxLabel value={field.min} style={{ marginRight: '0.25rem' }} />
                <Flex flex={1}>
                    <input
                        style={{ width: '100%' }}
                        name={id}
                        id={id}
                        type="range"
                        value={!isNil(value) ? value : ''}
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
