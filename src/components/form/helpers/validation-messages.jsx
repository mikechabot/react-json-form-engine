import React from 'react';
import VALIDATION_CONST from '../../../form/validation/validation-const';

export default function ValidationMessages ({
    field, results
}) {
    if (!results.status === VALIDATION_CONST.STATUS.OK) {
        return <span />;
    }

    let labels = [];
    getLabels(labels, field);

    return (
        <div style={{marginTop: 10}}>
            <ol className='breadcrumb'>
                {
                    labels.map((label, index) => (
                        <li>{label}</li>
                    ))
                }
            </ol>
            <ul style={{listStyleType: 'square', fontSize: '90%'}}>
                {
                    results.messages.map((message, index) => {
                        const className = message.status === VALIDATION_CONST.STATUS.ERROR
                            ? 'text-danger' : 'text-warning';
                        return (
                            <li key={index} className={className} >
                                { message.message }
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

function getLabels (labels, field) {
    labels.unshift(field.title);
    if (field.parent) {
        getLabels(labels, field.parent);
    }
}
