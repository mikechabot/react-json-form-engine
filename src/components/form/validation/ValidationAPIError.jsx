import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Flex } from '../../util';

const regex = /^Error: (.+)$/m;

const ValidationAPIError = ({ error }) => {
    let message = parseAPICheckErrorMessage(error);
    return (
        <div className="panel">
            <div className="panel-heading">
                <Flex alignItems="center">
                    <FontAwesomeIcon icon="exclamation-triangle" className="has-text-danger" />
                    &nbsp;
                    <h3>{message || 'Error initializing FormEngine'}</h3>
                </Flex>
            </div>
        </div>
    );
};

const parseAPICheckErrorMessage = error => {
    if (!error) return null;
    if (regex.test(error)) {
        const matches = regex.exec(error);
        if (matches) {
            return matches[1];
        }
    }
    return null;
};

ValidationAPIError.propTypes = {
    error: PropTypes.object.isRequired
};

export default ValidationAPIError;
