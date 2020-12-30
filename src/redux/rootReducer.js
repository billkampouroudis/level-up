import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import productsReducer from './products/products.reducer';
import storesReducer from './stores/stores.reducer';
import suggestionsReducer from './suggestions/suggestions.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  authReducer,
  productsReducer,
  storesReducer,
  suggestionsReducer,
  userReducer
});

export default rootReducer;
