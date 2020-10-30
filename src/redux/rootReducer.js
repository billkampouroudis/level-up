import { combineReducers } from 'redux';
import counterReducer from './Counter/counter.reducer';
import productsReducer from './Products/products.reducer';
import sellersReducer from './Sellers/sellers.reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  productsReducer,
  sellersReducer
});

export default rootReducer;
