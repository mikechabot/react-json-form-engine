import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

const Text = ({
    tag,
    field
}) => (
    <div style={{ marginRight: 40 }}>

    </div>
);

Text.propTypes = {
    tag     : React.PropTypes.string.isRequired,
    field   : React.PropTypes.object.isRequired
};

export default Text;
