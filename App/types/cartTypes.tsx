import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import {RootState} from '../store/reducers';

export const SET_CART_DATA = '[APP] SET_CART_DATA';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export interface CartState {
  cart: any[];
}

export interface setCartData {
  type: typeof SET_CART_DATA;
  payload: string;
}

export type CartActionTypes = setCartData;
