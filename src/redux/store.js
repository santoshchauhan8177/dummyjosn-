import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import categoryReducer from './reducers/categoryReducer';
import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
