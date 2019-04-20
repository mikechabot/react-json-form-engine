import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormChildren from '../FormChildren';
import { Flex } from '../../util';

const Radio = ({ id, value, field, onUpdate }) => {
    return (
        <Flex column={!field.inline} id={id}>
            {_renderOptions(field, value, onUpdate)}
        </Flex>
    );
};

const _renderOptions = (field, value, onUpdate) => {
    return field.options.map(_renderOption.bind(null, field, value, onUpdate));
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
                onClick={_handleOnClick.bind(null, field, option, onUpdate, isEven)}
            >
                {_renderOptionIcon(option, value, isEven)}&nbsp;
                <div>{option.title}</div>
            </Flex>
            <FormChildren field={option} />
        </Flex>
    );
};

const _renderOptionIcon = (option, value, isEven) => {
    return _isChecked(option, value, isEven) ? (
        <FontAwesomeIcon icon={['far', 'dot-circle']} />
    ) : (
        <FontAwesomeIcon icon={['far', 'circle']} />
    );
};

const _handleOnClick = (field, option, onUpdate, isEven) => {
    onUpdate(option.id || isEven, field.id);
};

const _isChecked = (option, value, isEven) => {
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
