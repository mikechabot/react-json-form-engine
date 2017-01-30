import React from 'react';
import Asterisk from '../../common/Asterisk';

export default function FormSubsectionTitle ({
    subsection,
    instance
}) {
    return (
        <h4 style={{marginBottom: 5, marginLeft: 5}}>
            { subsection.title }&nbsp;
            { instance.subsectionHasError(subsection) ? <Asterisk /> : <span />}
        </h4>
    );
}
