import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormControlHint = ({ text, icon, className }) => {
    let derivedClassName = className || 'has-text-grey-light';

    return (
        <div className={`help ${derivedClassName} form-control-hint`}>
            <FontAwesomeIcon icon={icon || 'question-circle'} />
            &nbsp;{text}
        </div>
    );
};

FormControlHint.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    className: PropTypes.string
};

export default FormControlHint;
