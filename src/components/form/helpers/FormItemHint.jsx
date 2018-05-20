import PropTypes from 'prop-types';
import React from 'react';

export default function FormItemHint({ hint }) {
    return <p className="help">{hint}</p>;
}

FormItemHint.propTypes = {
    hint: PropTypes.string.isRequired
};
