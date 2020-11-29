import { combineReducers } from 'redux';
import counterReducer from './Counter/counter.reducer';
import productsReducer from './Products/products.reducer';
import storesReducer from './Stores/stores.reducer';
import suggestionsReducer from './Suggestions/suggestions.reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  productsReducer,
  storesReducer,
  suggestionsReducer
});

export default rootReducer;
