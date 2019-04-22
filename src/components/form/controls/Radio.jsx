import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormChildren from '../FormField/FormChildren';

const styles = {
    containerInline: {
        display: 'flex'
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    optionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    optionInline: {
        marginLeft: '0.5rem'
    },
    optionLabel: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    }
};

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
    const style = {
        ...styles.optionContainer,
        ...(index === 0 ? {} : field.inline ? styles.optionInline : {})
    };
    return (
        <div key={index} style={style} onClick={() => onUpdate(option.id || isEven, field.id)}>
            <div style={styles.optionLabel}>
                <FontAwesomeIcon icon={['far', getIcon(option, value, isEven)]} />
                &nbsp;
                <div>{option.title}</div>
            </div>
            <FormChildren field={option} />
        </div>
    );
}

const Radio = ({ id, value, field, onUpdate }) => {
    const containerStyle = field.inline ? styles.containerInline : styles.container;
    return (
        <div id={id} style={containerStyle}>
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
