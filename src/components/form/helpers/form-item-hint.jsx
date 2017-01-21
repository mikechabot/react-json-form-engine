import React from 'react';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default function FormItemHint ({
    hint
}) {
    return <HelpBlock>{hint}</HelpBlock>
}

FormItemHint.propTypes = {
    hint: React.PropTypes.string.isRequired
};
