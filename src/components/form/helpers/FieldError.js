import React from 'react';

export default function ErrorBlock ({
    id
}) {
    return (
        <span className="text-danger">
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            &nbsp;Error rendering field id: "{ id }"
        </span>
    );
}

ErrorBlock.propTypes = {
    id: React.PropTypes.string.isRequired
};
