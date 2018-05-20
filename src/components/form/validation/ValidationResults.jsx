import React from 'react';
import PropTypes from 'prop-types';

import ValidationMessages from './validation-messages';

const ValidationResults = ({ instance }) => {
    if (!instance.hasError()) {
        return <span />;
    }

    const results = instance.getValidationResults();
    const { validationStateMap } = results;

    return (
        <div>
            {Object.keys(validationStateMap).map(fieldId => {
                return (
                    <ValidationMessages
                        key={fieldId}
                        tag={fieldId}
                        field={instance.getField(fieldId)}
                        results={instance.getValidationResultByTag(fieldId)}
                    />
                );
            })}
        </div>
    );
};

ValidationResults.propTypes = {
    instance: PropTypes.object.isRequired
};

export default ValidationResults;
