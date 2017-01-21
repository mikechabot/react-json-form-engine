import React from 'react';
import Asterisk from '../../common/Asterisk';
import VALIDATION_CONST from '../../../form/validation/validation-const';

export default function FormSubsectionTabTitle ({
    title,
    status
}) {
    return (
        <span>
            { title }&nbsp;
            { showAsterisk(status) ? <Asterisk /> : <span />}
        </span>
    );
}

function showAsterisk (status) {
    return status === VALIDATION_CONST.STATUS.ERROR;
}
