import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ id, field }) => {
    if (!field.content && !field.title) return null;
    const { content, title } = field;
    return (
        <section className="container" id={id}>
            {title ? (
                <div>
                    <div
                        className="is-size-6 has-text-weight-semibold"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </div>
            ) : null}
            {content ? (
                <div>
                    <div className="is-size-7" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            ) : null}
        </section>
    );
};

Info.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    uiDecorators: PropTypes.object
};

export default Info;
