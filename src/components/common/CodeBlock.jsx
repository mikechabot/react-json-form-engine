import React from 'react';

export default function CodeBlock ({
    content
}) {
    return (
        <div style={{ maxHeight: 375, overflowY: 'auto' }}>
            <pre>{ _generateLines(content).map(_renderLine) }</pre>
        </div>
    );
}

function _generateLines (content) {
    if (!content) return [];
    return JSON.stringify(content, null, 2).split('\n');
}

function _renderLine (line, index) {
    return (
        <div key={index} className="line">
            { line }
        </div>
    );
}

CodeBlock.propTypes = {
    content: React.PropTypes.object.isRequired
};
