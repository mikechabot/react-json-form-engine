import React from 'react';
import PropTypes from 'prop-types';

import VALIDATION_CONST from '../../../form/validation/validation-const';

const ValidationMessages = ({ field, results }) => {
    if (results.status === VALIDATION_CONST.STATUS.OK) {
        return <span />;
    }

    let labels = [];
    getLabels(labels, field);

    return (
        <div style={{ marginTop: 10 }}>
            <ol className="breadcrumb">{labels.map((label, index) => <li key={index}>{label}</li>)}</ol>
            <ul style={{ listStyleType: 'square', fontSize: '90%' }}>
                {results.messages.map((message, index) => {
                    const className =
                        message.status === VALIDATION_CONST.STATUS.ERROR
                            ? 'text-danger'
                            : 'text-warning';
                    return (
                        <li key={index} className={className}>
                            {message.message}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const getLabels = (labels, field) => {
    labels.unshift(field.title);
    if (field.parent) {
        getLabels(labels, field.parent);
    }
};

ValidationMessages.propTypes = {
    field: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired
};

export default ValidationMessages;
