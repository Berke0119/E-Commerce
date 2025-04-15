import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

export const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  cart: cartReducer,
});
