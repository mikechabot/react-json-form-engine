import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { multiSectionForm, multiSubsectionForm, multiSectionAndSubsection } from './forms';

import { buildFormComponent } from './util';

import '../dist/css/styles.css';
import { FormEngine } from '../src';

const stories = storiesOf('Layout', module);

stories.addDecorator(withKnobs);

const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: 500
};

const addStory = form => {
    const instance = new FormEngine(form);
    stories.add(form.title, () => <div style={wrapperStyle}>{buildFormComponent(instance)}</div>);
};

addStory(multiSectionForm);
addStory(multiSubsectionForm);
addStory(multiSectionAndSubsection);
