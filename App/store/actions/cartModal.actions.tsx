import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import {itemMenuInfo} from '../../types/menuListTypes';
import {
  cartModalTypes,
  HIDE_CLEAR_CART_MODAL,
  HIDE_MODAL_CART_MODAL,
  SHOW_ADD_CART_MODAL,
  SHOW_CLEAR_CART_MODAL,
  SHOW_EDIT_CART_MODAL,
} from '../../types/cartModalTypes';

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
