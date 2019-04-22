import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ id, field }) => {
    if (!field.content) return null;
    const { content, title } = field;
    return (
        <section className="container" id={id}>
            {title ? (
                <div
                    className="is-size-6 has-text-weight-semibold"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
            ) : null}
            <div className="is-size-7" dangerouslySetInnerHTML={{ __html: content }} />
        </section>
    );
};

Info.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    uiDecorators: PropTypes.object
};

export default Info;
