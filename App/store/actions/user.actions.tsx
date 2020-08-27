import {GET_USER_DATA, UserInfo} from '../../types/userTypes';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import {Action} from 'redux';
import client from '../axiosSettinsg';

export const getUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const user = await client.get<UserInfo>('/users');
    dispatch({
      type: GET_USER_DATA,
      payload: user,
    });
  } catch (err) {
    console.log(err);
  }
};
