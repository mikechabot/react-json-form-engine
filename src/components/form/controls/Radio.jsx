import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormChildren from '../FormField/FormChildren';

function isChecked(option, value, isEven) {
    if (isNil(value)) return false;
    if (option.id) return option.id === value;
    return isEven ? value : !value;
}

function getIcon(option, value, isEven) {
    return isChecked(option, value, isEven) ? 'dot-circle' : 'circle';
}

function renderOption(field, value, option, index, onUpdate) {
    const isEven = index % 2 === 0;
    return (
        <div
            key={index}
            className={`radio-option-container ${index === 0 ? '' : field.inline ? 'm-l-sm' : ''}`}
            onClick={() => onUpdate(option.id || isEven, field.id)}
        >
            <div className="radio-option-label">
                <FontAwesomeIcon icon={['far', getIcon(option, value, isEven)]} />
                &nbsp;
                <div>{option.title}</div>
            </div>
            <FormChildren field={option} />
        </div>
    );
}

const Radio = ({ id, value, field, onUpdate }) => {
    return (
        <div id={id} className={field.inline ? 'flex-box' : 'flex-column'}>
            {field.options.map((option, index) => renderOption(field, value, option, index, onUpdate))}
        </div>
    );
};

Radio.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onUpdate: PropTypes.func.isRequired,
    uiField: PropTypes.object
};

export default Radio;
