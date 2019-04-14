import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { conditionsForm, conditionsArrayForm, conditionsNumericForm } from './forms';

import { buildFormComponent } from './util';

import '../dist/css/react-json-form-engine.css';
import { FormEngine } from '../src';

const stories = storiesOf('Conditions', module);

stories.addDecorator(withKnobs);

const addStory = form => {
    const instance = new FormEngine(form);
    stories.add(form.title, () => buildFormComponent(instance));
};

addStory(conditionsForm);
addStory(conditionsArrayForm);
addStory(conditionsNumericForm);
