import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Maybe from 'maybe-baby';
import Asterisk from '../../common/Asterisk';

export default function FormItemTitle ({
    field, decorators, instance
}) {
    if (__noTitle(decorators)) return <span />;
    return (
        <ControlLabel htmlFor={field.id}>
            { field.title }&nbsp;
            { __maybeRenderError(field, instance) }
        </ControlLabel>
    );
}

function __maybeRenderError (field, instance) {
    if (instance.fieldHasError(field.id)) {
        return <Asterisk/>;
    }
}

function __noTitle (decorators) {
    return Maybe.of(decorators)
        .prop('hideControlLabel')
        .isJust();
}

FormItemTitle.propTypes = {
    field     : React.PropTypes.object.isRequired,
    instance  : React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object
};
