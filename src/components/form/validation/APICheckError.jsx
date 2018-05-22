import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Flex } from '../../common';

const regex = /^Error: (.+)$/m;

const APICheckError = ({ error }) => {
    let detail = __parseAPICheckErrorMessage(error);
    return (
        <div className="panel">
            <div className="panel-heading">
                <Flex>
                    <Icon icon="exclamation-triangle" className="has-text-danger" />&nbsp;
                    {_renderTitle(detail || 'Error initializing FormEngine')}
                </Flex>
            </div>
        </div>
    );
};

const __parseAPICheckErrorMessage = error => {
    if (!error) return null;
    if (regex.test(error)) {
        const matches = regex.exec(error);
        if (matches) {
            return matches[1];
        }
    }
    return null;
};

const _renderTitle = title => {
    return (
        <div className="alert alert-danger paper-1">
            <h3>{title}</h3>
        </div>
    );
};

APICheckError.propTypes = {
    error: PropTypes.object.isRequired
};

export default APICheckError;
