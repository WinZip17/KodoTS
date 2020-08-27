import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import {Action} from 'redux';
import client from '../axiosSettinsg';
import {
  CHANGE_ACTIVE_CATEGORY,
  GET_CATEGORIES,
  GET_ITEMS,
  MenuListActionTypes,
} from '../../types/menuListTypes';

export const getItems = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const items = await client.get('/items');
    dispatch({
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
    dispatch({
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
