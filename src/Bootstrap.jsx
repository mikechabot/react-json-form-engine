import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

// Require globals
import './scss/style.scss';
import 'babel-polyfill';
import 'lodash';

// Localize react-widgets (Date/Time Component)
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(moment);

_renderApp();

// Hot loader
if (module.hot) {
    module.hot.accept('./App', () => {
        _renderApp(require('./App').default);
    });
}

function _renderApp (NextApp) {
    ReactDOM.render(
        _getApp(NextApp),
        document.getElementById('react-form-engine')
    );
}

function _getApp (NextApp) {
    return (
        <AppContainer>
            { NextApp ? <NextApp/> : <App /> }
        </AppContainer>
    );
}
