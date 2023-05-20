import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';

import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <BrowserRouter />
    </Provider>
  </React.StrictMode>
);
