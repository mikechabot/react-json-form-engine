import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import CodeBlock from './CodeBlock';

export default function CodePanel ({
    title,
    content
}) {
    return (
        <Panel
            style={{width: 450, margin: 5}}
            header={title}
            bsStyle="primary">
            <CodeBlock code={content} />
        </Panel>
    );
}

CodePanel.propTypes = {
    title  : React.PropTypes.string,
    content: React.PropTypes.object,
    style  : React.PropTypes.object
};
