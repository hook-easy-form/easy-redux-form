import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './app';

import store from './store';

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}