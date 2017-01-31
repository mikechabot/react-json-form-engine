import React from 'react';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default function FormItemHint ({
    hint
}) {
    return <HelpBlock style={{color: '#9E9E9E'}}>{hint}</HelpBlock>;
}

FormItemHint.propTypes = {
    hint: React.PropTypes.string.isRequired
};
