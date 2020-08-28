import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import client from '../axiosSettinsg';
import {Action} from 'redux';
import {UserActionTypes, UserInfo, UserState} from '../../types/userTypes';

// Actions
export const GET_USER_DATA = 'KodoTS/reducer/GET_USER_DATA';

// Reducer
const initialState: UserState = {
  loading: false,
  user: null,
};
export default function userReducer(
  state = initialState,
  action: UserActionTypes,
) {
  switch (action.type) {
    case GET_USER_DATA:
      return state;
    default:
      return state;
  }
}

// Action Creators
export const getUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const user = await client.get<UserInfo>('/users');
    return dispatch({
      type: GET_USER_DATA,
      payload: user,
    });
  } catch (err) {
    console.log(err);
  }
};
