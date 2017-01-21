import React from 'react';
import { Flex } from '../../common';

const Checkbox = ({
    tag,
    field,
    value,
    onUpdate
}) => (
    <Flex vAlignCenter={true}>
        <label className="control-label" htmlFor={tag}>
        <input
            id={tag}
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
    tag     : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.bool
};

export default Checkbox;
