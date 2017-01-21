import React from 'react';
import BSCheckbox from 'react-bootstrap/lib/Checkbox';

const Checkbox = ({
    tag,
    field,
    value,
    onUpdate
}) => (
    <BSCheckbox id={tag} onChange={onUpdate} value={true} checked={value}>
        <span className='control-label'>{ field.title }</span>
    </BSCheckbox>
);

Checkbox.propTypes = {
    tag     : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    value   : React.PropTypes.bool
};

export default Checkbox;
