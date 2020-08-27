import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import client from '../axiosSettinsg';
import {GET_STREET_LIST, streetsTypes} from '../../types/streetsTypes';

export const getStreetsList = (): ThunkAction<
  void,
  RootState,
  unknown,
  streetsTypes
> => async (dispatch) => {
  try {
    const streets = await client.get('/streets');
    dispatch({
      type: GET_STREET_LIST,
      payload: streets.data,
    });
  } catch (err) {
    console.log(err);
  }
};
