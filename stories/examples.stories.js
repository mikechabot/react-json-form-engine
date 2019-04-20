import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { loginForm, rehydratedForm, simpleForm } from './forms';

import { buildFormComponent } from './util';

import '../dist/css/react-json-form-engine.css';
import { FormEngine } from '../src';

const stories = storiesOf('Examples', module);

stories.addDecorator(withKnobs);

const addStory = (form, options, json) => {
    const instance = new FormEngine(form, json);
    stories.add(form.title, () => buildFormComponent(instance, options));
};

const json = '{"str1": "Rehydrated!", "bool1": "true", "num1": 10, "arr1": ["op1", "op3"]}';

addStory(simpleForm);
addStory(loginForm, { submitButtonLabel: 'Login' });
addStory(rehydratedForm, {}, json);
