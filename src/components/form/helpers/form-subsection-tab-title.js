import React from 'react';
import Asterisk from '../../common/Asterisk';

export default function FormSubsectionTabTitle ({
    subsection,
    instance
}) {
    return (
        <span>
            { subsection.title }&nbsp;
            { instance.subsectionHasError(subsection) ? <Asterisk /> : <span />}
        </span>
    );
}
