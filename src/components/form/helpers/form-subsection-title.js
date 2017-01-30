import React from 'react';
import Asterisk from '../../common/Asterisk';
import VALIDATION_CONST from '../../../form/validation/validation-const';

export default function FormSubsectionTitle ({
    title,
    status
}) {
    if (!title) return <span />;
    return (
        <h4 style={{marginBottom: 5, marginLeft: 5}}>
            { title }&nbsp;
            { showAsterisk(status) ? <Asterisk /> : <span />}
        </h4>
    );
}

function showAsterisk (status) {
    return status === VALIDATION_CONST.STATUS.ERROR;
}
