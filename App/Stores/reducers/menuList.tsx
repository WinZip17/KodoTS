import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import client from '../../Services/axiosSettinsg';
import {MenuListActionTypes, MenuListState} from '../../Types/menuListTypes';
import {Action} from 'redux';

// Actions
export const GET_ITEMS = 'KodoTS/reducer/GET_ITEMS';
export const GET_CATEGORIES = 'KodoTS/reducer/GET_CATEGORIES';
export const CHANGE_ACTIVE_CATEGORY = 'KodoTS/reducer/CHANGE_ACTIVE_CATEGORY';

// Reducer
const initialState: MenuListState = {
  loading: false,
  activeCategory: 999,
  items: [],
  categories: [],
};

export default function MenuListReducer(
  state = initialState,
  action: MenuListActionTypes,
) {
  switch (action.type) {
    case GET_ITEMS:
      return {...state, items: action.payload};
    case GET_CATEGORIES:
      return {...state, categories: action.payload, activeCategory: action.payload[0].id};
    case CHANGE_ACTIVE_CATEGORY:
      return {...state, activeCategory: action.payload};
    default:
      return state;
  }
}

// Action Creators
export const getItems = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const items = await client.get('/items');
    return dispatch({
      type: GET_ITEMS,
      payload: items.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = (): ThunkAction<
  void,
  RootState,
  unknown,
  MenuListActionTypes
> => async (dispatch) => {
  try {
    const categories = await client.get('/categories');
    return dispatch({
      type: GET_CATEGORIES,
      payload: categories.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const selectActiveCategory = (
  id: number,
): ThunkAction<void, RootState, unknown, MenuListActionTypes> => (dispatch) => {
  return dispatch({
    type: CHANGE_ACTIVE_CATEGORY,
    payload: id,
  });
};
