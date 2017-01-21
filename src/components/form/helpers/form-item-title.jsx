import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Asterisk from '../../common/Asterisk';
import { __blank } from '../../../common/common';

export default function FormItemTitle ({
    tag, field, component, instance
}) {
    let hideLabel = __blank(field.title) || (
        component.decorators && component.decorators.hideControlLabel
    );

    if (hideLabel) {
        return <span />;
    }

    return (
        <ControlLabel>
            { field.title }&nbsp;
            { instance.hasError(tag) ? <Asterisk /> : ''}
        </ControlLabel>
    );
}
