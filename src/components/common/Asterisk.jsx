import React from 'react';

const Asterisk = ({size, message}) => (
    <span className='text-danger'>
            <i className={`fa fa-asterisk ${size ? size : 'fa-1x'} `} title={message || 'Invalid value'} aria-hidden='true'></i>
    </span>
);

export default Asterisk;
