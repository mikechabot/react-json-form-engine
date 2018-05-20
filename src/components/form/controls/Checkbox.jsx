import PropTypes from 'prop-types';
import React from 'react';
import { Flex, Icon } from '../../common';

const Checkbox = ({ id, field, option, value, onUpdate, style }) => (
    <div className="checkbox" onClick={() => onUpdate(!value, id)}>
        <Icon prefix="far" icon={`${value ? 'check-' : ''}square`} />
        <span className="m-left--x-small">{_getTitle(option, field)}</span>
    </div>
);

function _getTitle(option, field) {
    if (option) return option.title;
    return field.title;
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object,
    option: PropTypes.object,
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.bool
};

export default Checkbox;
