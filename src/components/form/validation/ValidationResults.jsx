import React from 'react';
import PropTypes from 'prop-types';

import ValidationMessages from './ValidationMessages';
import { Icon } from '../../common';

import { VALIDATION_CONST } from '../../../form/config/form-const';

const ValidationResults = ({ instance, subsection, validationMessagesLabel }) => {
    const results = instance.getValidationResults();
    const { validationStateMap } = results;

    if (!results || results.overallStatus === VALIDATION_CONST.STATUS.OK) {
        return null;
    }

    let includeOnly = null;
    if (subsection) {
        includeOnly = instance.getAllSubsectionFields(subsection).map(field => field.id);
    }

    return (
        <article className="message m-around--small is-danger">
            <div className="message-header">
                <p>
                    <Icon icon="exclamation-triangle" />&nbsp;
                    {validationMessagesLabel || 'Validation Messages'}
                </p>
            </div>
            <div className="message-body">
                {Object.keys(validationStateMap).map(fieldId => {
                    if (!includeOnly || includeOnly.includes(fieldId)) {
                        return (
                            <ValidationMessages
                                key={fieldId}
                                tag={fieldId}
                                field={instance.getField(fieldId)}
                                results={instance.getValidationResultByTag(fieldId)}
                            />
                        );
                    }
                })}
            </div>
        </article>
    );
};

ValidationResults.propTypes = {
    instance: PropTypes.object.isRequired,
    subsection: PropTypes.object,
    validationMessagesLabel: PropTypes.string
};

export default ValidationResults;
