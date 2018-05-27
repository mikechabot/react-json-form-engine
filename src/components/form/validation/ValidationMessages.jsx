import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Flex } from '../../common';
import { VALIDATION_CONST } from '../../../form/config/form-const';

const ValidationMessages = ({ field, results }) => {
    if (results.status === VALIDATION_CONST.STATUS.OK) {
        return <span />;
    }

    // Mutates labels!
    let labels = [];
    __buildBreadcrumbs(labels, field);

    return (
        <Flex column flexShrink={0} width="100%" className="message is-danger">
            <div className="message-header">
                <Flex flexShrink={0}>
                    <Icon icon="exclamation-triangle" />&nbsp;
                    <div className="breadcrumb" aria-label="breadcrumbs">
                        <ul>{labels.map(__renderBreadcrumb)}</ul>
                    </div>
                </Flex>
            </div>
            <div className="message-body">{__renderMessages(results)}</div>
        </Flex>
    );
};

const __renderBreadcrumb = (crumb, index) => (
    <li key={index}>
        <a style={{ cursor: 'inherit', textDecoration: 'inherit' }}>{crumb}</a>
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
