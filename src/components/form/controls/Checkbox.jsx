import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../common';

const Checkbox = ({ id, field, option, value, onUpdate }) => (
    <div id={id} className="control">
        <div className="checkbox" onClick={() => onUpdate(!value, id)}>
            <Icon prefix="far" icon={`${value ? 'check-' : ''}square`} />
            <span className="m-left--x-small">{_getTitle(option, field)}</span>
        </div>
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
    value: PropTypes.bool,
    onUpdate: PropTypes.func.isRequired
};

export default Checkbox;
