import { addParameters, configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
    options: {
        name: 'react-json-form-engine',
        url: 'https://github.com/mikechabot/react-json-form-engine',
        addonPanelInRight: true,
        sortStoriesByKind: false,
    },
});

configure(loadStories, module);
