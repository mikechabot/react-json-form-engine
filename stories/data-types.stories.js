import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import {
    stringsForm,
    booleansForm,
    arraysForm,
    numbersForm,
    dateTimeForm,
    infoForm
} from './forms';

import { buildFormComponent } from './util';

import '../dist/css/styles.css';
import { FormEngine } from '../src';

const stories = storiesOf('Data Types', module);

stories.addDecorator(withKnobs);

const addStory = form => {
    const instance = new FormEngine(form);
    stories.add(form.title, () => buildFormComponent(instance));
};

addStory(stringsForm);
addStory(booleansForm);
addStory(arraysForm);
addStory(numbersForm);
addStory(dateTimeForm);
addStory(infoForm);
