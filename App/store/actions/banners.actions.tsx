import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import client from '../axiosSettinsg';
import {bannersTypes, GET_BANNERS_LIST} from '../../types/bannersTypes';

export const getBannersList = (): ThunkAction<
  void,
  RootState,
  unknown,
  bannersTypes
> => async (dispatch) => {
  try {
    const banners = await client.get('/banners');
    dispatch({
      type: GET_BANNERS_LIST,
      payload: banners.data,
    });
  } catch (err) {
    console.log(err);
  }
};
