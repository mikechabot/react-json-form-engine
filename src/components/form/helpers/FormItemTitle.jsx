import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Maybe from 'maybe-baby';
import Asterisk from '../../common/Asterisk';
import { __blank } from '../../../common/common';

export default function FormItemTitle ({
    id, field, decorators, instance
}) {
    if (__blank(field.title) || Maybe.of(decorators).prop('hideControlLabel').isJust()) {
        return <span />;
    }

    return (
        <ControlLabel>
            { field.title }&nbsp;
            {/* { instance.hasError(id) ? <Asterisk /> : ''} */}
        </ControlLabel>
    );
}

FormItemTitle.propTypes = {
    id        : React.PropTypes.string.isRequired,
    field     : React.PropTypes.object.isRequired,
    instance  : React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object
};
