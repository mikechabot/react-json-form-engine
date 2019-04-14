import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { loginForm, simpleForm } from './forms';

import { buildFormComponent } from './util';

import '../dist/css/react-json-form-engine.css';
import { FormEngine } from '../src';

const stories = storiesOf('Examples', module);

stories.addDecorator(withKnobs);

const addStory = (form, options) => {
    const instance = new FormEngine(form);
    stories.add(form.title, () => buildFormComponent(instance, options));
};

addStory(simpleForm);
addStory(loginForm, { submitButtonLabel: 'Login' });
