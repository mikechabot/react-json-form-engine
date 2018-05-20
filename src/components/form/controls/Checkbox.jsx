import PropTypes from 'prop-types';
import React from 'react';
import { Flex } from '../../common';

const Checkbox = ({
    id,
    field,
    option,
    value,
    onUpdate,
    style
}) => (
    <Flex
        style={style}
        className="pointer"
        vAlignCenter={true}
        onClick={() => onUpdate(!value, id)}>
        <div style={{width: 20}}>
            <i className={`fa fa-${value ? 'check-' : ''}square-o`} />
        </div>
        <div style={{fontSize: 14, fontWeight: 300}}>{ _getTitle(option, field) }</div>
    </Flex>
);

function _getTitle (option, field) {
    if (option) return option.title;
    return field.title;
}

Checkbox.propTypes = {
    id      : PropTypes.string.isRequired,
    field   : PropTypes.object,
    option  : PropTypes.object,
    onUpdate: PropTypes.func.isRequired,
    value   : PropTypes.bool
};

export default Checkbox;
