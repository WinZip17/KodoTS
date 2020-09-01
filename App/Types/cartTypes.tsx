import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import {RootState} from '../Stores/reducers';
import { ADD_CART_DATA, CART_CLEAR, DELETE_CART_DATA, EDIT_ITEM_COUNT_CART, SET_CART_COUNT, SET_CART_DATA, SET_ITEMS } from '../Stores/reducers/cart';
import {itemMenuInfo, optionsItem} from './menuListTypes';

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
