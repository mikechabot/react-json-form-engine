import React from 'react';

const Asterisk = ({ size, message }) => (
    <span className="text-danger">
        <i
            className={`fa fa-asterisk ${size || 'fa-1x'} `}
            title={message || 'Invalid value'}
            aria-hidden="true"
        />
    </span>
);

export default Asterisk;
