import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import CodeBlock from './CodeBlock';

export default function CodePanel ({
    title,
    content
}) {
    return (
        <Panel
            style={{
                height  : 400,
                width   : '100%',
                minWidth: 425,
                margin  : 2.5
            }}
            header={title}
            bsStyle="primary">
            <CodeBlock content={content} />
        </Panel>
    );
}

CodePanel.propTypes = {
    title  : React.PropTypes.string,
    content: React.PropTypes.object,
    style  : React.PropTypes.object
};
