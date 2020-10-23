import React, { Fragment } from 'react';

import Menu from 'components/menu';
import Posts from 'pages/posts';
import Main from 'pages/main';

import {createBrowserHistory} from 'history';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './style.scss';

const history = createBrowserHistory();

const App = () => {
    return (
        <Router history={history}>
            <div className="app-grid">
                <Menu />
                <Route exact path="/posts/:id">
                    <Posts />
                </Route>
                <Route exact path="/">
                    <Main />
                </Route>
            </div>
        </Router>
    )
};

export default App;