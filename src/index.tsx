import { Router } from "@reach/router";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Cats } from './pages/Cats';
import { Upload } from './pages/Upload';
import { rootReducer } from "./reducers";
import reportWebVitals from './reportWebVitals';
import './assets/reset.scss';
import 'normalize-scss';
import { Page } from "./components/Page";


let middlewarePack: StoreEnhancer = applyMiddleware(thunk, logger);

declare var process: {
  env: {
    NODE_ENV: string
  }
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

  // only load logger in dev mode
  middlewarePack = applyMiddleware(thunk, logger);

  // enable web vitals to the console in dev, in prod we'd point it somewhere useful!
  reportWebVitals(console.log);

} else {
  middlewarePack = applyMiddleware(thunk);
}

const store = createStore(rootReducer, middlewarePack);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Page>
        <Router>
          <Cats path="/" />
          <Upload path="/upload" />
        </Router>
      </Page>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
