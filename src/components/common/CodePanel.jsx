import PropTypes from 'prop-types';
import React from 'react';
import CodeBlock from './CodeBlock';

export default function CodePanel({ title, content }) {
    return (
        <div
            style={{
                height: 400,
                width: '100%',
                minWidth: 425,
                margin: 2.5
            }}
            header={title}
        >
            <CodeBlock content={content} />
        </div>
    );
}

CodePanel.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object,
    style: PropTypes.object
};
