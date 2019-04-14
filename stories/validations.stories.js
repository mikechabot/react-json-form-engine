import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { validationsRequiredForm, validationsNumericForm, validationsRegexForm } from './forms';

import { buildFormComponent } from './util';

import '../dist/css/react-json-form-engine.css';
import { FormEngine } from '../src';

const stories = storiesOf('Validations', module);

stories.addDecorator(withKnobs);

const addStory = form => {
    const instance = new FormEngine(form, null, { liveValidation: true });
    stories.add(form.title, () => buildFormComponent(instance));
};

addStory(validationsRequiredForm);
addStory(validationsNumericForm);
addStory(validationsRegexForm);
