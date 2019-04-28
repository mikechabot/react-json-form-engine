import React from 'react';
import { decorate } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import { Form } from '../../src';

export const logInstance = instance => {
    return decorate([() => [{ model: instance.serializeModel() }]]);
};

export const buildFormComponent = (instance, options = {}) => {
    const { submitButtonLabel = 'Submit', width } = options;

    const buttonLabel = text('submitButtonLabel', submitButtonLabel);
    return (
        <Form
            {...width && { width }}
            hideFormTitle={boolean('hideFormTitle', false)}
            hideFormBorder={boolean('hideFormBorder', false)}
            hideSubsectionTitles={boolean('hideSubsectionTitles', false)}
            hideSubsectionSubtitles={boolean('hideSubsectionSubtitles', false)}
            disableSubmitOnValidationError={boolean('disableSubmitOnValidationError', true)}
            submitButtonLabel={buttonLabel}
            instance={instance}
            onSubmit={logInstance(instance).action(buttonLabel)}
        />
    );
};
