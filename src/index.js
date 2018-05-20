import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './scss/index.css';

ReactDOM.render(<App />, document.getElementById('react-form-engine'));
registerServiceWorker();
