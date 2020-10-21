import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

import App from './components/app';

const app = <Provider store={store}>
                <App />
            </Provider>;

ReactDOM.render(
    app,
    document.getElementById('app')
);
