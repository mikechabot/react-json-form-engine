import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
    },
    noValue: {
        display: 'flex',
        justifyContent: 'center'
    },
    sliderContainer: {
        display: 'flex',
        flex: 1
    },
    slider: {
        width: '100%'
    },
    minLabel: {
        marginRight: '0.25rem'
    },
    maxLabel: {
        marginLeft: '0.25rem'
    }
};

const Range = ({ id, field, value, onUpdate }) => {
    return (
        <div styles={styles.container}>
            <div styles={styles.noValue}>{!isNil(value) ? value : 'No Value'}</div>
            <div style={styles.sliderContainer}>
                <MinMaxLabel value={field.min} style={styles.minLabel} />
                <div style={styles.sliderContainer}>
                    <input
                        style={styles.slider}
                        name={id}
                        id={id}
                        type="range"
                        value={!isNil(value) ? value : ''}
                        max={field.max}
                        min={field.min}
                        onChange={onUpdate}
                    />
                </div>
                <MinMaxLabel value={field.max} style={styles.maxLabel} />
            </div>
        </div>
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
    onUpdate: PropTypes.func.isRequired
};

export default Range;
