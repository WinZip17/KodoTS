import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import {RootState} from '../store/reducers';
import {itemMenuInfo, optionsItem} from './menuListTypes';

export const SET_CART_DATA = '[CART] SET_CART_DATA';
export const ADD_CART_DATA = '[CART] ADD_CART_DATA';
export const DELETE_CART_DATA = '[CART] DELETE_CART_DATA';
export const SET_CART_COUNT = '[CART] SET_CART_COUNT';
export const EDIT_ITEM_COUNT_CART = '[CART] EDIT_ITEM_COUNT_CART';
export const SET_ITEMS = '[CART] SET_ITEMS';
export const CART_CLEAR = '[CART] CART_CLEAR';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export interface cartInfoType {
  id: number;
  count: number;
  options: optionsItem[];
  item: itemMenuInfo;
}

export interface CartState {
  items: cartInfoType[];
}

export interface setCartData {
  type: typeof SET_CART_DATA;
  payload: string;
}

export interface addItem {
  type: typeof ADD_CART_DATA;
  payload: {
    item: itemMenuInfo;
    count?: number;
    options: optionsItem[];
  };
}

export interface deleteItem {
  type: typeof DELETE_CART_DATA;
  payload: number;
}

export interface setItemCount {
  type: typeof SET_CART_COUNT;
  payload: {
    item: itemMenuInfo;
    count: number;
  };
}

export interface setItems {
  type: typeof SET_ITEMS;
  payload: {
    items: cartInfoType[];
  };
}

export interface editItemCount {
  type: typeof EDIT_ITEM_COUNT_CART;
  payload: {
    count: number;
    id: number;
  };
}

export interface cartClear {
  type: typeof CART_CLEAR;
}

export type CartActionTypes =
  | setCartData
  | addItem
  | deleteItem
  | setItemCount
  | editItemCount
  | setItems
  | cartClear;
