import { combineReducers } from 'redux';
import counterReducer from './Counter/counter.reducer';
import productsReducer from './Products/products.reducer';
import storesReducer from './Stores/stores.reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  productsReducer,
  storesReducer
});

export default rootReducer;
