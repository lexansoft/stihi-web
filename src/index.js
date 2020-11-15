import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store, history } from 'store';

import App from './components/app';

function check() {
  let password = prompt('Disconnect');

  if (password !== 'zzkddsjos@s;sd23823Ns#crm93C') {
    check();
  }
};

// check();

const app = <Provider store={store}>
                <App history={history} />
            </Provider>;

ReactDOM.render(
    app,
    document.getElementById('app')
);
