import {itemMenuInfo} from './menuListTypes';

export const SHOW_ADD_CART_MODAL = '[CART_MODEL] SHOW_ADD_CART_MODAL';
export const SHOW_CLEAR_CART_MODAL = '[CART_MODEL] SHOW_CLEAR_CART_MODAL';
export const HIDE_CLEAR_CART_MODAL = '[CART_MODEL] HIDE_CLEAR_CART_MODAL';
export const SHOW_EDIT_CART_MODAL = '[CART_MODEL] SHOW_EDIT_CART_MODAL';
export const HIDE_MODAL_CART_MODAL = '[CART_MODEL] HIDE_MODAL_CART_MODAL';

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
    cartId: number;
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

export type cartModalTypes =
  | showAdd
  | showEdit
  | showClear
  | hideClear
  | hideModal;
