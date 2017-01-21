import React from 'react';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default function FormItemHint ({
    hint
}) {
    return hint
        ? <HelpBlock>{hint}</HelpBlock>
        : <span />;
}
