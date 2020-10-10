import { combineReducers } from 'redux';
import counterReducer from './Counter/counter.reducer';
import productsReducer from './Products/products.reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer
});

export default rootReducer;
