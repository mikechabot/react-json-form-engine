import React from 'react';

const ErrorBlock = ({
    tag,
    id
}) => (
    <small className='text-danger'>
        Error rendering "{ tag }" &nbsp;
        <span className='text-muted'>
            (Id: { id })
        </span>
    </small>
);

ErrorBlock.propTypes = {
    tag: React.PropTypes.string.isRequired,
    id : React.PropTypes.string.isRequired
};

export default ErrorBlock;
