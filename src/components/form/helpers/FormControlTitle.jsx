import React from 'react';
import PropTypes from 'prop-types';
import Maybe from 'maybe-baby';

const FormControlTitle = ({ field, decorators }) => {
    if (hideTitle(decorators)) return null;
    return (
        <div className="label is-small" htmlFor={field.id}>
            {field.title}&nbsp;
        </div>
    );
};

const hideTitle = decorators =>
    Maybe.of(decorators)
        .prop('hideControlLabel')
        .isJust();

export default FormControlTitle;

FormControlTitle.propTypes = {
    field: PropTypes.object.isRequired,
    decorators: PropTypes.object
};
