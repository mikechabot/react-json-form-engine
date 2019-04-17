import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { nestedFieldsSimpleForm, nestedFieldsComplexForm } from './forms';

import { buildFormComponent } from './util';

import '../dist/css/react-json-form-engine.css';
import { FormEngine } from '../src';

const stories = storiesOf('Field Nesting', module);

stories.addDecorator(withKnobs);

const addStory = (form, options) => {
    const instance = new FormEngine(form);
    stories.add(form.title, () => buildFormComponent(instance, options));
};

addStory(nestedFieldsSimpleForm);
addStory(nestedFieldsComplexForm);
