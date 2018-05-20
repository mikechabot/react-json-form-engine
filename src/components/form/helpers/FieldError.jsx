import PropTypes from 'prop-types';
import React from 'react';

export default function ErrorBlock ({
    id
}) {
    return (
        <span className="text-danger">
            <i className="fa fa-exclamation-circle" aria-hidden="true" />
            &nbsp;Error rendering field id: "{ id }"
        </span>
    );
}

ErrorBlock.propTypes = {
    id: PropTypes.string.isRequired
};
