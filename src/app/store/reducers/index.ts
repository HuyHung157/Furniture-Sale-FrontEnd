import { storeLogger } from 'ngrx-store-logger';

import { environment } from '../../../environments/environment';
import cartReducer from './cart.reducer';
import ICartState from './cart.state';

export interface IAppState {
  cart: ICartState;
}

export const reducers = {
  cart: cartReducer
};

const developmentReducer = [
  storeLogger()
];

export const metaReducers = !environment.production ?
  developmentReducer : [];
