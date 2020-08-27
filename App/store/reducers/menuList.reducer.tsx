import {
  GET_CATEGORIES,
  GET_ITEMS,
  MenuListActionTypes,
  MenuListState,
} from '../../types/menuListTypes';

const initialState: MenuListState = {
  loading: false,
  activeCategory: 0,
  items: [],
  categories: [],
};

const MenuListReducer = function (
  state = initialState,
  action: MenuListActionTypes,
) {
  switch (action.type) {
    case GET_ITEMS:
      return {...state, items: action.payload};
    case GET_CATEGORIES:
      return {...state, categories: action.payload};
    default:
      return state;
  }
};

export default MenuListReducer;
