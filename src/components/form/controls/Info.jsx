import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ id, field }) => {
    if (!field.content && !field.title) return null;
    const { content, title } = field;
    return (
        <div id={id}>
            {title ? (
                <div
                    className="is-size-6 has-text-weight-semibold"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
            ) : null}
            {content ? <div className="is-size-7" dangerouslySetInnerHTML={{ __html: content }} /> : null}
        </div>
    );
};

Info.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    uiDecorators: PropTypes.object
};

export default Info;
