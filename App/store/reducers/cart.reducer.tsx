import {
  CartState,
  CartActionTypes,
  ADD_CART_DATA,
  SET_CART_COUNT,
  DELETE_CART_DATA,
  EDIT_ITEM_COUNT_CART,
  SET_ITEMS,
  CART_CLEAR,
} from '../../types/cartTypes';
import {itemMenuInfo} from '../../types/menuListTypes';
import {findIndex} from 'lodash-es';
import produce from 'immer';

const initialState: CartState = {
  items: [],
};

let idCounter = 1;

const cartReducer = function (state = initialState, action: CartActionTypes) {
  let item: itemMenuInfo;
  switch (action.type) {
    case SET_ITEMS:
      if (action.payload.items.length > 0) {
        idCounter =
          action.payload.items[action.payload.items.length - 1].id + 1;
      }
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
      return {...state, items: [...state.items, i]};

    case DELETE_CART_DATA:
      const items = state.items.filter((i) => i.id !== action.payload);
      return {...state, items};

    case SET_CART_COUNT:
      item = action.payload.item;
      const index = findIndex(state.items, (i) => i.item.id == item.id);

      return {
        ...state,
        items: produce(state.items, (draft) => {
          draft[index].count = action.payload.count;
        }),
      };

    case CART_CLEAR: {
      idCounter = 1;
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

      return {...state, items: [...editItems]};

    default:
      return state;
  }
};

export default cartReducer;
