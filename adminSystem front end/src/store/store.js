
import thunk from 'redux-thunk';
import rootReducer from './reducer.js';
  import { createStore, applyMiddleware, compose } from 'redux';

// Note: this API requires redux@>=3.1.0
var store;
 // store = createStore(rootReducer, applyMiddleware(thunk));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export  default store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)
  ));