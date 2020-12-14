import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import productsReducer from './products/products.reducer';
import storesReducer from './stores/stores.reducer';
import suggestionsReducer from './suggestions/suggestions.reducer';

const rootReducer = combineReducers({
  authReducer,
  productsReducer,
  storesReducer,
  suggestionsReducer
});

export default rootReducer;
