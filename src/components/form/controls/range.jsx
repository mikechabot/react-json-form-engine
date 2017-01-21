import React from 'react';

const Range = ({
    tag,
    field,
    value,
    onUpdate,
    validationState
}) => (
    <div style={{ marginRight: 40 }}>
        <div style={style.valueContainer}>
            <span style={{...style.value, ...getValidationStyle(validationState)}}>{value || 'N/A'}</span>
        </div>
        <div style={style.container}>
            <div style={{...style.minMax, ...getValidationStyle(validationState)}}>{field.min}</div>
            <div style={style.range}>
                <input
                    name={tag}
                    id={tag}
                    type='range'
                    value={value}
                    max={field.max}
                    min={field.min}
                    onChange={onUpdate}
                />
            </div>
            <div style={{...style.minMax, ...getValidationStyle(validationState)}}>{field.max}</div>
        </div>
    </div>
);

function getValidationStyle (validationState) {
    if (validationState === 'success') {
        return style.success;
    } else if (validationState === 'error') {
        return style.error;
    }
}

const style = {
    success: {
        color: '#18bc9c'
    },
    error: {
        color: '#e74c3c'
    },
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
    tag            : React.PropTypes.string.isRequired,
    field          : React.PropTypes.object.isRequired,
    onUpdate       : React.PropTypes.func.isRequired,
    value          : React.PropTypes.number,
    validationState: React.PropTypes.object
};

export default Range;
