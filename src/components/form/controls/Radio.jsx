import PropTypes from 'prop-types';
import React from 'react';
import { Flex, Icon } from '../../common';

import { __hasValue } from '../../../common/common';
import FormChildren from '../FormChildren';

const Radio = ({ id, value, field, instance, onUpdate }) => {
    if (!field.options) {
        console.warn(`${field.type} is missing required "options" (id: ${id})`);
        return <span />;
    }
    return (
        <Flex column={!field.inline} id={id}>
            {_renderOptions(field, value, instance, onUpdate)}
        </Flex>
    );
};

const _renderOptions = (field, value, instance, onUpdate) => {
    return field.options.map(_renderOption.bind(null, field, value, instance, onUpdate));
};

const _renderOption = (field, value, instance, onUpdate, option, index) => {
    const isEven = index % 2 === 0;
    return (
        <Flex key={index} margin={5} column vAlignCenter>
            <Flex
                cursor="pointer"
                vAlignCenter={true}
                onClick={_handleOnClick.bind(null, field, option, onUpdate, isEven)}
            >
                {_renderOptionIcon(option, value, isEven)}&nbsp;
                <div>{option.title}</div>
            </Flex>
            <FormChildren field={option} instance={instance} onUpdate={onUpdate} />
        </Flex>
    );
};

const _renderOptionIcon = (option, value, isEven) => {
    return _isChecked(option, value, isEven) ? (
        <Icon prefix="far" icon="dot-circle" />
    ) : (
        <Icon prefix="far" icon="circle" />
    );
};

const _handleOnClick = (field, option, onUpdate, isEven) => {
    onUpdate(option.id || isEven, field.id);
};

const _isChecked = (option, value, isEven) => {
    if (!__hasValue(value)) return false;
    if (option.id) return option.id === value;
    return isEven ? value : !value;
};

Radio.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    instance: PropTypes.object,
    field: PropTypes.object.isRequired,
    uiField: PropTypes.object,
    onUpdate: PropTypes.func.isRequired
};

export default Radio;
