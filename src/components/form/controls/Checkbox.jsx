import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Checkbox = ({ id, field, option, value, onUpdate }) => {
    const icon = `${value ? 'check-' : ''}square`;
    return (
        <div id={id} className="control">
            <div className="checkbox" onClick={() => onUpdate(!value, id)}>
                <FontAwesomeIcon icon={['far', icon]} />
                &nbsp;
                <span>{_getTitle(option, field)}</span>
            </div>
        </div>
    );
};

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
