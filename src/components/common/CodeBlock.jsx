import React from 'react';

export default function CodeBlock ({
    code
}) {
    if (!code) {
        return (
            <p className='text-danger'>
                Nothing to display
            </p>
        );
    }

    // Get formatted JSON string, and split on new line
    const lines = JSON.stringify(code, null, 2).split('\n');

    return (
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            <pre style={{ minHeight: 385 }}>
                {
                    lines.map((line, index) => (
                        <div key={index} className="line">
                            { line }
                        </div>
                    ))
                }
            </pre>
        </div>
    );
}
