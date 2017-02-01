import React from 'react';
import { Flex } from '../../common';

const Range = ({
    id,
    field,
    value,
    onUpdate
}) => (
    <Flex column={true}>
        <Flex
            hAlignCenter={true}
            color="#757575"
            style={{
                fontSize    : '90%',
                fontWeight  : 500,
                marginBottom: 5
            }}>
            { value || 'N/A' }
        </Flex>
        <Flex
            style={{justifyContent: 'space-around'}}>
            <div style={style.minMax}>{field.min}</div>
            <Flex flex={1}>
                <input
                    name={id}
                    id={id}
                    type="range"
                    value={value || ''}
                    max={field.max}
                    min={field.min}
                    onChange={onUpdate}
                />
            </Flex>
            <div style={style.minMax}>{field.max}</div>
        </Flex>
    </Flex>
);

const style = {

    minMax: {
        margin    : '0 10px',
        fontSize  : 12,
        color     : '#757575',
        fontWeight: 500
    }
};

Range.propTypes = {
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.number
};

export default Range;
