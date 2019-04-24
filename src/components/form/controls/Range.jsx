import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';

const Range = ({ id, field, value, onUpdate }) => {
    return (
        <div className="range-container">
            <div className="is-size-7 has-text-weight-bold range-no-value">
                {!isNil(value) ? value : 'No Value'}
            </div>
            <div className="range-slider-container">
                <MinMaxLabel value={field.min} className="m-r-xs" />
                <div className="range-slider-container">
                    <input
                        className="range-slider"
                        name={id}
                        id={id}
                        type="range"
                        value={!isNil(value) ? value : ''}
                        max={field.max}
                        min={field.min}
                        onChange={onUpdate}
                    />
                </div>
                <MinMaxLabel value={field.max} className="m-l-xs" />
            </div>
        </div>
    );
};

const MinMaxLabel = ({ value, className }) => (
    <div className={`is-size-7 ${className}`}>
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
