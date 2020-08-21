import {
  GET_ITEMS,
  MenuListActionTypes,
  MenuListState,
} from '../../types/menuListTypes';

const initialState: MenuListState = {
  loading: false,
  items: [],
};

const MenuListReducer = function (state = initialState, action: MenuListActionTypes) {
  switch (action.type) {
    case GET_ITEMS:
      return {...state, items: action.payload};
    default:
      return state;
  }
};

export default MenuListReducer;
