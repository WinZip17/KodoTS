import {CartState, CartActionTypes} from '../../types/cartTypes';

const initialState: CartState = {
  cart: [],
};

const cartReducer = function (state = initialState, action: CartActionTypes) {
  switch (action.type) {
    default:
      return state;
  }
};

export default cartReducer;
