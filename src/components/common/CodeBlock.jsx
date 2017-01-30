import React from 'react';

export default function CodeBlock ({
    content
}) {
    const lines = __parseContent(content);
    return lines.length === 0
        ? <span>Missing or malformed content</span>
        : <pre style={{height: 335, overflow: 'auto'}}>{lines.map(_renderLine) }</pre>;
}

function _renderLine (line, index) {
    return <div key={index} className="line">{ line }</div>;
}

function __parseContent (content) {
    if (!content) return [];
    return JSON
        .stringify(content, (a, b) => Number.isNaN(b) ? 'NaN' : b, 2)
        .split('\n');
}

CodeBlock.propTypes = {
    content: React.PropTypes.object.isRequired
};
