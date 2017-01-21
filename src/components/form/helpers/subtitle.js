import React from 'react';

export default function Subtitle ({
    text
}) {
    if (!text) {
        return <span />;
    }
    return (
        <p style={{marginTop: 10}}>
            <small className='text-info'>
                { text }
            </small>
        </p>
    );
}
