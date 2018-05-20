import React from 'react';
import PropTypes from 'prop-types';

export default function FormItemHint({ hint, className }) {
    let derivedClassName = className || 'has-text-grey-light';
    return <p className={`help ${derivedClassName}`}>{hint}</p>;
}

FormItemHint.propTypes = {
    hint: PropTypes.string.isRequired
};
