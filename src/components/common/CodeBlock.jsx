import React from 'react';
import PropTypes from 'prop-types';

const CodeBlock = ({ content }) => {
    const lines = __parseContent(content);
    return lines.length === 0 ? (
        <span>Missing or malformed content</span>
    ) : (
        <div className="full-height full-width">
            <pre>{lines.map(_renderLine)}</pre>
        </div>
    );
};

function _renderLine(line, index) {
    return (
        <div className="line" key={index}>
            {line}
        </div>
    );
}

function __parseContent(content) {
    if (!content) return [];
    return JSON.stringify(content, (a, b) => (Number.isNaN(b) ? 'NaN' : b), 2).split('\n');
}

CodeBlock.propTypes = {
    content: PropTypes.object.isRequired
};

export default CodeBlock;
