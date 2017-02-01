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
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object,
    option  : React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.bool
};

export default Checkbox;
