import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk'

import App from './App';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.css';
import './AdminLTE/css/adminlte.css';
import './AdminLTE/fontawesome-free/css/all.css';
import './index.css';


const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
