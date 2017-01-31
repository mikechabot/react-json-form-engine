import React from 'react';

const Range = ({
    id,
    field,
    value,
    onUpdate
}) => (
    <div style={{ marginRight: 40 }}>
        <div style={style.valueContainer}>
            <span style={style.value}>{value || 'N/A'}</span>
        </div>
        <div style={style.container}>
            <div style={style.minMax}>{field.min}</div>
            <div style={style.range}>
                <input
                    name={id}
                    id={id}
                    type="range"
                    value={value || ''}
                    max={field.max}
                    min={field.min}
                    onChange={onUpdate}
                />
            </div>
            <div style={style.minMax}>{field.max}</div>
        </div>
    </div>
);

const style = {
    valueContainer: {
        textAlign   : 'center',
        marginBottom: 5
    },
    value: {
        fontWeight: 500,
        fontSize  : '90%',
        color     : '#757575'
    },
    container: {
        display       : 'flex',
        justifyContent: 'space-around',
        alignItems    : 'center'
    },
    range: {
        width: '100%'
    },
    minMax: {
        margin    : '0 10px',
        fontSize  : 12,
        color     : '#757575',
        fontWeight: 500
    }
};

Range.propTypes = {
    id             : React.PropTypes.string.isRequired,
    field          : React.PropTypes.object.isRequired,
    onUpdate       : React.PropTypes.func.isRequired,
    value          : React.PropTypes.number
};

export default Range;
