import React from 'react';

export default function Subtitle ({
    text
}) {
    if (!text) {
        return <span />;
    }
    return (
        <small className="text-info">
            <i className="fa fa-info-circle" />
            &nbsp;{ text }
        </small>
    );
}
