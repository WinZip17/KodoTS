import {
  cartModalState,
  cartModalTypes,
  HIDE_CLEAR_CART_MODAL,
  HIDE_MODAL_CART_MODAL,
  SHOW_ADD_CART_MODAL,
  SHOW_CLEAR_CART_MODAL,
  SHOW_EDIT_CART_MODAL,
} from '../../types/cartModalTypes';

const initialState: cartModalState = {
  item: null,
  showAdd: false,
  showClear: false,
  showEdit: false,
  cartId: null,
};

const cartModalReducer = function (
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
};

export default cartModalReducer;
