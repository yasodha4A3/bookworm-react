import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import rootReducer from './rootReducer';
import registerServiceWorker from './registerServiceWorker';
import { userLoggedIn } from './actions/auth';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.bookwormJWT) {
  const user = { token: localStorage.bookwormJWT };
  store.dispatch(userLoggedIn(user));
}
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
