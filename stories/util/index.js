import React from 'react';
import { decorate } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import { Form } from '../../src';

export const logInstance = instance => {
    return decorate([() => [{ model: instance.serializeModel() }]]);
};

export const buildFormComponent = (instance, options = {}) => {
    const { submitButtonLabel = 'Submit', height, width } = options;

    const buttonLabel = text('submitButtonLabel', submitButtonLabel);
    return (
        <Form
            {...height && { height }}
            {...width && { width }}
            hideFormTitle={boolean('hideFormTitle', false)}
            hideSubsectionTitles={boolean('hideSubsectionTitles', false)}
            hideSubsectionSubtitles={boolean('hideSubsectionSubtitles', false)}
            submitButtonLabel={buttonLabel}
            instance={instance}
            onSubmit={logInstance(instance).action(buttonLabel)}
        />
    );
};
