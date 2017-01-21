import React from 'react';
import ValidationMessages from './validation-messages';
import { map } from 'lodash';

export default function ValidationResults ({
    instance
}) {
    if (!instance.hasError()) {
        return <span />;
    }

    const results = instance.getValidationResults();
    const { validationStateMap } = results;

    return (
        <div>
            {
                map(validationStateMap, (state, tag) => (
                    <ValidationMessages
                        key={tag}
                        tag={tag}
                        field={instance.getField(tag)}
                        results={instance.getValidationResultByTag(tag)}
                    />
                ))
            }
        </div>
    );
}
