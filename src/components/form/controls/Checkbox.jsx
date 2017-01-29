import React from 'react';
import { Flex } from '../../common';

const Checkbox = ({
    id,
    field,
    value,
    onUpdate
}) => (
    <Flex vAlignCenter={true}>
        <label className="control-label" htmlFor={id}>
        <input
            id={id}
            onChange={onUpdate}
            className="checkbox"
            type="checkbox"
            value={true}
            style={{display: 'inline'}}
            checked={value || ''} />
            &nbsp;&nbsp;
            { field.title }
        </label>
    </Flex>
);

Checkbox.propTypes = {
    id      : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.bool
};

export default Checkbox;
