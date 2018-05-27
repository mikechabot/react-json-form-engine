import React from 'react';
import PropTypes from 'prop-types';

import ValidationMessages from './ValidationMessages';
import { Icon, Flex } from '../../common';

const ValidationResults = ({ instance, subsection, validationMessagesLabel }) => {
    const results = instance.getValidationResults();
    const { validationStateMap } = results;

    if (!instance.hasError()) {
        return null;
    }

    let includeOnly = null;
    if (subsection) {
        includeOnly = instance.getAllSubsectionFields(subsection).map(field => field.id);
    }

    return (
        <Flex column flexShrink={0} width="100%">
        {Object.keys(validationStateMap)
          .map(fieldId => {
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
            return null;
          })
          .filter(message => message)}
      </Flex>
    );
};

ValidationResults.propTypes = {
    instance: PropTypes.object.isRequired,
    subsection: PropTypes.object,
    validationMessagesLabel: PropTypes.string
};

export default ValidationResults;
