import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import {
  ADD_CART_DATA,
  CART_CLEAR,
  CartActionTypes, cartInfoType,
  DELETE_CART_DATA,
  EDIT_ITEM_COUNT_CART,
  SET_CART_COUNT,
  SET_ITEMS,
} from '../../types/cartTypes';
import {itemMenuInfo, optionsItem} from '../../types/menuListTypes';

export const addItem = (
  item: itemMenuInfo,
  count: number = 1,
  options: optionsItem[] = [],
): ThunkAction<void, RootState, unknown, CartActionTypes> => async (
  dispatch,
) => {
  return dispatch({
    type: ADD_CART_DATA,
    payload: {
      item,
      count,
      options,
    },
  });
};

export const deleteItem = (
  id: number,
): ThunkAction<void, RootState, unknown, CartActionTypes> => async (
  dispatch,
) => {
  return dispatch({
    type: DELETE_CART_DATA,
    payload: id,
  });
};

export const setItems = (
  items: cartInfoType[],
): ThunkAction<void, RootState, unknown, CartActionTypes> => async (
  dispatch,
) => {
  return dispatch({
    type: SET_ITEMS,
    payload: {items},
  });
};

export const setItemCount = (
  item: itemMenuInfo,
  count: number,
): ThunkAction<void, RootState, unknown, CartActionTypes> => async (
  dispatch,
) => {
  return dispatch({
    type: SET_CART_COUNT,
    payload: {
      item,
      count,
    },
  });
};

export const editItemCount = (
  count: number,
  id: number,
): ThunkAction<void, RootState, unknown, CartActionTypes> => async (
  dispatch,
) => {
  return dispatch({
    type: EDIT_ITEM_COUNT_CART,
    payload: {
      count,
      id,
    },
  });
};

export const cartClear = (): ThunkAction<
  void,
  RootState,
  unknown,
  CartActionTypes
> => async (dispatch) => {
  return dispatch({
    type: CART_CLEAR,
  });
};
