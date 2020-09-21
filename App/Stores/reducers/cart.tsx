import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import {CartActionTypes, cartInfoType, CartState} from '../../Types/cartTypes';
import {itemMenuInfo, optionsItem} from '../../Types/menuListTypes';
import {findIndex} from 'lodash-es';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';

// Actions
export const SET_CART_DATA = 'KodoTS/reducer/SET_CART_DATA';
export const ADD_CART_DATA = '[KodoTS/reducer/ADD_CART_DATA';
export const DELETE_CART_DATA = 'KodoTS/reducer/DELETE_CART_DATA';
export const SET_CART_COUNT = 'KodoTS/reducer/SET_CART_COUNT';
export const EDIT_ITEM_COUNT_CART = 'KodoTS/reducer/EDIT_ITEM_COUNT_CART';
export const SET_ITEMS = 'KodoTS/reducer/SET_ITEMS';
export const CART_CLEAR = 'KodoTS/reducer/CART_CLEAR';
export const INIT_CART = 'KodoTS/reducer/INIT_CART';

const STORE_KEY = 'kodo_cart_v7';

// Reducer
const initialState: CartState = {
  items: [],
};
let idCounter = 1;
export default function cartReducer(
  state = initialState,
  action: CartActionTypes,
) {
  let item: itemMenuInfo;
  switch (action.type) {
    case SET_ITEMS:
      if (action.payload.items.length > 0) {
        idCounter =
          action.payload.items[action.payload.items.length - 1].id + 1;
      }
      AsyncStorage.setItem(STORE_KEY, JSON.stringify(action.payload.items));
      return {...state, items: action.payload.items};
    case ADD_CART_DATA:
      item = action.payload.item;
      const options = action.payload.options;
      let count = action.payload.count;
      if (!count) {
        count = 1;
      }
      let i = {
        id: idCounter++,
        item,
        count,
        options,
      };
      AsyncStorage.setItem(STORE_KEY, JSON.stringify([...state.items, i]));
      return {...state, items: [...state.items, i]};

    case DELETE_CART_DATA:
      const items = state.items.filter((i) => i.id !== action.payload);
      AsyncStorage.setItem(STORE_KEY, JSON.stringify(items));
      return {...state, items};

    case SET_CART_COUNT:
      item = action.payload.item;
      const index = findIndex(state.items, (i) => i.item.id == item.id);
      AsyncStorage.setItem(
        STORE_KEY,
        JSON.stringify(
          produce(state.items, (draft) => {
            draft[index].count = action.payload.count;
          }),
        ),
      );

      return {
        ...state,
        items: produce(state.items, (draft) => {
          draft[index].count = action.payload.count;
        }),
      };

    case CART_CLEAR: {
      idCounter = 1;
      AsyncStorage.setItem(STORE_KEY, JSON.stringify([]));
      return {...state, items: []};
    }

    case EDIT_ITEM_COUNT_CART:
      const editItems = state.items.map((item) => {
        if (+item.id === +action.payload.id) {
          return {
            ...item,
            count: action.payload.count,
          };
        } else {
          return item;
        }
      });
      AsyncStorage.setItem(STORE_KEY, JSON.stringify([...editItems]));

      return {...state, items: [...editItems]};

    default:
      return state;
  }
}

const readAsyncStore = () => {
  return AsyncStorage.getItem(STORE_KEY).then((data) => {
    if (data) {
      return JSON.parse(data);
    }
    return [];
  });
};

// Action Creators
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

export const initCart = (): ThunkAction<
  void,
  RootState,
  unknown,
  CartActionTypes
> => async (dispatch) => {
  const items = await readAsyncStore();
  return dispatch(setItems(items));
};
