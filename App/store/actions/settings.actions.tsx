import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import client from '../axiosSettinsg';
import {GET_SETTINGS, settingsTypes} from '../../types/settingsTypes';

export const getSettings = (): ThunkAction<
  void,
  RootState,
  unknown,
  settingsTypes
> => async (dispatch) => {
  try {
    const settings = await client.get('/settings');
    dispatch({
      type: GET_SETTINGS,
      payload: settings.data,
    });
  } catch (err) {
    console.log(err);
  }
};
