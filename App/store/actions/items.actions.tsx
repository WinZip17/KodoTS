import {GET_USER_DATA} from '../../types/userTypes';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import {Action} from 'redux';
import client from '../axiosSettinsg';
import {GET_ITEMS} from '../../types/menuListTypes';

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
