import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import './index.css';
import App from './App';
import storeSetup from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const storeConfig = storeSetup();

ReactDOM.render(
  <Provider store={storeConfig.store}>
    <PersistGate loading={null} persistor={storeConfig.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
