import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import {cartModalState, cartModalTypes} from '../../Types/cartModalTypes';
import {itemMenuInfo} from '../../Types/menuListTypes';

// Actions
export const SHOW_ADD_CART_MODAL = 'KodoTS/reducer/SHOW_ADD_CART_MODAL';
export const SHOW_CLEAR_CART_MODAL = 'KodoTS/reducer/SHOW_CLEAR_CART_MODAL';
export const HIDE_CLEAR_CART_MODAL = 'KodoTS/reducer/HIDE_CLEAR_CART_MODAL';
export const SHOW_EDIT_CART_MODAL = 'KodoTS/reducer/SHOW_EDIT_CART_MODAL';
export const HIDE_MODAL_CART_MODAL = 'KodoTS/reducer/HIDE_MODAL_CART_MODAL';

// Reducer
const initialState: cartModalState = {
  item: null,
  showAdd: false,
  showClear: false,
  showEdit: false,
  cartId: null,
};
export default function cartModalReducer(
  state = initialState,
  action: cartModalTypes,
) {
  switch (action.type) {
    case SHOW_ADD_CART_MODAL:
      return {...state, showEdit: false, showAdd: true, item: action.payload};

    case SHOW_CLEAR_CART_MODAL:
      return {...state, showClear: true};

    case HIDE_CLEAR_CART_MODAL:
      return {...state, showClear: false};

    case SHOW_EDIT_CART_MODAL:
      return {
        ...state,
        showAdd: false,
        showEdit: true,
        item: action.payload.item,
        cartId: action.payload.cartId,
      };
    case HIDE_MODAL_CART_MODAL:
      return {...state, showEdit: false, showAdd: false, item: null};

    default:
      return state;
  }
}

// Action Creators
export const showAdd = (
  item: itemMenuInfo,
): ThunkAction<void, RootState, unknown, cartModalTypes> => async (
  dispatch,
) => {
  return dispatch({
    type: SHOW_ADD_CART_MODAL,
    payload: item,
  });
};

export const showEdit = (
  item: itemMenuInfo,
  cartId: number,
): ThunkAction<void, RootState, unknown, cartModalTypes> => async (
  dispatch,
) => {
  return dispatch({
    type: SHOW_EDIT_CART_MODAL,
    payload: {
      item,
      cartId,
    },
  });
};

export const showClear = (): ThunkAction<
  void,
  RootState,
  unknown,
  cartModalTypes
> => async (dispatch) => {
  return dispatch({
    type: SHOW_CLEAR_CART_MODAL,
  });
};

export const hideClear = (): ThunkAction<
  void,
  RootState,
  unknown,
  cartModalTypes
> => async (dispatch) => {
  return dispatch({
    type: HIDE_CLEAR_CART_MODAL,
  });
};

export const hideModal = (): ThunkAction<
  void,
  RootState,
  unknown,
  cartModalTypes
> => async (dispatch) => {
  return dispatch({
    type: HIDE_MODAL_CART_MODAL,
  });
};
