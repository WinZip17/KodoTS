import {itemMenuInfo} from './menuListTypes';
import {
  HIDE_CLEAR_CART_MODAL,
  HIDE_MODAL_CART_MODAL,
  SHOW_ADD_CART_MODAL,
  SHOW_CLEAR_CART_MODAL,
  SHOW_EDIT_CART_MODAL,
} from '../Stores/reducers/cartModal';
import {CART_CLEAR} from '../Stores/reducers/cart';

export interface cartModalState {
  item: null | itemMenuInfo;
  showAdd: boolean;
  showClear: boolean;
  showEdit: boolean;
  cartId: null | number;
}

export interface showAdd {
  type: typeof SHOW_ADD_CART_MODAL;
  payload: itemMenuInfo;
}

export interface showEdit {
  type: typeof SHOW_EDIT_CART_MODAL;
  payload: {
    item: itemMenuInfo;
    cartId: number | null;
  };
}

export interface showClear {
  type: typeof SHOW_CLEAR_CART_MODAL;
}

export interface hideClear {
  type: typeof HIDE_CLEAR_CART_MODAL;
}

export interface hideModal {
  type: typeof HIDE_MODAL_CART_MODAL;
}

export interface cartClear {
  type: typeof CART_CLEAR;
}

export type cartModalTypes =
  | showAdd
  | showEdit
  | showClear
  | hideClear
  | cartClear
  | hideModal;
