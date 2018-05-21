import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../common';
import { VALIDATION_CONST } from '../../../form/config/form-const';

const ValidationMessages = ({ field, results }) => {
    if (results.status === VALIDATION_CONST.STATUS.OK) {
        return <span />;
    }

    // Mutates labels!
    let labels = [];
    __buildBreadcrumbs(labels, field);

    return (
        <div className="m-bottom--x-small">
            {__renderBreadcrumbs(labels)}
            {__renderMessages(results)}
        </div>
    );
};

const __renderBreadcrumbs = labels => (
    <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>{labels.map(__renderBreadcrumb)}</ul>
    </nav>
);

const __renderBreadcrumb = (crumb, index) => (
    <li key={index}>
        <span>{crumb}</span>
    </li>
);

const __buildBreadcrumbs = (labels, field) => {
    labels.unshift(field.title);
    if (field.parent) {
        __buildBreadcrumbs(labels, field.parent);
    }
};

const __renderMessages = results => (
    <ul>
        {results.messages.map((message, index) => {
            return (
                <li key={index}>
                    <Icon icon="angle-right" />&nbsp;{message.message}
                </li>
            );
        })}
    </ul>
);

ValidationMessages.propTypes = {
    field: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired
};

export default ValidationMessages;
