import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormChildren from '../FormChildren';
import { Flex } from '../../util';

const styles = {
    container: {
        display: 'flex'
    },
    containerInline: {
        display: 'flex',
        flexDirection: 'column'
    }
};

const Radio = ({ id, value, field, onUpdate }) => {
    return (
        <div styles={field.inline ? styles.containerInline : styles.container} id={id}>
            {field.options.map(_renderOption.bind(null, field, value, onUpdate))}
        </div>
    );
};

const _renderOption = (field, value, onUpdate, option, index) => {
    const isEven = index % 2 === 0;
    return (
        <Flex
            key={index}
            style={index === 0 ? {} : field.inline ? { marginLeft: '0.5rem' } : { marginTop: '0.25rem' }}
            column
            vAlignCenter
        >
            <Flex
                cursor="pointer"
                vAlignCenter={true}
                onClick={() => onUpdate(option.id || isEven, field.id)}
            >
                {_renderOptionIcon(option, value, isEven)}&nbsp;
                <div>{option.title}</div>
            </Flex>
            <FormChildren field={option} />
        </Flex>
    );
};

const _renderOptionIcon = (option, value, isEven) => {
    return isChecked(option, value, isEven) ? (
        <FontAwesomeIcon icon={['far', 'dot-circle']} />
    ) : (
        <FontAwesomeIcon icon={['far', 'circle']} />
    );
};

const isChecked = (option, value, isEven) => {
    if (isNil(value)) return false;
    if (option.id) return option.id === value;
    return isEven ? value : !value;
};

Radio.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onUpdate: PropTypes.func.isRequired,
    uiField: PropTypes.object
};

export default Radio;
